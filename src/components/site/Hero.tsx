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

        {/* "RED" — left, upper */}
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="pointer-events-none absolute left-8 select-none font-bebas leading-none text-rr-ink xl:left-14"
          style={{ fontSize: "min(18vw, 220px)", zIndex: 10, top: "20%" }}
        >
          RED
        </motion.span>

        {/* "RADIANCE" — left, below RED */}
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="pointer-events-none absolute left-8 select-none font-bebas leading-none text-rr-red xl:left-14"
          style={{ fontSize: "min(9.5vw, 112px)", zIndex: 10, top: "48%" }}
        >
          RADIANCE
        </motion.span>

        {/* ── Central tall image — bigger ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ zIndex: 20, height: "96svh", width: "46vw", maxWidth: "640px" }}
        >
          <img
            src="/images/hero.png"
            alt="Red Radiance bridal styling"
            className="h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-rr-cream via-rr-cream/60 to-transparent" />
        </motion.div>

        {/* Right side — arrow label + CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.65, ease }}
          className="absolute right-8 top-1/2 translate-y-[-60%] xl:right-14 flex flex-col items-start"
          style={{ zIndex: 30 }}
        >
          {/* Hand-drawn arrow + label */}
          <div className="mb-3 ml-4 flex items-center gap-3">
            <p className="font-display text-[22px] italic text-rr-ink/60">glow up today</p>
            <svg width="68" height="80" viewBox="0 0 68 80" fill="none" className="text-rr-red/65 shrink-0">
              <path
                d="M10 5 C2 22, 2 52, 50 72"
                stroke="currentColor" strokeWidth="2.5"
                strokeDasharray="5.5 4" strokeLinecap="round"
              />
              <path
                d="M40 68 L50 76 L56 64"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Book Appointment — neo brutal */}
          <a
            href="/#booking"
            className="flex w-full items-center gap-4 border-2 border-rr-ink bg-rr-red px-5 py-4 transition-all duration-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a] active:translate-x-1 active:translate-y-1 active:shadow-none"
            style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
          >
            <Calendar size={18} strokeWidth={2.5} className="shrink-0 text-white" />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/60">Reserve your slot</p>
              <p className="text-base font-extrabold leading-tight text-white whitespace-nowrap">Book Appointment</p>
            </div>
          </a>

          {/* WhatsApp — neo brutal */}
          <a
            href="https://wa.me/919597814476"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-4 border-2 border-rr-ink bg-white px-5 py-4 transition-all duration-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a] active:translate-x-1 active:translate-y-1 active:shadow-none"
            style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
          >
            <MessageCircle size={18} strokeWidth={2.5} className="shrink-0" style={{ color: "#25D366" }} />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-rr-ink/45">Chat with us</p>
              <p className="text-base font-extrabold leading-tight text-rr-ink whitespace-nowrap">WhatsApp</p>
            </div>
          </a>
        </motion.div>

        {/* Bottom-left: tagline only */}
        <div className="absolute bottom-10 left-10 xl:left-14" style={{ zIndex: 30 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.65, ease }}
            className="font-display max-w-[22ch] text-sm italic leading-relaxed text-rr-ink/45"
          >
            Where beauty meets personal care —<br />every visit, a private retreat.
          </motion.p>
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
