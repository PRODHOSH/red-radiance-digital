import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#offers", label: "Offers" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:px-7 ${
          scrolled
            ? "glass shadow-[0_8px_30px_rgba(192,0,0,0.08)] mx-3 sm:mx-6"
            : "bg-transparent mx-3 sm:mx-6"
        }`}
      >
        <a href="#home" className="shrink-0">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-rr-ink/80 transition-colors hover:text-rr-red"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-rr-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#booking"
            className="hidden rounded-full bg-rr-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(192,0,0,0.7)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_-8px_rgba(192,0,0,0.9)] sm:inline-block"
          >
            Book Now
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-rr-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-3 mt-2 rounded-2xl glass p-4 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-rr-ink hover:bg-white/60"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-rr-red px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
