import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

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
      className="font-bebas text-4xl leading-none text-rr-red"
    >
      0{suffix}
    </motion.span>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-rr-ink">
      <div className="lg:grid lg:min-h-[92vh] lg:grid-cols-[1.15fr_0.85fr]">

        {/* ── LEFT — content ── */}
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-24 sm:px-12 xl:px-20">

          {/* Giant faint "2011" watermark */}
          <div
            className="pointer-events-none absolute -bottom-8 -left-4 select-none font-bebas leading-none text-white/3"
            style={{ fontSize: "clamp(140px, 24vw, 340px)" }}
            aria-hidden
          >
            2011
          </div>

          {/* Label */}
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-rr-red">About Us</p>
          </Reveal>

          {/* Heading */}
          <Reveal delay={0.07}>
            <h2 className="font-bebas mt-4 text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.9] text-white">
              WHERE BEAUTY<br />
              MEETS{" "}
              <span className="text-rr-red">PERSONAL<br />CARE</span>
            </h2>
          </Reveal>

          {/* Divider */}
          <Reveal delay={0.12}>
            <div className="mt-7 flex items-center gap-4">
              <div className="h-px w-10 bg-rr-red" />
              <p className="font-display text-lg italic text-white/35">
                Because you deserve to shine with confidence.
              </p>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.17}>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
              A premium ladies salon in Keelkattalai, Chennai — where every service is
              delivered with care, precision, and full attention to you. From haircuts
              and colour to facials, waxing, threading, and bridal makeup.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-white/8 py-7">
              {[
                { to: 15,   suffix: "+", label: "Years" },
                { to: 5000, suffix: "+", label: "Clients" },
                { to: 7,    suffix: "",  label: "Days / Week" },
              ].map((s) => (
                <div key={s.label}>
                  <Counter to={s.to} suffix={s.suffix} />
                  <p className="mt-1.5 text-[9px] uppercase tracking-widest text-white/30">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Features */}
          <div className="mt-7 space-y-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.27 + i * 0.06}>
                <div className="flex items-start gap-4">
                  <div className="mt-[0.6rem] h-px w-6 shrink-0 bg-rr-red" />
                  <div>
                    <div className="text-sm font-semibold text-white/80">{f.title}</div>
                    <div className="mt-0.5 text-sm text-white/35">{f.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.47}>
            <a
              href="/#booking"
              className="group mt-10 inline-flex items-center gap-2.5 text-sm font-semibold text-rr-red transition-all duration-200 hover:gap-4"
            >
              Book your appointment
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* ── RIGHT — full-height image ── */}
        <div className="relative hidden min-h-96 lg:block">
          <img
            src="https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=900&q=85"
            alt="Red Radiance bridal styling"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          {/* Left-edge blend into dark content */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-rr-ink/80 via-rr-ink/20 to-transparent" />

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-rr-ink/60 to-transparent" />

          {/* Red bottom accent line */}
          <div className="absolute inset-x-0 bottom-0 h-0.75 bg-rr-red" />

          {/* Est. badge */}
          <div className="absolute bottom-8 right-8 text-right">
            <p className="text-[8px] font-medium uppercase tracking-[0.45em] text-white/35">Established</p>
            <p className="font-bebas text-7xl leading-none text-white/85">2011</p>
          </div>
        </div>

      </div>
    </section>
  );
}
