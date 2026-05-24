import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

type Category = { title: string; subtitle: string; image: string; items: string[] };

const CATS: Category[] = [
  {
    title: "Hair", subtitle: "Services",
    image: "/images/hair.png",
    items: ["Stylish Haircut", "Hair Coloring", "Hair Spa", "Hair Treatments"],
  },
  {
    title: "Skin", subtitle: "Care",
    image: "/images/skin.png",
    items: ["Facial", "Cleanup", "Detan", "Skin Brightening"],
  },
  {
    title: "Beauty", subtitle: "Services",
    image: "/images/beauty.png",
    items: ["Waxing", "Threading", "Pedicure", "Manicure"],
  },
  {
    title: "Bridal", subtitle: "Packages",
    image: "/images/bride.png",
    items: ["Bridal Makeup", "Saree Draping", "Party Makeup", "Pre-Bridal Care"],
  },
];

const TOTAL = CATS.length;

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section id="services" className="bg-rr-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal><SectionLabel>Services</SectionLabel></Reveal>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="font-bebas text-[clamp(2.8rem,8vw,7rem)] text-rr-ink leading-none">
              WHAT WE <span className="text-rr-red">DO BEST</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-rr-ink/50 sm:text-right">
              Scroll through each service — crafted with precision and premium products.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {CATS.map((cat, i) => (
            <ServiceCard key={cat.title} service={cat} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, scrollYProgress }: { service: Category; index: number; scrollYProgress: MotionValue<number> }) {
  const yInput  = index === 0 ? [0, 1] : [(index - 1) / TOTAL, index / TOTAL];
  const yOutput = index === 0 ? ["0%", "0%"] : ["100%", "0%"];
  const y = useTransform(scrollYProgress, yInput, yOutput);

  const scInput  = index < TOTAL - 1 ? [index / TOTAL, (index + 1) / TOTAL] : [0, 1];
  const scOutput = index < TOTAL - 1 ? [1, 0.94] : [1, 1];
  const scale = useTransform(scrollYProgress, scInput, scOutput);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ y, scale, zIndex: index + 1, transformOrigin: "50% 0" }}>
      {/* Desktop split */}
      <div className="hidden h-full lg:flex">
        <div className="relative flex w-[42%] shrink-0 flex-col justify-center bg-rr-cream px-14 xl:px-20">
          <div className="relative z-10">
            <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-rr-red">{num} — {service.subtitle}</p>
            <h3 className="font-bebas text-[clamp(3.5rem,7vw,6.5rem)] leading-none text-rr-ink">{service.title}</h3>
            <div className="mt-2 h-px w-12 bg-rr-red" />
            <ul className="mt-8 space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-rr-ink/50">
                  <span className="h-px w-5 shrink-0 bg-rr-red/50" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/#booking"
              className="mt-10 inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-7 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <Calendar size={15} /> Book Now
            </a>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-0 bg-linear-to-r from-rr-cream via-rr-cream/5 to-transparent" />
        </div>
      </div>

      {/* Mobile */}
      <div className="relative flex h-full flex-col justify-end lg:hidden">
        <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative z-10 px-6 pb-24 pt-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.45em] text-rr-red">{num} — {service.subtitle}</p>
          <h3 className="font-bebas text-[18vw] leading-none text-white">{service.title}</h3>
          <div className="mt-1 h-px w-10 bg-rr-red" />
          <ul className="mt-5 space-y-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-px w-4 shrink-0 bg-rr-red" />{item}
              </li>
            ))}
          </ul>
          <a href="/#booking" className="mt-7 inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-6 py-3 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            <Calendar size={14} /> Book Now
          </a>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {CATS.map((_, k) => (
          <div key={k} className={`transition-all duration-300 ${k === index ? "h-6 w-1 bg-rr-red" : "h-1.5 w-1 bg-rr-ink/20"}`} />
        ))}
      </div>
    </motion.div>
  );
}
