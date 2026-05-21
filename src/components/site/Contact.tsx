import { Phone, MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-rr-ink sm:text-5xl md:text-6xl">
              Visit our <span className="text-rr-red">studio.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-6 rounded-3xl border border-rr-red/10 bg-rr-cream/60 p-8">
              <Info icon={MapPin} title="Address">
                No.12/1, Senthur St, SRVS Colony,
                <br />
                Arul Murugan Nagar Extension,
                <br />
                Keelkattalai, Chennai, Tamil Nadu 600117
              </Info>
              <Info icon={Clock} title="Hours">
                Open until 9 PM · 7 days
              </Info>
              <Info icon={Phone} title="Phone">
                +91 99999 99999
              </Info>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <a href="tel:+919999999999" className={pillBtn}>
                  <Phone size={16} /> Call
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className={pillBtn}
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={pillBtn}
                >
                  <Instagram size={16} /> Instagram
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-rr-red/10 shadow-xl">
              <iframe
                title="Red Radiance location"
                src="https://www.google.com/maps?q=Keelkattalai,+Chennai,+Tamil+Nadu+600117&output=embed"
                width="100%"
                height="460"
                style={{ border: 0 }}
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
  "inline-flex items-center justify-center gap-2 rounded-full bg-rr-red px-3 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.03]";

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rr-red/10 text-rr-red">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-rr-ink/50">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-rr-ink/85">{children}</div>
      </div>
    </div>
  );
}
