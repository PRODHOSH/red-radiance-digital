import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, MessageCircle } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY    = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayO = useTransform(scrollYProgress, [0, 1], [0.75, 0.92]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-rr-ink">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 origin-center">
        <img src={HERO_IMG} alt="Red Radiance salon interior" className="h-full w-full scale-105 object-cover blur-[3px] brightness-75" fetchPriority="high" />
      </motion.div>
      <motion.div
        style={{ opacity: overlayO }}
        className="absolute inset-0 bg-linear-to-t from-[#0e0a08] via-[#0e0a08]/60 to-[#0e0a08]/20"
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-2/5 bg-[radial-gradient(ellipse_at_bottom_right,rgba(192,0,0,0.18),transparent_70%)]" />

      <motion.div style={{ y: textY }} className="absolute inset-x-0 bottom-0 px-6 pb-20 sm:px-12 md:px-16 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-5 flex items-center gap-3"
        >
          <div className="h-px w-10 bg-rr-red" />
          <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/55">
            Premium Ladies Salon · Chennai
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
            <h1 className="font-bebas text-[22vw] leading-none text-rr-red sm:text-[16vw] md:text-[13vw] lg:text-[11vw]">RED</h1>
          </motion.div>
        </div>
        <div className="overflow-hidden mt-[-2vw]">
          <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}>
            <h1 className="font-bebas text-[22vw] leading-none text-white sm:text-[16vw] md:text-[13vw] lg:text-[11vw]">RADIANCE</h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="font-display max-w-sm text-base italic text-white/55 sm:text-lg">
            Where beauty meets personal care — Keelkattalai, Chennai.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-7 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(0,0,0,0.2)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <Calendar size={16} /> Book Appointment
            </a>
            <a
              href="https://wa.me/919597814476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/40 px-7 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(192,0,0,0.5)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      >
        <div className="text-[9px] uppercase tracking-[0.4em] text-white/30" style={{ writingMode: "vertical-rl" }}>Scroll</div>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px origin-top bg-linear-to-b from-rr-red to-transparent"
        />
      </motion.div>
    </section>
  );
}
