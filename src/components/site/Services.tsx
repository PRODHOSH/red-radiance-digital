import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";

type Category = {
  title: string;
  image: string;
  items: string[];
};

const CATS: Category[] = [
  {
    title: "Hair Services",
    image:
      "https://images.unsplash.com/photo-1560869713-da86a9ec0744?auto=format&fit=crop&w=1200&q=80",
    items: ["Stylish Haircut", "Hair Coloring", "Hair Spa", "Hair Treatments"],
  },
  {
    title: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    items: ["Facial", "Cleanup", "Detan"],
  },
  {
    title: "Beauty Services",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    items: ["Waxing", "Threading", "Pedicure", "Manicure"],
  },
  {
    title: "Bridal Services",
    image:
      "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?auto=format&fit=crop&w=1200&q=80",
    items: ["Bridal Makeup", "Saree Draping", "Party Makeup"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>Services</SectionLabel>
              <h2 className="font-display text-4xl leading-tight text-rr-ink sm:text-5xl md:text-6xl">
                Crafted treatments,
                <br />
                <span className="text-rr-red">tailored just for you.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-rr-ink/60">
              From everyday grooming to bridal couture, every service is delivered with
              precision and premium products.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-[460px] overflow-hidden rounded-3xl bg-rr-ink shadow-xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rr-ink/95 via-rr-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[#ff8a8a]">
                    {String(i + 1).padStart(2, "0")} — Category
                  </div>
                  <h3 className="font-display text-2xl">{c.title}</h3>
                  <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-60 group-hover:opacity-100">
                    <ul className="space-y-1.5 border-t border-white/20 pt-4 text-sm text-white/85">
                      {c.items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-[#ff8a8a]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute right-5 top-5 rounded-full bg-rr-red px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
