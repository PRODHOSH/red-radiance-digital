import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, HeartHandshake, Award, Leaf } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const features = [
  { icon: HeartHandshake, title: "One-on-one attention",  desc: "Dedicated time, no rush." },
  { icon: Sparkles,       title: "Customized for you",    desc: "Tailored to your skin & hair type." },
  { icon: Award,          title: "Precision & care",      desc: "Expert hands, premium products." },
  { icon: Leaf,           title: "Relaxing space",        desc: "Clean, calm, personal retreat." },
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
      className="font-bebas text-5xl text-rr-red"
    >
      0{suffix}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-rr-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: image stack ── */}
        <Reveal>
          <div className="relative">
            {/* Decorative offset frame */}
            <div className="absolute -left-3 -top-3 h-full w-full border-2 border-rr-red/25" aria-hidden />

            <motion.div style={{ y: imgY }} className="relative overflow-hidden border-2 border-rr-ink/12 shadow-[8px_8px_0_rgba(192,0,0,0.3)]">
              <img
                src="/images/entrance.png"
                alt="Red Radiance salon — Keelkattalai, Chennai"
                className="w-full object-cover object-top"
                style={{ aspectRatio: "5/4" }}
              />
              {/* Subtle gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-rr-ink/30 to-transparent" />
            </motion.div>

            {/* Est. badge — bottom right */}
            <div className="absolute -bottom-5 -right-3 border-2 border-rr-red/30 bg-rr-surface px-5 py-4 shadow-[5px_5px_0_rgba(192,0,0,0.4)]">
              <div className="text-[9px] uppercase tracking-[0.35em] text-rr-red">Est.</div>
              <div className="font-bebas text-4xl leading-none text-rr-ink">2011</div>
            </div>
          </div>
        </Reveal>

        {/* ── Right: content ── */}
        <div>
          <Reveal>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none text-rr-ink">
              WHERE BEAUTY MEETS{" "}
              <span className="text-rr-red">PERSONAL CARE</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-rr-ink/60">
              A premium ladies salon in Keelkattalai, Chennai — where every service is
              delivered with care, precision, and full attention to you. From haircuts
              and colour to facials, waxing, threading, and bridal makeup.
            </p>
            <p className="mt-3 font-display text-base italic text-rr-red">
              Because you deserve to shine with confidence.
            </p>
          </Reveal>

          {/* Feature grid */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.06}>
                <div className="group border-2 border-rr-ink/8 bg-rr-surface p-4 shadow-[4px_4px_0_rgba(192,0,0,0.2)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center border border-rr-red/20 bg-rr-red/8 text-rr-red transition-colors group-hover:bg-rr-red group-hover:text-white">
                    <f.icon size={16} />
                  </div>
                  <div className="text-sm font-semibold text-rr-ink">{f.title}</div>
                  <div className="mt-0.5 text-xs text-rr-ink/50">{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-rr-ink/8 pt-7">
            <div>
              <Counter to={5000} suffix="+" />
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-rr-ink/45">Clients</div>
            </div>
            <div>
              <Counter to={14} suffix="+" />
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-rr-ink/45">Years</div>
            </div>
            <div>
              <Counter to={30} suffix="+" />
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-rr-ink/45">Services</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
