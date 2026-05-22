import { Phone, MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative bg-rr-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/25 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-white">
              VISIT OUR <span className="text-rr-red">STUDIO</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-6 border-2 border-white/8 bg-rr-surface p-8 shadow-[6px_6px_0_rgba(192,0,0,0.35)]">
              <Info icon={MapPin} title="Address">
                No.12/1, Senthur St, SRVS Colony,
                <br />
                Arul Murugan Nagar Extension,
                <br />
                Keelkattalai, Chennai, Tamil Nadu 600117
              </Info>
              <Info icon={Clock} title="Hours">
                Open until 9 PM · 7 days a week
              </Info>
              <Info icon={Phone} title="Phone">
                +91 99999 99999
              </Info>

              <div className="flex gap-3 pt-2">
                <a href="tel:+919999999999" className={pillBtn}>
                  <Phone size={14} /> Call
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className={pillBtn}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className={pillBtn}>
                  <Instagram size={14} /> Instagram
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="overflow-hidden border-2 border-white/8 shadow-[6px_6px_0_rgba(192,0,0,0.35)]">
              <iframe
                title="Red Radiance location"
                src="https://www.google.com/maps?q=Keelkattalai,+Chennai,+Tamil+Nadu+600117&output=embed"
                width="100%"
                height="460"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const pillBtn =
  "inline-flex items-center gap-1.5 border-2 border-rr-red bg-rr-red px-3.5 py-2.5 text-xs font-semibold text-white shadow-[3px_3px_0_rgba(255,255,255,0.12)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none";

function Info({
  icon: Icon, title, children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-rr-red/30 bg-rr-red/10 text-rr-red">
        <Icon size={17} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/30">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/65">{children}</div>
      </div>
    </div>
  );
}
