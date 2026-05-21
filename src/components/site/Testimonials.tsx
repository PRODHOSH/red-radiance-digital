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
  const [i, setI] = useState(0);
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
      className="relative overflow-hidden bg-gradient-to-b from-[#1a0606] to-[#2a0a0a] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="rr-float absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-rr-red/40 blur-[120px]" />
        <div className="rr-float absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-[#ff5a5a]/30 blur-[140px]" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Loved by women across <span className="text-[#ff8a8a]">Chennai.</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 h-[340px] max-w-3xl sm:h-[280px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 80 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl glass-dark p-8 sm:p-12"
            >
              <Quote className="mb-4 h-10 w-10 text-[#ff5a5a]/70" />
              <p className="font-display text-lg leading-relaxed text-white/90 sm:text-2xl">
                “{r.text}”
              </p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} className="fill-[#ffcf5a] text-[#ffcf5a]" />
                ))}
              </div>
              <div className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">
                {r.name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            className="rounded-full glass-dark p-3 text-white transition hover:bg-white/15"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                onClick={() => {
                  setDir(k > i ? 1 : -1);
                  setI(k);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-8 bg-rr-red" : "w-1.5 bg-white/30"
                }`}
                aria-label={`Go to review ${k + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="rounded-full glass-dark p-3 text-white transition hover:bg-white/15"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
