import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-rr-ink">
              VISIT OUR <span className="text-rr-red">STUDIO</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-6 rounded-2xl bg-rr-surface p-8" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)" }}>
              <Info icon={MapPin} title="Address">
                No.12/1, Senthur St, SRVS Colony,<br />
                Arul Murugan Nagar Extension,<br />
                Keelkattalai, Chennai, Tamil Nadu 600117
              </Info>
              <Info icon={Clock} title="Hours">Open until 9 PM · 7 days a week</Info>
              <Info icon={Phone} title="Phone">+91 95978 14476</Info>
              <div className="flex gap-3 pt-2">
                <a href="tel:+919597814476" className={pillBtn}><Phone size={14} /> Call</a>
                <a href="https://wa.me/919597814476" target="_blank" rel="noreferrer" className={pillBtn}><MessageCircle size={14} /> WhatsApp</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)" }}>
              <iframe
                title="Red Radiance location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2641161300617!2d80.189493!3d12.954944000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d1dee127e81%3A0xdb68fe9dcc2618ed!2sRed%20Radiance!5e0!3m2!1sen!2sin!4v1779456726107!5m2!1sen!2sin"
                width="100%"
                height="460"
                style={{ border: 0 }}
                allowFullScreen
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

const pillBtn = "inline-flex items-center gap-1.5 rounded-full bg-rr-red px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110";

function Info({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rr-red/8 text-rr-red"><Icon size={17} /></div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-rr-ink/40">{title}</div>
        <div className="mt-1 text-sm leading-relaxed text-rr-ink/70">{children}</div>
      </div>
    </div>
  );
}
