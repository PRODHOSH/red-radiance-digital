import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionLabel } from "./Reveal";

type DBCombo = {
  id: number;
  num: string;
  name: string;
  price: string;
  summer: number;
  services: string; // JSON string from D1
  active: number;
};

type Combo = DBCombo & { parsedServices: string[] };

// Fallback if API unreachable
const FALLBACK: DBCombo[] = [
  { id: 1, num: "01", name: "Combo",          price: "799", summer: 0, active: 1, services: '["Full Arm Wax","Under Arm","Half Leg"]' },
  { id: 2, num: "02", name: "Combo",          price: "499", summer: 0, active: 1, services: '["Hair Colour Root Touch Up","Hair Wash","U Cut"]' },
  { id: 3, num: "03", name: "Combo",          price: "999", summer: 0, active: 1, services: '["Pedicure","Manicure"]' },
  { id: 4, num: "04", name: "Summer Special", price: "599", summer: 1, active: 1, services: '["D-Tan","Whitening Facial","Threading"]' },
  { id: 5, num: "05", name: "Summer Special", price: "299", summer: 1, active: 1, services: '["Hot Oil Massage (Scalp)"]' },
];

function parseCombo(c: DBCombo): Combo {
  let parsedServices: string[] = [];
  try { parsedServices = JSON.parse(c.services); } catch { parsedServices = [c.services]; }
  return { ...c, parsedServices };
}

export function Offers() {
  const { data: raw = FALLBACK } = useQuery<DBCombo[]>({
    queryKey: ["offers"],
    queryFn: () => fetch("/api/offers").then((r) => r.json()),
    staleTime: 1000 * 60 * 5, // cache 5 min
  });

  const combos = raw.map(parseCombo);

  return (
    <section id="offers" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Special Combos</SectionLabel>
              <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-rr-ink">
                PAMPER YOURSELF <span className="text-rr-red">WITH OUR COMBOS</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-rr-ink/45 sm:text-right">Mention at booking to avail.</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {combos.map((combo, i) => (
            <Reveal key={combo.id} delay={i * 0.07} className={i === combos.length - 1 && combos.length % 2 !== 0 ? "sm:col-span-2" : ""}>
              <Ticket combo={combo} wide={i === combos.length - 1 && combos.length % 2 !== 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticket({ combo, wide }: { combo: Combo; wide?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(225,14,17,0.18)]"
    >
      {/* Left: price panel — gradient + diagonal texture */}
      <div
        className="relative flex w-32 shrink-0 flex-col items-center justify-center overflow-hidden px-4 py-8 text-white"
        style={{ background: "linear-gradient(150deg, #e10e11 0%, #b80b0d 100%)" }}
      >
        {/* Diagonal stripe overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 10px)",
          }}
        />
        {!!combo.summer && (
          <span className="relative z-10 mb-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">
            ☀ Summer
          </span>
        )}
        <div className="relative z-10 flex items-start leading-none">
          <span className="mt-1 font-bebas text-base text-white/60">₹</span>
          <span className="font-bebas text-[3.5rem] leading-none">{combo.price}</span>
        </div>
        {/* Watermark number */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-start overflow-hidden p-2">
          <span className="font-bebas text-[5rem] leading-none text-white opacity-[0.12]">{combo.num}</span>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="flex flex-col items-center justify-center gap-1.25 px-1.25">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="h-1.25 w-1.25 rounded-full bg-rr-ink/10" />
        ))}
      </div>

      {/* Right: details */}
      <div className={`flex flex-1 flex-col justify-between p-5 sm:p-6 ${wide ? "sm:flex-row sm:items-center" : ""}`}>
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-rr-red/60">{combo.num} — {combo.name}</p>
          <ul className="mt-3 space-y-1.5">
            {combo.parsedServices.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-rr-ink/65">
                <span className="h-px w-3 shrink-0 bg-rr-red" />{s}
              </li>
            ))}
          </ul>
        </div>
        <div className={`flex items-center justify-between gap-4 ${wide ? "sm:flex-col sm:items-end" : "mt-5"}`}>
          <a
            href="/#booking"
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-rr-red px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
          >
            <Calendar size={12} /> Book Now
          </a>
          <span className="text-[8px] uppercase tracking-wider text-rr-ink/25">Mention at booking</span>
        </div>
      </div>
    </motion.div>
  );
}
