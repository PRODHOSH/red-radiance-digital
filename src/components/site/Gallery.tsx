import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

type Item = { src: string; cat: string; h: string };

const ITEMS: Item[] = [
  { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80", cat: "Salon Interior",            h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=900&q=80", cat: "Hair Styling",              h: "" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", cat: "Facials",                   h: "" },
  { src: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80", cat: "Bridal Looks",              h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=900&q=80", cat: "Hair Styling",              h: "" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80", cat: "Customer Transformations",  h: "" },
  { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80", cat: "Salon Interior",            h: "" },
  { src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=900&q=80", cat: "Facials",                   h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1595872018818-97555653a011?auto=format&fit=crop&w=900&q=80", cat: "Bridal Looks",              h: "" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80", cat: "Customer Transformations",  h: "" },
];

const TABS = ["All", "Salon Interior", "Hair Styling", "Facials", "Bridal Looks", "Customer Transformations"];

export function Gallery() {
  const [tab, setTab]       = useState("All");
  const [active, setActive] = useState<Item | null>(null);
  const filtered = tab === "All" ? ITEMS : ITEMS.filter((i) => i.cat === tab);

  return (
    <section id="gallery" className="relative bg-rr-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-white">
              MOMENTS OF <span className="text-rr-red">RADIANCE</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                    tab === t
                      ? "border-rr-red bg-rr-red text-white"
                      : "border-white/10 text-white/45 hover:border-rr-red/50 hover:text-white/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filtered.map((it, i) => (
              <motion.button
                layout
                key={it.src}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setActive(it)}
                className={`group relative overflow-hidden rounded-xl ${it.h}`}
              >
                <img
                  src={it.src}
                  alt={it.cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Red accent line on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-rr-red transition-transform duration-300 group-hover:scale-x-100" />
                <div className="absolute bottom-3 left-3 translate-y-2 text-[10px] font-medium uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {it.cat}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-80 flex items-center justify-center bg-black/95 p-6 backdrop-blur-sm"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/15"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={active.src}
              alt={active.cat}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
