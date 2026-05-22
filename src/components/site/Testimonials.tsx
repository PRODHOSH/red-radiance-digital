import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack"
import { SectionLabel } from "./Reveal"

const REVIEWS = [
  {
    id: "r1",
    name: "Shankari S.",
    label: "Regular Client",
    rating: 5,
    text: "Wonderful service! I went for a facial and haircut, and the experience was truly professional. I've never had such a detailed and relaxing facial at such an affordable price.",
  },
  {
    id: "r2",
    name: "Chandra N.",
    label: "Happy Client",
    rating: 5,
    text: "Had a very relaxing facial and smooth waxing service. Clean, professional, and friendly experience. Highly recommended!",
  },
  {
    id: "r3",
    name: "Prasanna Y.",
    label: "Loyal Customer",
    rating: 5,
    text: "I am extremely satisfied with the services here. The staff are patient and experienced. They made me feel comfortable throughout.",
  },
  {
    id: "r4",
    name: "Maheswari S.",
    label: "Regular Client",
    rating: 5,
    text: "I had pedicure service done here today. Very good massage was given. Happy and satisfied with the overall experience.",
  },
  {
    id: "r5",
    name: "Nandhini R.",
    label: "Client",
    rating: 5,
    text: "Good service and a wonderful atmosphere. The staff were attentive and the salon is very clean and welcoming.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-rr-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rr-red/25 to-transparent" />

      {/* h-[200vh]: sticky covers 100vh, the extra 100vh drives the card animation */}
      <ContainerScroll className="h-200">
        <div className="sticky top-0 flex h-svh w-full flex-col items-center justify-center gap-8 px-6 py-12">
          {/* Header — always visible inside the sticky viewport */}
          <div className="text-center">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-bebas mt-2 text-[clamp(2rem,6vw,5rem)] leading-none text-white">
              LOVED BY WOMEN <span className="text-rr-red">ACROSS CHENNAI</span>
            </h2>
          </div>

          {/* Stacked cards */}
          <CardsContainer className="h-105 w-85 sm:w-95">
            {REVIEWS.map((review, index) => (
              <CardTransformed
                key={review.id}
                arrayLength={REVIEWS.length}
                index={index + 1}
                variant="dark"
                className="border-white/8 bg-rr-surface backdrop-blur-sm"
              >
                <ReviewStars rating={review.rating} className="text-rr-red" />

                <div className="flex flex-col items-center gap-3 text-center">
                  <svg className="h-5 w-5 text-rr-red/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="font-display text-base italic leading-relaxed text-white/70 sm:text-lg">
                    "{review.text}"
                  </blockquote>
                </div>

                <div className="flex flex-col items-center gap-1 border-t border-white/6 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rr-red/15 text-sm font-semibold text-rr-red">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="font-bebas text-xl tracking-wide text-white">
                    {review.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                    {review.label}
                  </span>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}
