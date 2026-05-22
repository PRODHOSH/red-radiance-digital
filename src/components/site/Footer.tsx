import { Instagram, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-rr-ink text-white">
      <div className="border-t border-white/6">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm text-white/40">
              Premium ladies salon in Keelkattalai, Chennai. Where beauty meets personal care.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="tel:+919597814476"        className={ico}><Phone       size={15} /></a>
              <a href="https://wa.me/919597814476" className={ico}><MessageCircle size={15} /></a>
              <a href="https://instagram.com"    className={ico}><Instagram   size={15} /></a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-white/45">
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
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Hours</div>
            <ul className="space-y-2.5 text-sm text-white/45">
              <li>Mon – Sun</li>
              <li>10:00 AM – 9:00 PM</li>
              <li className="pt-2 text-white/25">Open until 9 PM today</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/25 sm:flex-row">
            <div>© {new Date().getFullYear()} Red Radiance – Ladies Salon. All rights reserved.</div>
            <div>Crafted with care in Chennai.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const ico =
  "flex h-9 w-9 items-center justify-center border border-white/10 text-white/50 shadow-[3px_3px_0_rgba(192,0,0,0.3)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:border-rr-red hover:bg-rr-red hover:text-white hover:shadow-none";
