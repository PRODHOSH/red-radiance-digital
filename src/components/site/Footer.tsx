import { Instagram, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-rr-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="[&_*]:!text-white">
            <Logo />
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/65">
            Premium ladies salon in Keelkattalai, Chennai. Where beauty meets personal care.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="tel:+919999999999" className={ico}><Phone size={16} /></a>
            <a href="https://wa.me/919999999999" className={ico}><MessageCircle size={16} /></a>
            <a href="https://instagram.com" className={ico}><Instagram size={16} /></a>
          </div>
        </div>
        <div>
          <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff8a8a]">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/75">
            {["Home", "Services", "Gallery", "Testimonials", "Offers", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="transition hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff8a8a]">Hours</div>
          <ul className="space-y-2 text-sm text-white/75">
            <li>Mon – Sun</li>
            <li>10:00 AM – 9:00 PM</li>
            <li className="pt-3 text-white/55">Open until 9 PM today</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <div>© {new Date().getFullYear()} Red Radiance – Ladies Salon. All rights reserved.</div>
          <div>Crafted with care in Chennai.</div>
        </div>
      </div>
    </footer>
  );
}

const ico =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-rr-red hover:bg-rr-red hover:text-white";
