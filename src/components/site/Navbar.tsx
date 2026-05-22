import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#home",         label: "Home" },
  { href: "#services",     label: "Services" },
  { href: "#gallery",      label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#offers",       label: "Offers" },
  { href: "#contact",      label: "Contact" },
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`mx-3 flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:mx-6 sm:px-7 ${
            scrolled
              ? "bg-[#080808]/90 shadow-[0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
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
                className="group relative text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rr-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden rounded-full bg-rr-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(192,0,0,0.8)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_-8px_rgba(192,0,0,1)] sm:inline-block"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2 text-white/70 transition hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-20 z-40 rounded-2xl border border-white/[0.07] bg-[#0e0e0e]/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-rr-red px-5 py-3 text-center text-sm font-semibold text-white"
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
