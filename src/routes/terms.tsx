import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  component: Terms,
});

function Terms() {
  return (
    <div className="bg-rr-cream">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <p className="text-[10px] uppercase tracking-[0.45em] text-rr-red">Legal</p>
        <h1 className="font-bebas mt-2 text-[clamp(2.5rem,6vw,5rem)] leading-none text-rr-ink">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-rr-ink/45">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-rr-ink/70">

          <Section title="1. About Us">
            Red Radiance Ladies Beauty Salon ("we", "us", "our") is a premium beauty salon located at
            No.12/1, Senthur St, SRVS Colony, Arul Murugan Nagar Extension, Keelkattalai,
            Chennai – 600117, Tamil Nadu, India. By using our website or booking our services,
            you agree to these Terms & Conditions.
          </Section>

          <Section title="2. Appointments & Booking">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Appointments can be booked through our website, WhatsApp, or by calling us directly.</li>
              <li>Bookings are confirmed only after receiving acknowledgement from our team.</li>
              <li>We reserve the right to reschedule or cancel appointments due to unforeseen circumstances, with prior notice wherever possible.</li>
              <li>Please arrive at least 5 minutes before your scheduled appointment time.</li>
            </ul>
          </Section>

          <Section title="3. Cancellation Policy">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Cancellations must be communicated at least 2 hours before your appointment.</li>
              <li>Repeated no-shows may result in requiring advance payment for future bookings.</li>
              <li>We understand emergencies happen — please contact us as early as possible to reschedule.</li>
            </ul>
          </Section>

          <Section title="4. Pricing & Payment">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>All prices are in Indian Rupees (INR) and are subject to change without prior notice.</li>
              <li>Combo offers and seasonal discounts must be mentioned at the time of booking to be applied.</li>
              <li>Payment is accepted via cash and UPI at the salon.</li>
              <li>Prices displayed on the website are indicative; final pricing may vary based on hair length, service complexity, or product usage.</li>
            </ul>
          </Section>

          <Section title="5. Services & Results">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Results from beauty services vary between individuals based on hair type, skin condition, and other personal factors.</li>
              <li>We use professionally approved products, but we recommend informing us of any allergies or sensitivities before the service.</li>
              <li>A patch test may be performed before certain chemical treatments. We are not liable for reactions arising from undisclosed allergies.</li>
              <li>We do not guarantee specific outcomes but commit to delivering our best professional service every time.</li>
            </ul>
          </Section>

          <Section title="6. Health & Safety">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>All tools and equipment are sanitised between clients.</li>
              <li>Please inform us if you are pregnant, have a skin condition, or are on medication that may affect treatment.</li>
              <li>We reserve the right to decline service if we believe it may be unsafe for the client.</li>
            </ul>
          </Section>

          <Section title="7. Photography">
            <p>
              We may photograph completed looks for our portfolio and social media with your consent. You have the right to decline photography. By agreeing to being photographed, you grant Red Radiance the right to use the image for promotional purposes.
            </p>
          </Section>

          <Section title="8. Liability">
            <p>
              Red Radiance Ladies Beauty Salon is not liable for loss, damage, or theft of personal belongings brought onto the premises. Our maximum liability for any claim arising from a service is limited to the amount paid for that service.
            </p>
          </Section>

          <Section title="9. Website Use">
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>This website is for informational and booking purposes only.</li>
              <li>We make reasonable efforts to ensure accuracy of information but do not guarantee it is error-free.</li>
              <li>Unauthorised use of this website may give rise to a claim for damages.</li>
            </ul>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              For any queries regarding these terms, please contact us:
            </p>
            <div className="mt-3 space-y-1 text-rr-ink/60">
              <p>Red Radiance Ladies Beauty Salon</p>
              <p>No.12/1, Senthur St, Keelkattalai, Chennai – 600117</p>
              <p>Phone: <a href="tel:+919597814476" className="text-rr-red hover:underline">+91 95978 14476</a></p>
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
