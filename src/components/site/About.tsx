import { motion } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel } from "./Reveal";

const features = [
  { title: "One-on-one attention",  desc: "Dedicated time, no rush." },
  { title: "Customized for you",    desc: "Tailored to your skin & hair type." },
  { title: "Precision & care",      desc: "Expert hands, premium products." },
  { title: "Relaxing space",        desc: "Clean, calm, personal retreat." },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        const el = ref.current;
        if (!el) return;
        const start = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * to) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
      className="font-bebas text-5xl leading-none text-rr-red"
    >
      0{suffix}
    </motion.span>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-rr-cream py-24 sm:py-32">
      {/* Faint "2011" watermark */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 select-none font-bebas leading-none text-rr-ink opacity-[0.025]"
        style={{ fontSize: "clamp(120px, 22vw, 320px)" }}
        aria-hidden
      >
        2011
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>About Us</SectionLabel>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-24">

          {/* LEFT — image + heading stacked */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {/* Heading */}
              <h2 className="font-bebas text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.92] text-rr-ink">
                WHERE BEAUTY<br />
                MEETS <span className="text-rr-red">PERSONAL<br />CARE</span>
              </h2>

              {/* Image — clean rectangle, no blob */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/entrance.png"
                  alt="Red Radiance salon — Keelkattalai, Chennai"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                {/* Bottom gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-rr-ink/40 to-transparent" />

                {/* Est. badge overlaid on image */}
                <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <div className="text-[8px] uppercase tracking-[0.35em] text-rr-red">Est.</div>
                  <div className="font-bebas text-3xl leading-none text-rr-ink">2011</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — content */}
          <div className="flex flex-col justify-center">
            {/* Pull quote */}
            <Reveal delay={0.08}>
              <p className="font-display text-[1.35rem] italic leading-relaxed text-rr-red">
                Because you deserve to shine with confidence.
              </p>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.14}>
              <p className="mt-5 text-base leading-relaxed text-rr-ink/60">
                A premium ladies salon in Keelkattalai, Chennai — where every service is
                delivered with care, precision, and full attention to you. From haircuts
                and colour to facials, waxing, threading, and bridal makeup.
              </p>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-rr-ink/10 py-6">
                {[{ to: 15, suffix: "+", label: "Years" }, { to: 5000, suffix: "+", label: "Clients" }, { to: 7, suffix: "", label: "Days / Week" }].map((s) => (
                  <div key={s.label}>
                    <Counter to={s.to} suffix={s.suffix} />
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-rr-ink/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Features — minimal list */}
            <div className="mt-7 space-y-4">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={0.25 + i * 0.06}>
                  <div className="flex items-start gap-4">
                    <div className="mt-[0.6rem] h-px w-7 shrink-0 bg-rr-red" />
                    <div>
                      <div className="text-sm font-semibold text-rr-ink">{f.title}</div>
                      <div className="mt-0.5 text-sm text-rr-ink/45">{f.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
