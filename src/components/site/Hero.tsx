import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="home" className="relative h-svh min-h-150 w-full overflow-hidden bg-rr-cream">

      {/* ══════════════════════════════════════
          MOBILE  (< lg) — full-bleed image with text overlay
      ══════════════════════════════════════ */}
      <div className="relative h-full lg:hidden">
        {/* Full-bleed portrait image */}
        <img
          src="/images/hero.png"
          alt="Red Radiance bridal styling"
          className="absolute inset-0 h-full w-full object-cover object-[center_8%]"
        />

        {/* Gradient: transparent top → dark bottom for text */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />

        {/* Overlaid content — bottom anchored */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10">

          {/* Brand name */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease, delay: 0.2 }}
              className="font-bebas text-[23vw] leading-[0.88] text-white"
            >
              RED
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease, delay: 0.32 }}
              className="font-bebas text-[23vw] leading-[0.88] text-rr-red"
            >
              RADIANCE
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="font-display mt-2 text-sm italic leading-relaxed text-white/65"
          >
            Where beauty meets personal care — every visit, a private retreat.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 flex gap-6"
          >
            {[["15+", "Years"], ["5000+", "Clients"], ["7", "Days/Week"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-bebas text-2xl leading-none text-rr-red">{val}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-widest text-white/45">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-5 flex gap-2.5"
          >
            <a
              href="/#booking"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-rr-red px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rr-red/40 transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              <Calendar size={14} /> Book Appointment
            </a>
            <a
              href="https://wa.me/919597814476"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 active:scale-95"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </motion.div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-4 text-[9px] font-medium uppercase tracking-[0.45em] text-white/30"
          >
            Keelkattalai, Chennai
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP  (>= lg)
      ══════════════════════════════════════ */}
      <div className="relative hidden h-full w-full lg:block">

        {/* "RED" — upper left */}
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="pointer-events-none absolute left-8 select-none font-bebas leading-none text-rr-ink xl:left-14"
          style={{ fontSize: "min(18vw, 220px)", zIndex: 10, top: "26%" }}
        >
          RED
        </motion.span>

        {/* ── Central tall image ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ zIndex: 20, height: "94svh", width: "40vw", maxWidth: "560px" }}
        >
          <img
            src="/images/hero.png"
            alt="Red Radiance bridal styling"
            className="h-full w-full object-cover object-top"
          />
          {/* Bottom fade — blends image into cream */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-rr-cream via-rr-cream/60 to-transparent" />
        </motion.div>

        {/* "RADIANCE" — lower right */}
        <motion.span
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="pointer-events-none absolute right-8 select-none text-right font-bebas leading-none text-rr-red xl:right-14"
          style={{ fontSize: "min(10vw, 118px)", zIndex: 10, top: "52%" }}
        >
          RADIANCE
        </motion.span>

        {/* Bottom-left: tagline + CTAs */}
        <div className="absolute bottom-10 left-10 xl:left-16" style={{ zIndex: 30 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.65, ease }}
            className="font-display max-w-[26ch] text-sm italic leading-relaxed text-rr-ink/50"
          >
            Where beauty meets personal care —<br />every visit, a private retreat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.65, ease }}
            className="mt-5 flex gap-3"
          >
            <a
              href="/#booking"
              className="inline-flex items-center gap-2 rounded-full bg-rr-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rr-red/30 transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              <Calendar size={14} /> Book Appointment
            </a>
            <a
              href="https://wa.me/919597814476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-rr-red/30 px-6 py-3 text-sm font-semibold text-rr-red transition-all duration-200 hover:border-rr-red hover:bg-rr-red/5 active:scale-95"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Bottom-right: stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="absolute bottom-10 right-10 flex gap-8 xl:right-16"
          style={{ zIndex: 30 }}
        >
          {[["15+", "Years"], ["5000+", "Clients"], ["7", "Days/Week"]].map(([val, label]) => (
            <div key={label} className="text-right">
              <div className="font-bebas text-2xl leading-none text-rr-red">{val}</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-widest text-rr-ink/40">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom-center: location + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 30 }}
        >
          <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.45em] text-rr-ink/28">
            Keelkattalai, Chennai
          </p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={12} className="text-rr-ink/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
