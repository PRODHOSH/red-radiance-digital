import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

interface Env {
  redradiance_db: D1Database;
  ADMIN_SECRET: string;
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
