import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const SERVICES = [
  "Stylish Haircut", "Hair Coloring", "Hair Spa",
  "Facial", "Cleanup", "Detan",
  "Waxing", "Threading", "Pedicure", "Manicure",
  "Bridal Makeup", "Party Makeup",
];

const BOOKING_IMG =
  "https://images.unsplash.com/photo-1607008829749-c0f284a49841?auto=format&fit=crop&w=1200&q=80";

export function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", service: SERVICES[0], date: "", time: "",
  });
  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    toast.success("Appointment request received! We'll call you shortly.");
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(
      `Hi Red Radiance, I'd like to book an appointment.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nDate: ${form.date}\nTime: ${form.time}`,
    );
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
  };

  return (
    <section id="booking" className="relative bg-rr-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/25 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <Reveal>
            <SectionLabel>Book Appointment</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-white">
              RESERVE YOUR <span className="text-rr-red">RADIANCE</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Tell us when you'd like to visit and our team will confirm your slot within
              a few minutes during business hours.
            </p>
          </Reveal>
          <div className="mt-10 hidden overflow-hidden border-2 border-white/8 shadow-[8px_8px_0_rgba(192,0,0,0.3)] lg:block">
            <img
              src={BOOKING_IMG}
              alt="Salon ambience"
              className="aspect-4/3 w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="border-2 border-white/8 bg-rr-surface p-6 shadow-[8px_8px_0_rgba(192,0,0,0.35)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  className={inputCls}
                />
              </Field>
              <Field label="Phone Number">
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 ..."
                  className={inputCls}
                />
              </Field>
              <Field label="Service" className="sm:col-span-2">
                <select value={form.service} onChange={set("service")} className={inputCls}>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Preferred Date">
                <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
              </Field>
              <Field label="Preferred Time">
                <input type="time" value={form.time} onChange={set("time")} className={inputCls} />
              </Field>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-rr-red bg-rr-red px-6 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(255,255,255,0.12)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <Calendar size={15} /> Book Appointment
              </button>
              <button
                type="button"
                onClick={whatsapp}
                className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white/15 bg-rr-surface-2 px-6 py-3.5 text-sm font-semibold text-white/70 shadow-[5px_5px_0_rgba(192,0,0,0.35)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:border-rr-red/50 hover:text-white hover:shadow-none"
              >
                <MessageCircle size={15} /> WhatsApp
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-white/25">
              By booking you agree to our standard salon policies.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-2 border-white/10 bg-rr-surface-2 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-rr-red focus:shadow-[3px_3px_0_rgba(192,0,0,0.4)]";

function Field({
  label, children, className,
}: {
  label: string; children: React.ReactNode; className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-white/35">
        {label}
      </div>
      {children}
    </label>
  );
}
