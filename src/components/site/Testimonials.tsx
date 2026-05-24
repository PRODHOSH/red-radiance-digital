import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const REVIEWS = [
  {
    id: "r1",
    name: "Kasthuri Subramanian",
    rating: 5,
    text: "Had a layer cut done today. I am completely happy with her service and the output. I strongly recommend this place to all my friends and family and will definitely come back here for other services regularly. Thank you Lakshya akka for your patience and service.",
  },
  {
    id: "r2",
    name: "Deepa Venkat",
    rating: 5,
    text: "Got my bridal makeup done here and the team was absolutely fantastic! The makeup was flawless, natural, and lasted all day. The hair styling was also beautiful. Highly recommend for any bride-to-be.",
  },
  {
    id: "r3",
    name: "Priya Rajan",
    rating: 5,
    text: "Excellent service! I visited for a facial and D-tan. The aesthetician was very knowledgeable and the facial massage was incredibly relaxing. My skin feels fresh and glowing.",
  },
  {
    id: "r4",
    name: "Anitha Suresh",
    rating: 5,
    text: "She treated very well. I took pedicure service — she gave a good massage for my leg and took all cracks on my foot. Affordable and she is giving massive offers now. Such a kind woman!",
  },
  {
    id: "r5",
    name: "Prasanna Yerramsetti",
    rating: 5,
    text: "I am extremely satisfied with the services here! The staff are extremely patient and experienced. They made me feel comfortable. It's a better place for parlour services at affordable prices.",
  },
  {
    id: "r6",
    name: "Kavitha Natarajan",
    rating: 5,
    text: "Very neat and clean salon. I usually go here for my regular threading and waxing. The staff is polite, very quick, and they make sure it's as painless as possible. Great value for money.",
  },
  {
    id: "r7",
    name: "Divya Krishnan",
    rating: 5,
    text: "Loved the hair spa treatment! My hair was feeling very dry and frizzy, but after the spa, it feels so soft and manageable. The head massage was the best part.",
  },
];

const G_COLORS = ["#4285F4", "#EA4335", "#34A853", "#FBBC05", "#4285F4", "#EA4335", "#34A853"];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-[#FBBC05]" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/>
        </svg>
      ))}
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, d?: number) => {
    setDir(d ?? (next > idx ? 1 : -1));
    setIdx(next);
  }, [idx]);

  const prev = () => go((idx - 1 + REVIEWS.length) % REVIEWS.length, -1);
  const next = useCallback(() => go((idx + 1) % REVIEWS.length, 1), [go, idx]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, paused]);

  const review = REVIEWS[idx];

  return (
    <section id="testimonials" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-rr-ink">
            LOVED BY WOMEN <span className="text-rr-red">ACROSS CHENNAI</span>
          </h2>
        </Reveal>

        {/* Editorial slider */}
        <div
          className="mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-[auto_1fr] items-start gap-6 sm:gap-10"
            >
              {/* Number column */}
              <div
                className="pointer-events-none select-none font-bebas leading-none text-rr-ink/[0.07]"
                style={{ fontSize: "clamp(80px, 13vw, 180px)" }}
                aria-hidden
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Content column */}
              <div className="pt-2">
                <Stars count={review.rating} />

                <blockquote className="font-display mt-5 text-[clamp(1.2rem,2.8vw,2.2rem)] italic leading-relaxed text-rr-ink/80">
                  "{review.text}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: G_COLORS[idx % G_COLORS.length] }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-rr-ink">{review.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-rr-ink/40">
                      <GoogleLogo /> Verified Google Review
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav bar */}
        <div className="mt-12 flex items-center justify-between border-t border-rr-ink/10 pt-6">

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-px rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-rr-red" : "w-4 bg-rr-ink/20 hover:bg-rr-ink/40"
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-sm font-medium tabular-nums text-rr-ink/35">
            {String(idx + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
          </span>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="border border-rr-ink/15 p-2.5 text-rr-ink/50 transition-all duration-150 hover:border-rr-red hover:text-rr-red active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="border border-rr-ink/15 p-2.5 text-rr-ink/50 transition-all duration-150 hover:border-rr-red hover:text-rr-red active:scale-95"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
