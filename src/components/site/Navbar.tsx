import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/",              label: "Home" },
  { href: "/#services",     label: "Services" },
  { href: "/#gallery",      label: "Gallery" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#offers",       label: "Offers" },
  { href: "/#contact",      label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      >
        <div
          className={`mx-3 flex items-center justify-between px-5 py-2.5 transition-all duration-500 sm:mx-6 sm:px-7 ${
            scrolled
              ? "border border-rr-ink/10 bg-rr-cream/95 shadow-[4px_4px_0_rgba(192,0,0,0.2)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a href="#home" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-rr-ink/60 transition-colors duration-200 hover:text-rr-ink"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rr-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/#booking"
              className="hidden border-2 border-rr-red bg-rr-red px-5 py-2.5 text-sm font-semibold text-white shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none sm:inline-block"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="border border-rr-ink/15 p-2 text-rr-ink/60 transition hover:border-rr-red hover:text-rr-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 border-2 border-rr-ink/10 bg-rr-cream p-4 shadow-[6px_6px_0_rgba(192,0,0,0.3)] lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border border-transparent px-4 py-3 text-sm font-medium text-rr-ink/60 transition hover:border-rr-ink/8 hover:text-rr-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#booking"
                onClick={() => setOpen(false)}
                className="mt-2 border-2 border-rr-red bg-rr-red px-5 py-3 text-center text-sm font-semibold text-white shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
