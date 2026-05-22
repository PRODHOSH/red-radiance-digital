import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { MessageCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const SERVICES = [
  "Stylish Haircut","Hair Coloring","Hair Spa",
  "Facial","Cleanup","Detan",
  "Waxing","Threading","Pedicure","Manicure",
  "Bridal Makeup","Party Makeup",
];

const TIME_SLOTS = [
  "10:00","10:30","11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30",
  "19:00","19:30","20:00","20:30",
];

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const WEEK_DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeo6kcRF7JJKxoxF4SgdLEOWwxx0J0-2XXz0PngHZaQxTetWQ/formResponse";
const FIELDS = {
  name:    "entry.532243061",
  phone:   "entry.948409444",
  service: "entry.2142365749",
  date:    "entry.1576547663",
  time:    "entry.870122570",
} as const;

function formatDisplay(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

function formatTime(t: string) {
  const [h, min] = t.split(":").map(Number);
  return `${h > 12 ? h - 12 : h}:${String(min).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

/* ── Custom Calendar ── */
function CalendarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const today = new Date();
  const init = value ? new Date(value + "T00:00:00") : today;
  const [view, setView] = useState({ year: init.getFullYear(), month: init.getMonth() });

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstDay    = new Date(view.year, view.month, 1).getDay();
  const offset      = (firstDay + 6) % 7; // Monday-first offset

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectDay = (day: number) => {
    const m = String(view.month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${view.year}-${m}-${d}`);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const [y, m, d] = value.split("-").map(Number);
    return y === view.year && m - 1 === view.month && d === day;
  };

  const isToday = (day: number) =>
    today.getFullYear() === view.year && today.getMonth() === view.month && today.getDate() === day;

  const isPast = (day: number) =>
    new Date(view.year, view.month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const nav = (dir: number) => {
    setView(v => {
      const d = new Date(v.year, v.month + dir);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div className="w-full select-none">
      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => nav(-1)}
          className="border-2 border-rr-ink/10 p-1.5 text-rr-ink/50 transition-colors hover:border-rr-red hover:text-rr-red">
          <ChevronLeft size={15} />
        </button>
        <span className="font-bebas text-lg text-rr-ink">
          {MONTHS[view.month]} {view.year}
        </span>
        <button type="button" onClick={() => nav(1)}
          className="border-2 border-rr-ink/10 p-1.5 text-rr-ink/50 transition-colors hover:border-rr-red hover:text-rr-red">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7">
        {WEEK_DAYS.map(d => (
          <div key={d} className="py-1 text-center text-[10px] uppercase tracking-wider text-rr-ink/35">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square">
            {day && (
              <button
                type="button"
                disabled={isPast(day)}
                onClick={() => selectDay(day)}
                className={`h-full w-full text-sm transition-all duration-100 ${
                  isSelected(day)
                    ? "border-2 border-rr-red bg-rr-red font-semibold text-white shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
                    : isToday(day)
                    ? "border-2 border-rr-red font-semibold text-rr-red"
                    : isPast(day)
                    ? "cursor-not-allowed text-rr-ink/20"
                    : "text-rr-ink/60 hover:bg-rr-red/10 hover:text-rr-red"
                }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Time slot picker ── */
function TimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {TIME_SLOTS.map(slot => (
        <button
          key={slot}
          type="button"
          onClick={() => onChange(slot)}
          className={`px-1.5 py-2 text-xs font-medium transition-all duration-100 border-2 ${
            value === slot
              ? "border-rr-red bg-rr-red text-white shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
              : "border-rr-ink/10 text-rr-ink/55 hover:border-rr-red/40 hover:text-rr-red"
          }`}
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}

/* ── Dropdown wrapper ── */
function DropdownField({
  label, display, placeholder, children,
}: { label: string; display: string; placeholder: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-rr-ink/45">{label}</div>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full border-2 px-4 py-3 text-left text-sm transition-all ${
          open
            ? "border-rr-red shadow-[3px_3px_0_rgba(192,0,0,0.3)]"
            : "border-rr-ink/10 text-rr-ink/60 hover:border-rr-ink/25"
        } ${display ? "text-rr-ink" : "text-rr-ink/35"}`}
      >
        {display || placeholder}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-1 w-full border-2 border-rr-ink/10 bg-rr-surface p-4 shadow-[6px_6px_0_rgba(192,0,0,0.25)]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Main Booking section ── */
export function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", service: SERVICES[0], date: "", time: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number."); return;
    }
    setLoading(true);
    try {
      // Convert YYYY-MM-DD → DD-MM-YYYY to match Google Form format
      const [y, m, d] = form.date.split("-");
      const formattedDate = form.date ? `${d}-${m}-${y}` : "";

      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          [FIELDS.name]:    form.name,
          [FIELDS.phone]:   form.phone,
          [FIELDS.service]: form.service,
          [FIELDS.date]:    formattedDate,
          [FIELDS.time]:    form.time,
        }).toString(),
      });
      toast.success("Appointment booked! We'll confirm your slot shortly.");
      setForm({ name: "", phone: "", service: SERVICES[0], date: "", time: "" });
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(
      `Hi Red Radiance, I'd like to book an appointment.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nDate: ${form.date}\nTime: ${form.time}`
    );
    window.open(`https://wa.me/919597814476?text=${msg}`, "_blank");
  };

  return (
    <section id="booking" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel>Book Appointment</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-rr-ink">
              RESERVE YOUR <span className="text-rr-red">RADIANCE</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-rr-ink/55">
              Tell us when you'd like to visit and our team will confirm your slot within
              a few minutes during business hours.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="border-2 border-rr-ink/10 bg-rr-surface p-6 shadow-[8px_8px_0_rgba(192,0,0,0.3)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <Field label="Name">
                <input value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
              </Field>

              {/* Phone */}
              <Field label="Phone Number">
                <input value={form.phone} onChange={set("phone")} placeholder="+91 ..." className={inputCls} />
              </Field>

              {/* Service */}
              <Field label="Service" className="sm:col-span-2">
                <select value={form.service} onChange={set("service")} className={inputCls}>
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>

              {/* Date — custom calendar dropdown */}
              <DropdownField
                label="Preferred Date"
                display={formatDisplay(form.date)}
                placeholder="Pick a date"
              >
                <CalendarPicker value={form.date} onChange={d => setForm(f => ({ ...f, date: d }))} />
              </DropdownField>

              {/* Time — custom slot dropdown */}
              <DropdownField
                label="Preferred Time"
                display={form.time ? formatTime(form.time) : ""}
                placeholder="Pick a time"
              >
                <TimePicker value={form.time} onChange={t => setForm(f => ({ ...f, time: t }))} />
              </DropdownField>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-rr-red bg-rr-red px-6 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-x-0 disabled:translate-y-0"
              >
                <Calendar size={15} />
                {loading ? "Booking..." : "Book Appointment"}
              </button>
              <button
                type="button"
                onClick={whatsapp}
                className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-rr-ink/15 bg-rr-cream px-6 py-3.5 text-sm font-semibold text-rr-ink/70 shadow-[5px_5px_0_rgba(192,0,0,0.25)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:border-rr-red/50 hover:text-rr-ink hover:shadow-none"
              >
                <MessageCircle size={15} /> WhatsApp
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-rr-ink/35">
              By booking you agree to our standard salon policies.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls = "w-full border-2 border-rr-ink/10 bg-rr-surface-2 px-4 py-3 text-sm text-rr-ink placeholder:text-rr-ink/30 outline-none transition-all focus:border-rr-red focus:shadow-[3px_3px_0_rgba(192,0,0,0.3)]";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-rr-ink/45">{label}</div>
      {children}
    </label>
  );
}
