import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const REVIEWS = [
  {
    name: "Shankari S",
    text: "Wonderful service here! I went for a facial and haircut, and the experience was truly professional. The work was done with great care and expertise. I've never had such a detailed and relaxing facial at such an affordable price.",
  },
  {
    name: "Chandra N",
    text: "Had a very relaxing facial and smooth waxing service. Clean, professional, and friendly experience. Highly recommended!",
  },
  { name: "Ramesh R", text: "Good atmosphere and professional." },
  {
    name: "prasanna yerramsetti",
    text: "I am extremely satisfied with the services here. The staff are patient and experienced. They made me feel comfortable.",
  },
  { name: "Nandhini Rajagopal", text: "Good service" },
  {
    name: "Maheswari Subramanian",
    text: "I had pedicure service done here today. Very good massage was given. Happy and satisfied.",
  },
];

export function Testimonials() {
  const [i, setI]     = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + REVIEWS.length) % REVIEWS.length);
  };

  const r = REVIEWS[i];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-rr-black py-24 text-white sm:py-32"
    >
      {/* Subtle red ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rr-red/8 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/25 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-white">
            LOVED BY WOMEN ACROSS <span className="text-rr-red">CHENNAI</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 h-90 max-w-3xl sm:h-75">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-rr-surface p-8 sm:p-12"
            >
              <Quote className="mb-5 h-8 w-8 text-rr-red/50" />
              <p className="font-display text-lg italic leading-relaxed text-white/80 sm:text-xl">
                "{r.text}"
              </p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} className="fill-[#ffcf5a] text-[#ffcf5a]" />
                ))}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.35em] text-white/40">
                {r.name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="rounded-full border border-white/8 p-3 text-white/50 transition hover:border-rr-red/50 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="flex gap-1.5">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-7 bg-rr-red" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to review ${k + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="rounded-full border border-white/8 p-3 text-white/50 transition hover:border-rr-red/50 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
