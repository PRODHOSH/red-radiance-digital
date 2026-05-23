import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

interface Env {
  redradiance_db: D1Database;
  ADMIN_SECRET: string;
  CF_ZONE_ID?: string;
  CF_API_TOKEN?: string;
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try { payload = JSON.parse(body); } catch { return false; }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") return false;
  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) return false;
  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) return response;
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

async function handleAPI(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  // ── GET /api/offers — public, fetches all active offers ──
  if (path === "/api/offers" && request.method === "GET") {
    const { results } = await env.redradiance_db
      .prepare("SELECT * FROM offers WHERE active = 1 ORDER BY num")
      .all();
    return new Response(JSON.stringify(results), { headers: JSON_HEADERS });
  }

  // ── Admin auth check helper ──
  const checkAuth = () => {
    const secret = request.headers.get("x-admin-secret");
    return secret === env.ADMIN_SECRET;
  };

  // ── GET /api/admin/verify — just checks password, no side effects ──
  if (path === "/api/admin/verify" && request.method === "GET") {
    return checkAuth()
      ? new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS })
      : new Response("Unauthorized", { status: 401 });
  }

  // ── PUT /api/admin/offers/:id — update an offer ──
  const updateMatch = path.match(/^\/api\/admin\/offers\/(\d+)$/);
  if (updateMatch && request.method === "PUT") {
    if (!checkAuth()) return new Response("Unauthorized", { status: 401 });
    const id = updateMatch[1];
    const body = await request.json() as { name: string; price: string; services: string; summer: number };
    await env.redradiance_db
      .prepare("UPDATE offers SET name=?, price=?, services=?, summer=? WHERE id=?")
      .bind(body.name, body.price, body.services, body.summer, id)
      .run();
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  // ── POST /api/admin/offers — add a new offer ──
  if (path === "/api/admin/offers" && request.method === "POST") {
    if (!checkAuth()) return new Response("Unauthorized", { status: 401 });
    const body = await request.json() as { num: string; name: string; price: string; services: string; summer: number };
    await env.redradiance_db
      .prepare("INSERT INTO offers (num, name, price, services, summer) VALUES (?,?,?,?,?)")
      .bind(body.num, body.name, body.price, body.services, body.summer)
      .run();
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  // ── DELETE /api/admin/offers/:id ──
  const deleteMatch = path.match(/^\/api\/admin\/offers\/(\d+)$/);
  if (deleteMatch && request.method === "DELETE") {
    if (!checkAuth()) return new Response("Unauthorized", { status: 401 });
    await env.redradiance_db
      .prepare("DELETE FROM offers WHERE id=?")
      .bind(deleteMatch[1])
      .run();
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  }

  // ── GET /api/admin/analytics ──
  if (path === "/api/admin/analytics" && request.method === "GET") {
    if (!checkAuth()) return new Response("Unauthorized", { status: 401 });
    if (!env.CF_ZONE_ID || !env.CF_API_TOKEN) {
      return new Response(JSON.stringify({ configured: false }), { headers: JSON_HEADERS });
    }
    try {
      const now   = new Date();
      const today = now.toISOString().split("T")[0];
      const week  = new Date(now.getTime() - 6 * 86400000).toISOString().split("T")[0];

      const query = `{
        viewer {
          zones(filter: {zoneTag: "${env.CF_ZONE_ID}"}) {
            todayData: httpRequests1hGroups(limit: 24, filter: {datetime_geq: "${today}T00:00:00Z"}) {
              sum { pageViews requests }
              uniq { uniques }
            }
            weekData: httpRequests1dGroups(limit: 7, filter: {date_geq: "${week}"}, orderBy: [date_DESC]) {
              sum { pageViews requests }
              uniq { uniques }
            }
          }
        }
      }`;

      const cfRes = await fetch("https://api.cloudflare.com/client/v4/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.CF_API_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      type Group = { sum: { pageViews: number; requests: number }; uniq: { uniques: number } };
      type CFData = { data: { viewer: { zones: [{ todayData: Group[]; weekData: Group[] }] } } };
      const cf = await cfRes.json() as CFData;
      const zone = cf.data.viewer.zones[0];

      const sumField = <K extends keyof Group["sum"]>(arr: Group[], f: K) =>
        arr.reduce((a, g) => a + (g.sum[f] as number), 0);
      const sumUniq = (arr: Group[]) => arr.reduce((a, g) => a + g.uniq.uniques, 0);

      return new Response(JSON.stringify({
        configured: true,
        today: { pageViews: sumField(zone.todayData, "pageViews"), visitors: sumUniq(zone.todayData) },
        week:  { pageViews: sumField(zone.weekData, "pageViews"),  visitors: sumUniq(zone.weekData), requests: sumField(zone.weekData, "requests") },
      }), { headers: JSON_HEADERS });
    } catch (e) {
      return new Response(JSON.stringify({ configured: false, error: String(e) }), { headers: JSON_HEADERS });
    }
  }

  return null; // not an API route — pass to TanStack Start
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // API routes handled here — direct D1 access
      const apiResponse = await handleAPI(request, env as Env);
      if (apiResponse) return apiResponse;

      // Everything else goes to TanStack Start (SSR)
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
