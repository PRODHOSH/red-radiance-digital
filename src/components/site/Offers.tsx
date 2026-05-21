import { motion } from "framer-motion";
import { Sparkles, Gift, Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const OFFERS = [
  {
    tag: "Bridal",
    title: "20% Off Bridal Package",
    desc: "Complete bridal makeover including makeup, hair, saree draping and pre-bridal skin care.",
    icon: Sparkles,
    color: "from-[#c00000] to-[#8a0000]",
  },
  {
    tag: "Hair",
    title: "Free Haircut with Hair Spa",
    desc: "Pair any signature hair spa with a complimentary stylish cut by our senior stylist.",
    icon: Gift,
    color: "from-[#e11d1d] to-[#c00000]",
  },
  {
    tag: "Seasonal",
    title: "Seasonal Beauty Offers",
    desc: "Refresh your skin with seasonal detan, cleanup & facial combos at curated rates.",
    icon: Calendar,
    color: "from-[#ff5a5a] to-[#c00000]",
  },
];

export function Offers() {
  return (
    <section id="offers" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel>Offers</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-rr-ink sm:text-5xl md:text-6xl">
              Promotions worth <span className="text-rr-red">glowing for.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-rr-ink/60">
              Limited-time offers crafted to make premium beauty accessible. Mention the
              offer at the time of booking.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group relative overflow-hidden rounded-3xl bg-rr-ink p-8 text-white shadow-xl"
              >
                <div
                  className={`absolute -inset-1 -z-0 bg-gradient-to-br ${o.color} opacity-90`}
                />
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl transition-all duration-700 group-hover:scale-150" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                      {o.tag}
                    </div>
                    <o.icon className="opacity-80" />
                  </div>
                  <h3 className="font-display text-3xl leading-tight">{o.title}</h3>
                  <p className="mt-3 text-sm text-white/80">{o.desc}</p>
                  <a
                    href="#booking"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    Claim offer →
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
