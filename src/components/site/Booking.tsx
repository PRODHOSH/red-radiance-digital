import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const SERVICES = [
  "Stylish Haircut",
  "Hair Coloring",
  "Hair Spa",
  "Facial",
  "Cleanup",
  "Detan",
  "Waxing",
  "Threading",
  "Pedicure",
  "Manicure",
  "Bridal Makeup",
  "Party Makeup",
];

export function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: SERVICES[0],
    date: "",
    time: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
    <section id="booking" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel>Book Appointment</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-rr-ink sm:text-5xl md:text-6xl">
              Reserve your <span className="text-rr-red">radiance.</span>
            </h2>
            <p className="mt-6 max-w-md text-rr-ink/70">
              Tell us when you'd like to visit and our team will confirm your slot within
              a few minutes during business hours.
            </p>
          </Reveal>
          <div className="mt-10 hidden overflow-hidden rounded-3xl shadow-xl lg:block">
            <img
              src="https://images.unsplash.com/photo-1607008829749-c0f284a49841?auto=format&fit=crop&w=1200&q=80"
              alt="Salon ambience"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="rounded-3xl border border-rr-red/10 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(192,0,0,0.3)] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <input value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
              </Field>
              <Field label="Phone Number">
                <input value={form.phone} onChange={set("phone")} placeholder="+91 ..." className={inputCls} />
              </Field>
              <Field label="Service" className="sm:col-span-2">
                <select value={form.service} onChange={set("service")} className={inputCls}>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Date">
                <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
              </Field>
              <Field label="Preferred Time">
                <input type="time" value={form.time} onChange={set("time")} className={inputCls} />
              </Field>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-rr-red px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_30px_-10px_rgba(192,0,0,0.7)] transition-all hover:scale-[1.02]"
              >
                <Calendar size={16} /> Book Appointment
              </button>
              <button
                type="button"
                onClick={whatsapp}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-rr-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-rr-ink transition-all hover:border-rr-red hover:text-rr-red"
              >
                <MessageCircle size={16} /> WhatsApp Booking
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-rr-ink/50">
              By booking you agree to our standard salon policies.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-rr-ink/10 bg-rr-cream/40 px-4 py-3 text-sm text-rr-ink outline-none transition focus:border-rr-red focus:bg-white focus:ring-2 focus:ring-rr-red/20";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-widest text-rr-ink/60">
        {label}
      </div>
      {children}
    </label>
  );
}
