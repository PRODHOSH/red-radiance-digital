import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

function Careers() {
  return (
    <div className="bg-rr-cream">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-40">

        {/* Label */}
        <p className="text-[10px] uppercase tracking-[0.5em] text-rr-red">We're hiring</p>

        {/* Page heading */}
        <h1 className="font-bebas mt-3 text-[clamp(3.5rem,10vw,7rem)] leading-none text-rr-ink">
          JOIN OUR<br /><span className="text-rr-red">TEAM</span>
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-rr-ink/50 max-w-md">
          We're looking for a passionate beauty professional to join our growing family at Red Radiance, Keelkattalai.
        </p>

        {/* Divider */}
        <div className="my-10 h-px bg-rr-ink/10" />

        {/* Open position */}
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="font-bebas text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-rr-ink">
              Hair & Beauty Stylist
            </h2>
            <span className="rounded-full border border-rr-red/30 px-3 py-1 text-[10px] uppercase tracking-widest text-rr-red">
              Full-Time
            </span>
          </div>

          <p className="mt-1 text-[11px] uppercase tracking-widest text-rr-ink/35">
            Keelkattalai, Chennai · 1+ year experience
          </p>

          <p className="mt-5 text-sm leading-relaxed text-rr-ink/55">
            We need someone who takes pride in their craft — skilled with scissors, colour, and care. You'll work one-on-one with clients in a clean, calm environment where your expertise truly shines.
          </p>

          {/* What you'll do */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-rr-ink/40 mb-4">What you'll do</p>
            <ul className="space-y-3">
              {[
                "Haircuts, styling, and advanced treatments",
                "Hair colouring — highlights, global colour, toning",
                "Facials, cleanup, waxing, and threading",
                "Bridal and party makeup for special occasions",
                "Build long-term relationships with clients",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-rr-ink/60">
                  <span className="mt-2 h-px w-5 shrink-0 bg-rr-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What we offer */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-rr-ink/40 mb-4">What we offer</p>
            <ul className="space-y-3">
              {[
                "Competitive salary + monthly performance incentives",
                "Regular training on the latest trends and techniques",
                "Supportive, women-first workplace",
                "Fixed hours: 10 AM – 9 PM with rotational week-off",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-rr-ink/60">
                  <span className="mt-2 h-px w-5 shrink-0 bg-rr-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-rr-ink/10" />

        {/* Apply */}
        <div>
          <p className="text-sm font-medium text-rr-ink mb-5">Ready to apply? Reach out directly —</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/919597814476?text=Hi%2C%20I%27m%20interested%20in%20the%20Hair%20%26%20Beauty%20Stylist%20role%20at%20Red%20Radiance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rr-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rr-red/25 transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              Apply on WhatsApp
            </a>
            <a
              href="mailto:website.redradiance@gmail.com?subject=Application%20–%20Hair%20%26%20Beauty%20Stylist"
              className="inline-flex items-center gap-2 rounded-full border-2 border-rr-red/25 px-7 py-3.5 text-sm font-semibold text-rr-red transition-all duration-200 hover:border-rr-red hover:bg-rr-red/5 active:scale-95"
            >
              Send Resume
            </a>
          </div>
          <p className="mt-5 text-xs text-rr-ink/30">
            Freshers with strong portfolios are also welcome to apply.
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
