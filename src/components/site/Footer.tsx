import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const SERVICES = [
  "Stylish Haircut", "Hair Coloring", "Hair Spa",
  "Facial & Cleanup", "Waxing & Threading",
  "Pedicure & Manicure", "Bridal Makeup", "Party Makeup",
];

const NAV = ["Home", "Services", "Testimonials", "Offers", "Booking", "Contact"];

export function Footer() {
  return (
    <footer className="bg-rr-ink text-white">

      {/* ── Top CTA strip ── */}
      <div className="border-b border-white/6 px-6 py-14 text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-rr-red">Ready to glow?</p>
        <h2 className="font-bebas mt-3 text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
          BOOK YOUR APPOINTMENT TODAY
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
          Walk in or reserve your slot — our team will confirm within minutes during business hours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#booking"
            className="border-2 border-rr-red bg-rr-red px-8 py-3.5 text-sm font-semibold text-white shadow-[5px_5px_0_rgba(255,255,255,0.1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Book Appointment
          </a>
          <a
            href="https://wa.me/919597814476"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-150 hover:border-rr-red hover:text-white"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">

        {/* Brand col */}
        <div className="lg:col-span-2">
          <Logo dark />
          <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-rr-red">Est. 2011</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            Premium ladies salon in Keelkattalai, Chennai. Where beauty meets personal care — since 2011.
          </p>

          {/* Address */}
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.35em] text-rr-red">
              <MapPin size={10} /> Address
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              No.12/1, Senthur St, SRVS Colony,<br />
              Arul Murugan Nagar Extension,<br />
              Keelkattalai, Chennai – 600117
            </p>
          </div>

          {/* Contact */}
          <div className="mt-5 space-y-2.5">
            <a href="tel:+919597814476" className="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white">
              <Phone size={13} className="text-rr-red shrink-0" />
              +91 95978 14476
            </a>
            <a href="https://wa.me/919597814476" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white">
              <MessageCircle size={13} className="text-rr-red shrink-0" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Navigation</div>
          <ul className="space-y-2.5 text-sm text-white/45">
            {NAV.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="inline-block transition-all hover:translate-x-1 hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Services</div>
          <ul className="space-y-2.5 text-sm text-white/45">
            {SERVICES.map((s) => (
              <li key={s} className="transition-colors hover:text-white/70">{s}</li>
            ))}
          </ul>
        </div>

        {/* Hours + Legal */}
        <div>
          <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Hours</div>
          <ul className="space-y-2.5 text-sm text-white/45">
            <li>Monday – Sunday</li>
            <li>10:00 AM – 9:00 PM</li>
            <li className="pt-1 text-[11px] text-white/25">Open until 9 PM today</li>
          </ul>

          <div className="mt-8">
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-rr-red">Legal</div>
            <ul className="space-y-2.5 text-sm text-white/45">
              <li><a href="/terms" className="transition-colors hover:text-white">Terms & Conditions</a></li>
              <li><a href="/privacy" className="transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="/sitemap.xml" className="transition-colors hover:text-white">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/25 sm:flex-row">
          <div>© {new Date().getFullYear()} Red Radiance – Ladies Salon. All rights reserved.</div>
          <div>
            Designed & Developed by{" "}
            <span className="text-white/50 transition-colors hover:text-rr-red">
              Prodhosh V.S
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
