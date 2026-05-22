import { Reveal, SectionLabel } from "./Reveal";

const G_COLORS = ["#4285F4", "#EA4335", "#34A853", "#FBBC05", "#4285F4"];

const REVIEWS = [
  {
    id: "r1",
    name: "Kasthuri Subramanian",
    rating: 5,
    text: "Had a layer cut done today. I am completely happy with her service and the output. I strongly recommend this place to all my friends and family and will definitely come back here for other services regularly. Thank you Lakshya akka for your patience and service.",
  },
  {
    id: "r2",
    name: "Anitha Suresh",
    rating: 5,
    text: "She treated very well. I took pedicure service — she gave a good massage for my leg and took all cracks on my foot. Affordable and she is giving massive offers now. Such a kind woman!",
  },
  {
    id: "r3",
    name: "Prasanna Yerramsetti",
    rating: 5,
    text: "I am extremely satisfied with the services here! The staff are extremely patient and experienced. They made me feel comfortable. It's a better place for parlour services at affordable prices.",
  },
  {
    id: "r4",
    name: "Maheswari Subramanian",
    rating: 5,
    text: "I had pedicure service done here today. Very good massage was given. Happy and satisfied.",
  },
  {
    id: "r5",
    name: "Ramesh R",
    rating: 5,
    text: "Good atmosphere and professional.",
  },
  {
    id: "r6",
    name: "Nandhini Rajagopal",
    rating: 5,
    text: "Good service.",
  },
];

// Split reviews into two rows for criss-cross effect
const ROW1 = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const ROW2 = [...[...REVIEWS].reverse(), ...[...REVIEWS].reverse(), ...[...REVIEWS].reverse()];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-[#FBBC05]" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, colorIdx }: { review: typeof REVIEWS[0]; colorIdx: number }) {
  return (
    <div className="w-72 shrink-0 border-2 border-rr-ink/8 bg-rr-surface p-5 shadow-[4px_4px_0_rgba(192,0,0,0.18)]">
      {/* Google + stars */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <GoogleLogo />
          <span className="text-[9px] uppercase tracking-[0.3em] text-rr-ink/35">Google Review</span>
        </div>
        <Stars count={review.rating} />
      </div>

      {/* Quote */}
      <p className="font-display text-sm italic leading-relaxed text-rr-ink/65 line-clamp-3">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-2.5 border-t border-rr-ink/8 pt-4">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: G_COLORS[colorIdx % G_COLORS.length] }}
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-bebas text-base leading-none text-rr-ink">{review.name}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[9px] text-rr-ink/35">
            <GoogleLogo /> Posted on Google
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-rr-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-bebas mt-2 text-[clamp(2.5rem,7vw,6rem)] leading-none text-rr-ink">
            LOVED BY WOMEN <span className="text-rr-red">ACROSS CHENNAI</span>
          </h2>
        </Reveal>
      </div>

      {/* Criss-cross marquee */}
      <div className="mt-14 space-y-4 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div
          className="flex w-max gap-4"
          style={{ animation: "rr-marquee 30s linear infinite" }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {ROW1.map((r, i) => <ReviewCard key={`r1-${i}`} review={r} colorIdx={i} />)}
        </div>

        {/* Row 2 — scrolls right (criss-cross) */}
        <div
          className="flex w-max gap-4"
          style={{ animation: "rr-marquee-reverse 26s linear infinite" }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {ROW2.map((r, i) => <ReviewCard key={`r2-${i}`} review={r} colorIdx={i + 2} />)}
        </div>
      </div>
    </section>
  );
}
