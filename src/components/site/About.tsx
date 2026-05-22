import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, HeartHandshake, Award, Leaf } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80";

const features = [
  { icon: HeartHandshake, title: "One-on-one attention",  desc: "Dedicated stylist time without rush." },
  { icon: Sparkles,       title: "Personalized care",     desc: "Treatments tailored to your skin & hair." },
  { icon: Award,          title: "Professional service",  desc: "Trained beauticians, premium products." },
  { icon: Leaf,           title: "Relaxing environment",  desc: "Clean, calm, and beautifully designed." },
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
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-rr-black py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-rr-red/10 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative">
          <motion.div
            style={{ y: imgY }}
            className="relative overflow-hidden border-2 border-white/10 shadow-[8px_8px_0_rgba(192,0,0,0.4)]"
          >
            <img
              src={ABOUT_IMG}
              alt="Inside Red Radiance"
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-rr-black/50 to-transparent" />
          </motion.div>

          {/* Since badge */}
          <Reveal delay={0.2}>
            <div className="absolute -bottom-6 -right-4 hidden border-2 border-rr-red bg-rr-surface p-5 shadow-[5px_5px_0_rgba(192,0,0,0.6)] sm:block">
              <div className="text-[10px] uppercase tracking-[0.35em] text-rr-red">Since</div>
              <div className="font-bebas text-5xl text-white">2018</div>
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div>
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              WELCOME TO <span className="text-rr-red">RED RADIANCE</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Step into Red Radiance where beauty meets personal care. Enjoy customized
              services designed to bring out your natural glow and confidence in a clean,
              comfortable and relaxing environment.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.07}>
                <div className="group border-2 border-white/8 bg-rr-surface p-5 shadow-[4px_4px_0_rgba(192,0,0,0.3)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center border border-rr-red/30 bg-rr-red/10 text-rr-red transition-colors group-hover:bg-rr-red group-hover:text-white">
                    <f.icon size={18} />
                  </div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="mt-1 text-sm text-white/45">{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
            <div>
              <Counter to={5000} suffix="+" />
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Happy clients</div>
            </div>
            <div>
              <Counter to={7} suffix="+" />
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Years</div>
            </div>
            <div>
              <Counter to={30} suffix="+" />
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Services</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
