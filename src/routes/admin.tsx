import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Trash2, Save, LogOut, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

type Offer = {
  id: number;
  num: string;
  name: string;
  price: string;
  summer: number;
  services: string;
  active: number;
};

const STORAGE_KEY = "rr_admin_secret";

/* ── Auth Gate ── */
function LoginScreen({ onLogin }: { onLogin: (secret: string) => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const attempt = async () => {
    const res = await fetch("/api/admin/verify", {
      headers: { "x-admin-secret": val },
    });
    if (res.ok) {
      localStorage.setItem(STORAGE_KEY, val);
      onLogin(val);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e0a08]">
      <div className="w-full max-w-sm border-2 border-white/10 bg-[#1a1410] p-8 shadow-[8px_8px_0_rgba(192,0,0,0.4)]">
        <div className="mb-6 text-center">
          <p className="font-bebas text-4xl tracking-wide text-white">RR ADMIN</p>
          <p className="mt-1 text-xs text-white/30 uppercase tracking-widest">Red Radiance</p>
        </div>
        <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
          Admin Password
        </label>
        <input
          type="password"
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="Enter password"
          className="w-full border-2 border-white/10 bg-[#0e0a08] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-rr-red"
        />
        {err && <p className="mt-2 text-xs text-red-400">Wrong password. Try again.</p>}
        <button
          onClick={attempt}
          className="mt-4 w-full border-2 border-rr-red bg-rr-red py-3 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(255,255,255,0.1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          Login
        </button>
      </div>
    </div>
  );
}

/* ── Offer Editor Card ── */
function OfferCard({
  offer,
  secret,
  onSaved,
  onDeleted,
}: {
  offer: Offer;
  secret: string;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [form, setForm] = useState({
    name: offer.name,
    price: offer.price,
    summer: offer.summer,
    services: (() => {
      try { return JSON.parse(offer.services).join("\n"); } catch { return offer.services; }
    })(),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    const servicesArr = form.services.split("\n").map((s) => s.trim()).filter(Boolean);
    await fetch(`/api/admin/offers/${offer.id}`, {
      method: "PUT",
      headers: { "x-admin-secret": secret, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: form.price,
        summer: form.summer,
        services: JSON.stringify(servicesArr),
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSaved();
  };

  const del = async () => {
    if (!confirm(`Delete "${offer.name} ₹${offer.price}"?`)) return;
    await fetch(`/api/admin/offers/${offer.id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": secret },
    });
    onDeleted();
  };

  return (
    <div className="border-2 border-white/10 bg-[#1a1410] p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-bebas text-lg text-white">{offer.num}</span>
        <button onClick={del} className="text-white/30 transition hover:text-red-400">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Name */}
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={input}
          />
        </Field>

        {/* Price */}
        <Field label="Price (₹)">
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={input}
          />
        </Field>

        {/* Services */}
        <Field label="Services (one per line)" className="sm:col-span-2">
          <textarea
            rows={3}
            value={form.services}
            onChange={(e) => setForm({ ...form, services: e.target.value })}
            className={input + " resize-none"}
          />
        </Field>

        {/* Summer toggle */}
        <Field label="Type" className="sm:col-span-2">
          <div className="flex gap-3">
            {[{ label: "Regular Combo", val: 0 }, { label: "Summer Special", val: 1 }].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setForm({ ...form, summer: opt.val })}
                className={`border-2 px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  form.summer === opt.val
                    ? "border-rr-red bg-rr-red text-white"
                    : "border-white/15 text-white/40 hover:border-white/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="mt-4 inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-5 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_rgba(255,255,255,0.1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-60"
      >
        <Save size={14} />
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}

/* ── Add Offer Form ── */
function AddOfferForm({ secret, onAdded }: { secret: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ num: "", name: "Combo", price: "", summer: 0, services: "" });
  const [saving, setSaving] = useState(false);

  const add = async () => {
    setSaving(true);
    const servicesArr = form.services.split("\n").map((s) => s.trim()).filter(Boolean);
    await fetch("/api/admin/offers", {
      method: "POST",
      headers: { "x-admin-secret": secret, "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, services: JSON.stringify(servicesArr) }),
    });
    setSaving(false);
    setOpen(false);
    setForm({ num: "", name: "Combo", price: "", summer: 0, services: "" });
    onAdded();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 border-2 border-dashed border-white/15 py-4 text-sm text-white/40 transition hover:border-rr-red/50 hover:text-white/60"
      >
        <Plus size={16} /> Add New Offer
      </button>
    );
  }

  return (
    <div className="border-2 border-rr-red/30 bg-[#1a1410] p-5">
      <p className="mb-4 font-bebas text-lg text-white">NEW OFFER</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Number (e.g. 06)">
          <input value={form.num} onChange={(e) => setForm({ ...form, num: e.target.value })} className={input} />
        </Field>
        <Field label="Name">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
        </Field>
        <Field label="Price (₹)">
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={input} />
        </Field>
        <Field label="Type">
          <select
            value={form.summer}
            onChange={(e) => setForm({ ...form, summer: Number(e.target.value) })}
            className={input}
          >
            <option value={0}>Regular Combo</option>
            <option value={1}>Summer Special</option>
          </select>
        </Field>
        <Field label="Services (one per line)" className="sm:col-span-2">
          <textarea
            rows={3}
            value={form.services}
            onChange={(e) => setForm({ ...form, services: e.target.value })}
            className={input + " resize-none"}
          />
        </Field>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={add}
          disabled={saving}
          className="border-2 border-rr-red bg-rr-red px-5 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_rgba(255,255,255,0.1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add Offer"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="border-2 border-white/15 px-5 py-2.5 text-sm text-white/50 transition hover:border-white/30"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── Main Admin Component ── */
function Admin() {
  const [secret, setSecret] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOffers = async () => {
    setLoading(true);
    const res = await fetch("/api/offers");
    const data = await res.json();
    setOffers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (secret) loadOffers();
  }, [secret]);

  if (!secret) return <LoginScreen onLogin={setSecret} />;

  return (
    <div className="min-h-screen bg-[#0e0a08] text-white">
      {/* Top bar */}
      <div className="border-b border-white/8 bg-[#0e0a08] px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="font-bebas text-2xl tracking-wide text-white">RR ADMIN</p>
            <p className="text-[10px] uppercase tracking-widest text-white/30">Offers Manager</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="border border-white/10 px-3 py-1.5 text-xs text-white/40 transition hover:border-white/25 hover:text-white/60"
            >
              View Site ↗
            </a>
            <button
              onClick={loadOffers}
              disabled={loading}
              className="border border-white/10 p-2 text-white/40 transition hover:border-white/25 hover:text-white/60"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => { localStorage.removeItem(STORAGE_KEY); setSecret(""); }}
              className="border border-white/10 p-2 text-white/40 transition hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-bebas text-3xl text-white">
            OFFERS <span className="text-rr-red">({offers.length})</span>
          </h1>
          <p className="text-xs text-white/25">Changes go live on the site immediately</p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-white/30">Loading offers...</div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                secret={secret}
                onSaved={loadOffers}
                onDeleted={loadOffers}
              />
            ))}
            <AddOfferForm secret={secret} onAdded={loadOffers} />
          </div>
        )}
      </div>
    </div>
  );
}

const input =
  "w-full border-2 border-white/10 bg-[#0e0a08] px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-rr-red";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <div className="mb-1 text-[9px] uppercase tracking-widest text-white/35">{label}</div>
      {children}
    </label>
  );
}
