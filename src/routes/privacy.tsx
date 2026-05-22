import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <div className="bg-rr-cream">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <p className="text-[10px] uppercase tracking-[0.45em] text-rr-red">Legal</p>
        <h1 className="font-bebas mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-rr-ink">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-rr-ink/45">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-rr-ink/70">

          <Section title="1. Introduction">
            Red Radiance Ladies Beauty Salon ("we", "us", "our") respects your privacy and is committed to
            protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard
            your information when you visit our website or book our services.
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following information when you use our website or booking form:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><strong className="text-rr-ink/80">Personal details</strong> — Name and phone number provided during booking</li>
              <li><strong className="text-rr-ink/80">Appointment details</strong> — Service selected, preferred date and time</li>
              <li><strong className="text-rr-ink/80">Usage data</strong> — Browser type, pages visited, time spent on site (via analytics, if enabled)</li>
            </ul>
            <p className="mt-3">We do not collect payment card information on our website. Payments are handled in person at the salon.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>To confirm and manage your appointment</li>
              <li>To contact you regarding your booking or upcoming appointments</li>
              <li>To send you promotional offers or seasonal updates (only with your consent)</li>
              <li>To improve our website and services based on usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. Data Storage">
            <p>
              Appointment information submitted through our booking form is stored in Google Sheets via
              Google Forms. By submitting the form, you consent to your data being processed and stored
              by Google LLC, subject to Google's Privacy Policy.
            </p>
            <p className="mt-2">
              We retain your personal data only for as long as necessary to fulfil the purposes described
              in this policy, or as required by law.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>Our website uses the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><strong className="text-rr-ink/80">Google Maps</strong> — to display our salon location. Subject to Google's Privacy Policy.</li>
              <li><strong className="text-rr-ink/80">Google Forms / Sheets</strong> — to receive and store booking requests.</li>
              <li><strong className="text-rr-ink/80">WhatsApp</strong> — for direct communication when you choose to contact us via WhatsApp.</li>
              <li><strong className="text-rr-ink/80">Cloudflare</strong> — for website hosting, security, and performance. Cloudflare may process technical data per their Privacy Policy.</li>
            </ul>
          </Section>

          <Section title="6. Cookies">
            <p>
              Our website may use essential cookies to ensure basic functionality. We do not use tracking
              or advertising cookies. You can control cookie settings through your browser preferences.
            </p>
          </Section>

          <Section title="7. Data Sharing">
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              information only in the following circumstances:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>With service providers who assist in operating our website (e.g., Cloudflare)</li>
              <li>When required by law or legal process</li>
              <li>To protect the rights and safety of our clients or staff</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for promotional communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at the details below.</p>
          </Section>

          <Section title="9. Data Security">
            <p>
              We take reasonable technical and organisational measures to protect your personal data.
              However, no internet transmission is completely secure. We encourage you to contact us via
              phone or WhatsApp for sensitive matters.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              Our website is not directed to children under 13. We do not knowingly collect personal
              data from children. If you believe we have inadvertently collected such data, please contact
              us immediately.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. Changes will be reflected on this page
              with an updated date. We encourage you to review this policy regularly.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>For any privacy-related queries or requests:</p>
            <div className="mt-3 space-y-1 text-rr-ink/60">
              <p>Red Radiance Ladies Beauty Salon</p>
              <p>No.12/1, Senthur St, Keelkattalai, Chennai – 600117</p>
              <p>Phone: <a href="tel:+919597814476" className="text-rr-red hover:underline">+91 95978 14476</a></p>
              <p>WhatsApp: <a href="https://wa.me/919597814476" className="text-rr-red hover:underline">+91 95978 14476</a></p>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bebas text-2xl text-rr-ink">{title}</h2>
      <div className="mt-2 h-px w-10 bg-rr-red" />
      <div className="mt-3">{children}</div>
    </div>
  );
}
