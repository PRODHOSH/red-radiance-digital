import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Calendar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

type Category = {
  title: string;
  subtitle: string;
  image: string;
  items: string[];
};

const CATS: Category[] = [
  {
    title: "Hair",
    subtitle: "Services",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80",
    items: ["Stylish Haircut", "Hair Coloring", "Hair Spa", "Hair Treatments"],
  },
  {
    title: "Skin",
    subtitle: "Care",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
    items: ["Facial", "Cleanup", "Detan", "Skin Brightening"],
  },
  {
    title: "Beauty",
    subtitle: "Services",
    image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=1600&q=80",
    items: ["Waxing", "Threading", "Pedicure", "Manicure"],
  },
  {
    title: "Bridal",
    subtitle: "Packages",
    image: "https://images.unsplash.com/photo-1742891602017-40b3a924f476?auto=format&fit=crop&w=1600&q=80",
    items: ["Bridal Makeup", "Saree Draping", "Party Makeup", "Pre-Bridal Care"],
  },
];

const TOTAL = CATS.length;

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="bg-rr-black">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
        </Reveal>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="font-bebas text-[clamp(2.8rem,8vw,7rem)] text-white leading-none">
              WHAT WE <span className="text-rr-red">DO BEST</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-white/45 sm:text-right">
              Scroll through each service — crafted with precision and premium products.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stacked cards — each card = 100vh of scroll */}
      <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {CATS.map((cat, i) => (
            <ServiceCard
              key={cat.title}
              service={cat}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  scrollYProgress,
}: {
  service: Category;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Card 0 starts visible; cards 1–3 slide in from bottom
  const yInput  = index === 0 ? [0, 1]                              : [(index - 1) / TOTAL, index / TOTAL];
  const yOutput = index === 0 ? ["0%", "0%"]                        : ["100%", "0%"];
  const y = useTransform(scrollYProgress, yInput, yOutput);

  // All non-last cards scale down as the next card covers them
  const scInput  = index < TOTAL - 1 ? [index / TOTAL, (index + 1) / TOTAL] : [0, 1];
  const scOutput = index < TOTAL - 1 ? [1, 0.94]                             : [1, 1];
  const scale = useTransform(scrollYProgress, scInput, scOutput);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ y, scale, zIndex: index + 1, transformOrigin: "50% 0" }}
    >
      {/* ── Desktop: split panel ── */}
      <div className="hidden h-full lg:flex">
        {/* Left — content */}
        <div className="relative flex w-[42%] shrink-0 flex-col justify-center bg-rr-black px-14 xl:px-20">
          {/* Watermark number */}
          <div
            aria-hidden
            className="font-bebas pointer-events-none absolute -top-6 left-8 select-none text-[clamp(6rem,12vw,11rem)] leading-none text-white/4"
          >
            {num}
          </div>
          <div className="relative z-10">
            <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-rr-red">
              {num} — {service.subtitle}
            </p>
            <h3 className="font-bebas text-[clamp(3.5rem,7vw,6.5rem)] leading-none text-white">
              {service.title}
            </h3>
            <div className="mt-2 h-px w-12 bg-rr-red" />
            <ul className="mt-8 space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/50">
                  <span className="h-px w-5 shrink-0 bg-rr-red/60" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#booking"
              className="mt-10 inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-7 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(255,255,255,0.12)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <Calendar size={15} /> Book Now
            </a>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Gradient from left (blends with black panel) */}
          <div className="absolute inset-0 bg-linear-to-r from-rr-black via-rr-black/10 to-transparent" />
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-rr-black/60 to-transparent" />
        </div>
      </div>

      {/* ── Mobile: image bg + overlaid content ── */}
      <div className="relative flex h-full flex-col justify-end lg:hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-linear-to-t from-rr-black via-rr-black/50 to-rr-black/10" />
        <div className="relative z-10 px-6 pb-24 pt-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.45em] text-rr-red">
            {num} — {service.subtitle}
          </p>
          <h3 className="font-bebas text-[18vw] leading-none text-white">{service.title}</h3>
          <div className="mt-1 h-px w-10 bg-rr-red" />
          <ul className="mt-5 space-y-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/55">
                <span className="h-px w-4 shrink-0 bg-rr-red/60" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#booking"
            className="mt-7 inline-flex items-center gap-2 border-2 border-rr-red bg-rr-red px-6 py-3 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(255,255,255,0.1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <Calendar size={14} /> Book Now
          </a>
        </div>
      </div>

      {/* Card progress dots */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {CATS.map((_, k) => (
          <div
            key={k}
            className={`rounded-full transition-all duration-300 ${
              k === index ? "h-6 w-1 bg-rr-red" : "h-1.5 w-1 bg-white/20"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
