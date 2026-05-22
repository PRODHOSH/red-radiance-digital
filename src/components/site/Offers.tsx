import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const COMBOS = [
  {
    num: "01", name: "Combo", price: "799", summer: false,
    services: ["Full Arm Wax", "Under Arm", "Half Leg"],
  },
  {
    num: "02", name: "Combo", price: "499", summer: false,
    services: ["Hair Colour Root Touch Up", "Hair Wash", "U Cut"],
  },
  {
    num: "03", name: "Combo", price: "999", summer: false,
    services: ["Pedicure", "Manicure"],
  },
  {
    num: "04", name: "Summer Special", price: "599", summer: true,
    services: ["D-Tan", "Whitening Facial", "Threading"],
  },
  {
    num: "05", name: "Summer Special", price: "299", summer: true,
    services: ["Hot Oil Massage (Scalp)"],
  },
];

export function Offers() {
  return (
    <section id="offers" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Special Combos</SectionLabel>
              <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-rr-ink">
                PAMPER YOURSELF <span className="text-rr-red">WITH OUR COMBOS</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-rr-ink/45 sm:text-right">
              Mention at booking to avail.
            </p>
          </div>
        </Reveal>

        {/* Ticket grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {COMBOS.map((combo, i) => (
            <Reveal key={combo.num} delay={i * 0.07} className={i === 4 ? "sm:col-span-2" : ""}>
              <Ticket combo={combo} wide={i === 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Combo = (typeof COMBOS)[number];

function Ticket({ combo, wide }: { combo: Combo; wide?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex overflow-hidden border-2 border-rr-ink/10 bg-rr-surface shadow-[5px_5px_0_rgba(192,0,0,0.35)] transition-shadow duration-200 hover:shadow-[7px_7px_0_rgba(192,0,0,0.45)]"
    >
      {/* ── Left: price panel ── */}
      <div className="relative flex w-28 shrink-0 flex-col items-center justify-center bg-rr-red px-4 py-8 text-white">
        {combo.summer && (
          <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
            ☀ Summer
          </span>
        )}
        <div className="flex items-start leading-none">
          <span className="mt-1 font-bebas text-base text-white/70">₹</span>
          <span className="font-bebas text-5xl leading-none">{combo.price}</span>
        </div>
        {/* Subtle diagonal text watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-start overflow-hidden p-2 opacity-10">
          <span className="font-bebas text-[4rem] leading-none text-white">{combo.num}</span>
        </div>
      </div>

      {/* ── Perforated dots (ticket tear line) ── */}
      <div className="relative flex flex-col items-center justify-center gap-1.25 bg-rr-surface px-0 py-4">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-rr-cream" />
        ))}
      </div>

      {/* ── Right: details ── */}
      <div className={`flex flex-1 flex-col justify-between p-5 sm:p-6 ${wide ? "sm:flex-row sm:items-center" : ""}`}>
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-rr-ink/35">{combo.num} — {combo.name}</p>
          <ul className="mt-3 space-y-1.5">
            {combo.services.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-rr-ink/65">
                <span className="h-1 w-1 shrink-0 bg-rr-red" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#booking"
          className={`inline-flex items-center gap-1.5 self-start border-2 border-rr-red bg-rr-red px-4 py-2.5 text-xs font-semibold text-white shadow-[3px_3px_0_rgba(0,0,0,0.12)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${wide ? "sm:self-center" : "mt-5"}`}
        >
          <Calendar size={12} /> Book Now
        </a>
      </div>
    </motion.div>
  );
}
