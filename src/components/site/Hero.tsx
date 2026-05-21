import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, MessageCircle } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={HERO_IMG} alt="Red Radiance salon interior" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#1a0606]/40 via-[#1a0606]/40 to-[#1a0606]/95"
      />
      {/* floating decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="rr-float absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,90,90,0.35),transparent_70%)] blur-2xl" />
        <div className="rr-float absolute bottom-[18%] right-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(192,0,0,0.4),transparent_70%)] blur-3xl" style={{ animationDelay: "-2s" }} />
        <svg className="rr-float absolute right-[14%] top-[18%] h-10 w-10 opacity-60" viewBox="0 0 64 64" style={{ animationDelay: "-3s" }}>
          <path d="M8 22 L18 34 L24 16 L32 32 L40 16 L46 34 L56 22 L52 46 L12 46 Z" fill="#ffffff" fillOpacity="0.85" />
        </svg>
      </div>

      <div className="relative z-10 flex h-full items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-6xl px-6 text-center text-white"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a5a]" />
            Premium Ladies Salon · Chennai
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            Beauty Meets <em className="not-italic text-[#ff8a8a]">Personal</em>
            <br className="hidden sm:block" /> Care.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Customized beauty services designed to bring out your natural glow and confidence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="#booking" primary>
              <Calendar size={18} /> Book Appointment
            </MagneticButton>
            <MagneticButton href="https://wa.me/919999999999" target="_blank">
              <MessageCircle size={18} /> WhatsApp Us
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-white/70"
      >
        <span className="inline-block animate-bounce">↓</span>&nbsp;&nbsp;Scroll
      </motion.div>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  primary,
  target,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow,background] duration-300 ${
        primary
          ? "bg-rr-red text-white shadow-[0_20px_40px_-12px_rgba(192,0,0,0.8)] hover:shadow-[0_25px_50px_-12px_rgba(192,0,0,1)]"
          : "glass-dark text-white hover:bg-white/20"
      }`}
    >
      {children}
    </a>
  );
}
