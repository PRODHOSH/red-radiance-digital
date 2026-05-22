import { motion } from "framer-motion";
import { Sparkles, Gift, Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const OFFERS = [
  {
    tag: "Bridal",
    title: "20% Off Bridal Package",
    desc: "Complete bridal makeover including makeup, hair, saree draping and pre-bridal skin care.",
    icon: Sparkles,
  },
  {
    tag: "Hair",
    title: "Free Haircut with Hair Spa",
    desc: "Pair any signature hair spa with a complimentary stylish cut by our senior stylist.",
    icon: Gift,
  },
  {
    tag: "Seasonal",
    title: "Seasonal Beauty Offers",
    desc: "Refresh your skin with seasonal detan, cleanup & facial combos at curated rates.",
    icon: Calendar,
  },
];

export function Offers() {
  return (
    <section id="offers" className="relative bg-rr-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel>Offers</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-white">
              WORTH <span className="text-rr-red">GLOWING FOR</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-white/45">
              Limited-time offers crafted to make premium beauty accessible. Mention at booking.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 4, y: 4 }}
                transition={{ duration: 0.15 }}
                className="group relative border-2 border-white/10 bg-rr-surface p-8 text-white shadow-[6px_6px_0_rgba(192,0,0,0.5)] transition-shadow duration-150 hover:shadow-none"
              >
                {/* Top red accent line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-rr-red" />

                <div className="mb-6 flex items-center justify-between">
                  <span className="border border-rr-red/40 bg-rr-red/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-rr-red">
                    {o.tag}
                  </span>
                  <o.icon size={18} className="text-rr-red/60" />
                </div>
                <h3 className="font-bebas text-[1.9rem] leading-tight text-white">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{o.desc}</p>
                <a
                  href="#booking"
                  className="mt-8 inline-flex items-center gap-1.5 border border-rr-red/40 px-4 py-2 text-sm font-semibold text-rr-red shadow-[3px_3px_0_rgba(192,0,0,0.4)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  Claim offer →
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
