import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#f8f4ee]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <svg
              viewBox="0 0 200 200"
              width="170"
              height="170"
              aria-hidden
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="rr-lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c00000" />
                  <stop offset="100%" stopColor="#8a0000" />
                </linearGradient>
              </defs>

              {/* ── Outer circle ring ── */}
              <motion.circle
                cx="100" cy="112" r="68"
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
              />

              {/* ── 12-gon inner polygon ── */}
              <motion.polygon
                points="100,44 134,53 159,78 168,112 159,146 134,171 100,180 66,171 41,146 32,112 41,78 66,53"
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.25 }}
              />

              {/* ── Facet lines: 6 diameters through polygon ── */}
              <motion.g
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <line x1="100" y1="44" x2="100" y2="180" />
                <line x1="134" y1="53" x2="66" y2="171" />
                <line x1="159" y1="78" x2="41" y2="146" />
                <line x1="168" y1="112" x2="32" y2="112" />
                <line x1="159" y1="146" x2="41" y2="78" />
                <line x1="134" y1="171" x2="66" y2="53" />
              </motion.g>

              {/* ── Crown outline ──
                  5 peaks: outer(75,36) inner(88,22) center(100,10) inner(112,22) outer(125,36)
                  Valleys: (82,44) (94,34) (106,34) (118,44)
                  Base band: y=45 to y=50
              */}
              <motion.path
                d="M68,50 L68,45 L75,36 L82,44 L88,22 L94,34 L100,10 L106,34 L112,22 L118,44 L125,36 L132,45 L132,50 Z"
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0, y: -14 }}
                animate={{ pathLength: 1, opacity: 1, y: 0 }}
                transition={{
                  pathLength: { duration: 1.0, delay: 1.0, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 1.0 },
                  y: { duration: 0.55, delay: 1.0, ease: "easeOut" },
                }}
              />

              {/* Crown base separator line */}
              <motion.path
                d="M68,45 L132,45"
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
              />

              {/* Crown inner diamond */}
              <motion.path
                d="M100,20 L109,38 L100,44 L91,38 Z"
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.4, delay: 1.9 }}
              />

              {/* Crown diamond inner cross */}
              <motion.g
                fill="none"
                stroke="url(#rr-lg)"
                strokeWidth="0.6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.3, delay: 2.0 }}
              >
                <line x1="100" y1="20" x2="100" y2="44" />
                <line x1="91" y1="38" x2="109" y2="38" />
              </motion.g>

              {/* Crown peak dots */}
              <motion.g
                fill="url(#rr-lg)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformOrigin: "100px 28px" }}
                transition={{ duration: 0.35, delay: 1.85, ease: "backOut" }}
              >
                <circle cx="100" cy="10" r="2.5" />
                <circle cx="88" cy="22" r="2" />
                <circle cx="112" cy="22" r="2" />
                <circle cx="75" cy="36" r="1.8" />
                <circle cx="125" cy="36" r="1.8" />
              </motion.g>

              {/* ── RR monogram ── */}
              <motion.text
                x="100"
                y="133"
                textAnchor="middle"
                fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
                fontWeight="700"
                fontSize="60"
                fill="url(#rr-lg)"
                letterSpacing="-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              >
                RR
              </motion.text>
            </svg>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="text-center"
            >
              <p className="font-display text-lg font-semibold tracking-wide text-rr-ink">
                Red Radiance
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.45em] text-rr-red">
                Ladies Salon
              </p>
            </motion.div>

            {/* Progress line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 130 }}
              transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
              className="h-px rounded-full bg-rr-red/50"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
