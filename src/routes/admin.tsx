import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  Tag, RefreshCw, LogOut,
  Save, Trash2, Plus, X,
  BarChart2, Menu, Eye, Users, TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Admin });

type Offer = {
  id: number; num: string; name: string;
  price: string; summer: number; services: string; active: number;
};
type Page = "offers" | "analytics";
const STORAGE_KEY = "rr_admin_secret";

/* ══════════════════════ LOGIN ══════════════════════ */
function LoginScreen({ onLogin }: { onLogin: (s: string) => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const attempt = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/verify", { headers: { "x-admin-secret": val } });
    if (res.ok) { localStorage.setItem(STORAGE_KEY, val); onLogin(val); }
    else { setErr(true); setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-rr-red bg-rr-red/10">
            <span className="font-bebas text-2xl text-rr-red">RR</span>
          </div>
          <h1 className="font-bebas text-3xl tracking-wide text-white">Admin Console</h1>
          <p className="mt-1 text-xs text-white/30">Red Radiance Management</p>
        </div>
        <div className="border border-white/8 bg-[#111] p-6">
          <label className="block text-[10px] uppercase tracking-widest text-white/35 mb-1.5">Password</label>
          <input
            type="password" value={val}
            onChange={(e) => { setVal(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Enter admin password"
            className="w-full border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-rr-red"
          />
          {err && <p className="mt-2 text-xs text-red-400">Incorrect password.</p>}
          <button
            onClick={attempt} disabled={loading}
            className="mt-4 w-full bg-rr-red py-3 text-sm font-semibold text-white transition hover:bg-rr-red/90 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ SIDEBAR ══════════════════════ */
function Sidebar({ page, setPage, onLogout, open, onClose }: {
  page: Page; setPage: (p: Page) => void; onLogout: () => void;
  open: boolean; onClose: () => void;
}) {
  const links: { id: Page; label: string; icon: ReactNode }[] = [
    { id: "offers",    label: "Offers",    icon: <Tag size={16} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={16} /> },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-56 shrink-0 flex-col border-r border-white/6 bg-[#0e0e0e] transition-transform duration-200 lg:relative lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-5">
          <div>
            <p className="font-bebas text-xl tracking-wide text-white">RR Admin</p>
            <p className="text-[10px] uppercase tracking-widest text-white/25">Management Console</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white lg:hidden"><X size={18} /></button>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); onClose(); }}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-all ${
                page === l.id
                  ? "bg-rr-red/15 text-white border-l-2 border-rr-red pl-2.5"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70 border-l-2 border-transparent pl-2.5"
              }`}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/6 p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white/30 transition hover:text-red-400"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ══════════════════════ ANALYTICS ══════════════════════ */
type AnalyticsData = {
  configured: boolean;
  today?: { pageViews: number; visitors: number };
  week?:  { pageViews: number; visitors: number; requests: number };
};

function StatCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="border border-white/8 bg-[#111] p-5">
      <div className="mb-2 flex items-center gap-2 text-white/30">
        {icon}
        <p className="text-[11px] uppercase tracking-widest">{label}</p>
      </div>
      <p className="font-bebas text-5xl text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function AnalyticsPage({ secret }: { secret: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics", { headers: { "x-admin-secret": secret } })
      .then((r) => r.json() as Promise<AnalyticsData>)
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setData({ configured: false }); setLoading(false); });
  }, [secret]);

  if (loading) return <div className="py-20 text-center text-sm text-white/20">Loading analytics...</div>;

  if (!data?.configured) {
    const steps: ReactNode[] = [
      "Go to Cloudflare dashboard → redradiance.in → Overview page",
      "Copy your Zone ID (shown in the right sidebar)",
      <>Go to <strong className="text-white/70">My Profile → API Tokens → Create Token</strong> → use template <strong className="text-white/70">"Read analytics for a zone"</strong> → select redradiance.in → Create Token → copy it</>,
      <>In Cloudflare: <strong className="text-white/70">Workers → redradiance → Settings → Variables &amp; Secrets</strong> → add:<br /><code className="text-rr-red/80">CF_ZONE_ID</code> = your Zone ID<br /><code className="text-rr-red/80">CF_API_TOKEN</code> = your API token</>,
      "Redeploy → analytics will appear here automatically",
    ];
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-white/35">Site visitor insights</p>
        </div>
        <div className="border border-white/8 bg-[#111] p-6">
          <p className="mb-1 font-bebas text-lg text-white/50">SETUP REQUIRED</p>
          <p className="mb-6 text-sm text-white/35">Connect your Google Analytics service account to view live visitor data.</p>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/50">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-rr-red/30 bg-rr-red/10 font-bebas text-xs text-rr-red">{i + 1}</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-white/35">Visitor insights from Google Analytics</p>
      </div>

      <p className="mb-3 text-[10px] uppercase tracking-widest text-white/30">Today</p>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="Page Views" value={data.today!.pageViews} icon={<Eye size={14} />} />
        <StatCard label="Visitors"   value={data.today!.visitors}  icon={<Users size={14} />} />
      </div>

      <p className="mb-3 text-[10px] uppercase tracking-widest text-white/30">Last 7 Days</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Page Views" value={data.week!.pageViews} icon={<Eye size={14} />} />
        <StatCard label="Visitors"   value={data.week!.visitors}  icon={<Users size={14} />} />
        <StatCard label="Requests"   value={data.week!.requests}  icon={<TrendingUp size={14} />} />
      </div>
    </div>
  );
}

/* ══════════════════════ OFFER CARD ══════════════════════ */
function OfferCard({ offer, secret, onRefresh }: { offer: Offer; secret: string; onRefresh: () => void }) {
  const parseServices = () => {
    try { return JSON.parse(offer.services).join("\n"); } catch { return offer.services; }
  };
  const [form, setForm] = useState({ name: offer.name, price: offer.price, summer: offer.summer, services: parseServices() });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    const arr = form.services.split("\n").map((s) => s.trim()).filter(Boolean);
    await fetch(`/api/admin/offers/${offer.id}`, {
      method: "PUT",
      headers: { "x-admin-secret": secret, "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, services: JSON.stringify(arr) }),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => { setSaved(false); onRefresh(); }, 1500);
  };

  const del = async () => {
    if (!confirm(`Delete offer "${offer.name} ₹${offer.price}"?`)) return;
    await fetch(`/api/admin/offers/${offer.id}`, { method: "DELETE", headers: { "x-admin-secret": secret } });
    onRefresh();
  };

  return (
    <div className="border border-white/8 bg-[#111] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="border border-rr-red/30 bg-rr-red/10 px-2 py-0.5 font-bebas text-sm text-rr-red">{offer.num}</span>
          <span className={`text-[9px] uppercase tracking-widest ${offer.summer ? "text-amber-400" : "text-white/30"}`}>
            {offer.summer ? "☀ Summer Special" : "Regular Combo"}
          </span>
        </div>
        <button onClick={del} className="text-white/20 transition hover:text-red-400"><Trash2 size={14} /></button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={lbl}>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lbl}>Price (₹)</label>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />
        </div>
        <div className="sm:col-span-2">
          <label className={lbl}>Services — one per line</label>
          <textarea rows={3} value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} className={inp + " resize-none"} />
        </div>
        <div className="sm:col-span-2">
          <label className={lbl}>Type</label>
          <div className="mt-1 flex gap-2">
            {[{ v: 0, label: "Regular Combo" }, { v: 1, label: "Summer Special" }].map((opt) => (
              <button
                key={opt.v}
                onClick={() => setForm({ ...form, summer: opt.v })}
                className={`border px-4 py-1.5 text-xs font-medium transition ${
                  form.summer === opt.v ? "border-rr-red bg-rr-red/10 text-rr-red" : "border-white/10 text-white/30 hover:border-white/25"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={save} disabled={saving}
        className="mt-4 inline-flex items-center gap-2 bg-rr-red px-5 py-2 text-sm font-semibold text-white transition hover:bg-rr-red/90 disabled:opacity-60"
      >
        <Save size={13} />
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}

/* ══════════════════════ ADD FORM ══════════════════════ */
function AddOffer({ secret, onAdded }: { secret: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ num: "", name: "Combo", price: "", summer: 0, services: "" });
  const [saving, setSaving] = useState(false);

  const add = async () => {
    setSaving(true);
    const arr = form.services.split("\n").map((s) => s.trim()).filter(Boolean);
    await fetch("/api/admin/offers", {
      method: "POST",
      headers: { "x-admin-secret": secret, "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, services: JSON.stringify(arr) }),
    });
    setSaving(false); setOpen(false);
    setForm({ num: "", name: "Combo", price: "", summer: 0, services: "" });
    onAdded();
  };

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="flex w-full items-center justify-center gap-2 border border-dashed border-white/10 py-4 text-sm text-white/25 transition hover:border-rr-red/30 hover:text-white/50"
    >
      <Plus size={15} /> Add New Offer
    </button>
  );

  return (
    <div className="border border-rr-red/20 bg-[#111] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bebas text-lg text-white">NEW OFFER</p>
        <button onClick={() => setOpen(false)} className="text-white/25 hover:text-white"><X size={16} /></button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={lbl}>Number (e.g. 06)</label>
          <input value={form.num} onChange={(e) => setForm({ ...form, num: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lbl}>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lbl}>Price (₹)</label>
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lbl}>Type</label>
          <select value={form.summer} onChange={(e) => setForm({ ...form, summer: Number(e.target.value) })} className={inp}>
            <option value={0}>Regular Combo</option>
            <option value={1}>Summer Special</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={lbl}>Services — one per line</label>
          <textarea rows={3} value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} className={inp + " resize-none"} />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={add} disabled={saving} className="bg-rr-red px-5 py-2 text-sm font-semibold text-white transition hover:bg-rr-red/90 disabled:opacity-60">
          {saving ? "Adding..." : "Add Offer"}
        </button>
        <button onClick={() => setOpen(false)} className="border border-white/10 px-5 py-2 text-sm text-white/40 transition hover:border-white/25">
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════ OFFERS PAGE ══════════════════════ */
function OffersPage({ offers, secret, onRefresh, loading }: { offers: Offer[]; secret: string; onRefresh: () => void; loading: boolean }) {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Offers</h1>
          <p className="mt-1 text-sm text-white/35">Edit combo deals — changes go live instantly</p>
        </div>
        <button onClick={onRefresh} disabled={loading} className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white/40 transition hover:border-white/25 hover:text-white/70 disabled:opacity-40">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-white/20">Loading offers...</div>
      ) : (
        <div className="space-y-4">
          {offers.map((o) => <OfferCard key={o.id} offer={o} secret={secret} onRefresh={onRefresh} />)}
          <AddOffer secret={secret} onAdded={onRefresh} />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════ MAIN ══════════════════════ */
function Admin() {
  const [secret, setSecret] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [page, setPage] = useState<Page>("offers");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetch("/api/offers").then((r) => r.json() as Promise<Offer[]>);
    setOffers(data);
    setLoading(false);
  };

  useEffect(() => { if (secret) load(); }, [secret]);

  const logout = () => { localStorage.removeItem(STORAGE_KEY); setSecret(""); };

  if (!secret) return <LoginScreen onLogin={setSecret} />;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Sidebar page={page} setPage={setPage} onLogout={logout} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-white/40 hover:text-white lg:hidden">
              <Menu size={20} />
            </button>
            <p className="text-sm font-medium capitalize text-white/70">{page}</p>
          </div>
          {page === "offers" && (
            <button onClick={load} disabled={loading} className="inline-flex items-center gap-1.5 text-xs text-white/30 transition hover:text-white/60 disabled:opacity-40">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          )}
        </div>

        <div className="p-6 lg:p-8">
          {page === "offers"    && <OffersPage offers={offers} secret={secret} onRefresh={load} loading={loading} />}
          {page === "analytics" && <AnalyticsPage secret={secret} />}
        </div>
      </main>
    </div>
  );
}

const inp = "mt-1 w-full border border-white/10 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white placeholder:text-white/15 outline-none focus:border-rr-red/60";
const lbl = "block text-[9px] uppercase tracking-widest text-white/30";
