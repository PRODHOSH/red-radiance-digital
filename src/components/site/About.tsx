import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, HeartHandshake, Award, Leaf } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80";

const features = [
  { icon: HeartHandshake, title: "One-on-one attention", desc: "Dedicated stylist time without rush." },
  { icon: Sparkles, title: "Personalized care", desc: "Treatments tailored to your skin & hair." },
  { icon: Award, title: "Professional service", desc: "Trained beauticians, premium products." },
  { icon: Leaf, title: "Relaxing environment", desc: "Clean, calm, and beautifully designed." },
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
      className="font-display text-5xl font-medium text-rr-red"
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
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <motion.div
            style={{ y: imgY }}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <img src={ABOUT_IMG} alt="Inside Red Radiance" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-rr-ink/40 to-transparent" />
          </motion.div>
          <Reveal delay={0.2}>
            <div className="absolute -bottom-8 -right-4 hidden rounded-2xl glass p-5 shadow-xl sm:block">
              <div className="text-xs uppercase tracking-[0.3em] text-rr-red">Since</div>
              <div className="font-display text-4xl text-rr-ink">2018</div>
            </div>
          </Reveal>
          <div className="absolute -left-10 -top-10 -z-10 h-40 w-40 rounded-full bg-rr-red/20 blur-3xl" />
        </div>

        <div>
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-rr-ink sm:text-5xl md:text-6xl">
              Welcome to <span className="text-rr-red">Red Radiance</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-rr-ink/70 sm:text-lg">
              Step into Red Radiance where beauty meets personal care. Enjoy customized
              services designed to bring out your natural glow and confidence in a clean,
              comfortable and relaxing environment.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 + i * 0.07}>
                <div className="group rounded-2xl border border-rr-red/10 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rr-red/40 hover:shadow-[0_20px_40px_-20px_rgba(192,0,0,0.4)]">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rr-red/10 text-rr-red transition-colors group-hover:bg-rr-red group-hover:text-white">
                    <f.icon size={18} />
                  </div>
                  <div className="font-display text-lg text-rr-ink">{f.title}</div>
                  <div className="mt-1 text-sm text-rr-ink/60">{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-rr-red/10 pt-8">
            <div>
              <Counter to={5000} suffix="+" />
              <div className="mt-1 text-xs uppercase tracking-widest text-rr-ink/60">Happy clients</div>
            </div>
            <div>
              <Counter to={7} suffix="+" />
              <div className="mt-1 text-xs uppercase tracking-widest text-rr-ink/60">Years</div>
            </div>
            <div>
              <Counter to={30} suffix="+" />
              <div className="mt-1 text-xs uppercase tracking-widest text-rr-ink/60">Services</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
