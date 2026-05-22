import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Tag, RefreshCw, LogOut,
  Save, Trash2, Plus, ExternalLink, X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Admin });

type Offer = {
  id: number; num: string; name: string;
  price: string; summer: number; services: string; active: number;
};
type Page = "overview" | "offers";
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
function Sidebar({ page, setPage, onLogout }: { page: Page; setPage: (p: Page) => void; onLogout: () => void }) {
  const links: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview",  icon: <LayoutDashboard size={16} /> },
    { id: "offers",   label: "Offers",    icon: <Tag size={16} /> },
  ];

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/6 bg-[#0e0e0e]">
      {/* Brand */}
      <div className="border-b border-white/6 px-5 py-5">
        <p className="font-bebas text-xl tracking-wide text-white">RR Admin</p>
        <p className="text-[10px] uppercase tracking-widest text-white/25">Management Console</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 p-3">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-all ${
              page === l.id
                ? "bg-rr-red/15 text-white border-l-2 border-rr-red pl-2.5"
                : "text-white/40 hover:bg-white/5 hover:text-white/70 border-l-2 border-transparent pl-2.5"
            }`}
          >
            {l.icon} {l.label}
          </button>
        ))}

        {/* External links */}
        <div className="pt-4">
          <p className="px-3 pb-2 text-[9px] uppercase tracking-widest text-white/20">External</p>
          <a
            href="https://docs.google.com/spreadsheets"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 pl-2.5 text-sm text-white/40 transition hover:bg-white/5 hover:text-white/70"
          >
            <ExternalLink size={16} /> Bookings Sheet
          </a>
          <a
            href="/"
            target="_blank"
            className="flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 pl-2.5 text-sm text-white/40 transition hover:bg-white/5 hover:text-white/70"
          >
            <ExternalLink size={16} /> View Site
          </a>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/6 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white/30 transition hover:text-red-400"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

/* ══════════════════════ OVERVIEW ══════════════════════ */
function Overview({ offers }: { offers: Offer[] }) {
  const total   = offers.length;
  const regular = offers.filter((o) => !o.summer).length;
  const summer  = offers.filter((o) => o.summer).length;

  const cards = [
    { label: "Total Offers",     value: total,   desc: "Active combo deals on the site" },
    { label: "Regular Combos",   value: regular, desc: "Standard combo packages" },
    { label: "Summer Specials",  value: summer,  desc: "Seasonal limited-time offers" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-sm text-white/35">Red Radiance admin dashboard</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="border border-white/8 bg-[#111] p-5">
            <p className="text-[11px] uppercase tracking-widest text-white/35">{c.label}</p>
            <p className="mt-2 font-bebas text-5xl text-white">{c.value}</p>
            <p className="mt-2 text-xs text-white/30">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 border border-white/8 bg-[#111] p-5">
        <p className="mb-4 text-[11px] uppercase tracking-widest text-white/35">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://docs.google.com/spreadsheets"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white/50 transition hover:border-rr-red/50 hover:text-white"
          >
            <ExternalLink size={14} /> View Booking Responses
          </a>
          <a
            href="/" target="_blank"
            className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white/50 transition hover:border-rr-red/50 hover:text-white"
          >
            <ExternalLink size={14} /> Open Live Site
          </a>
        </div>
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
          <span className="border border-rr-red/30 bg-rr-red/10 px-2 py-0.5 font-bebas text-sm text-rr-red">
            {offer.num}
          </span>
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
          <div className="flex gap-2 mt-1">
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
  const [page, setPage] = useState<Page>("overview");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetch("/api/offers").then((r) => r.json());
    setOffers(data);
    setLoading(false);
  };

  useEffect(() => { if (secret) load(); }, [secret]);

  const logout = () => { localStorage.removeItem(STORAGE_KEY); setSecret(""); };

  if (!secret) return <LoginScreen onLogin={setSecret} />;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Sidebar page={page} setPage={setPage} onLogout={logout} />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#0a0a0a]/95 px-8 py-4 backdrop-blur">
          <p className="text-sm font-medium capitalize text-white/70">{page}</p>
          <button onClick={load} disabled={loading} className="inline-flex items-center gap-1.5 text-xs text-white/30 transition hover:text-white/60 disabled:opacity-40">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="p-8">
          {page === "overview" && <Overview offers={offers} />}
          {page === "offers"   && <OffersPage offers={offers} secret={secret} onRefresh={load} loading={loading} />}
        </div>
      </main>
    </div>
  );
}

const inp = "mt-1 w-full border border-white/10 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white placeholder:text-white/15 outline-none focus:border-rr-red/60";
const lbl = "block text-[9px] uppercase tracking-widest text-white/30";
