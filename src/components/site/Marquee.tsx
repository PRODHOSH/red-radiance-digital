const SERVICES = [
  "Hair Coloring",
  "Bridal Makeup",
  "Facial",
  "Hair Spa",
  "Saree Draping",
  "Waxing",
  "Threading",
  "Pedicure",
  "Party Makeup",
  "Manicure",
  "Cleanup",
  "Detan",
];

const SEP = (
  <span className="text-rr-red" aria-hidden>
    ✦
  </span>
);

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {SERVICES.map((s) => (
        <span key={s} className="flex items-center gap-8">
          <span className="font-bebas text-2xl tracking-widest text-rr-cream sm:text-3xl">
            {s}
          </span>
          {SEP}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-rr-ink py-4 sm:py-5">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-rr-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-rr-ink to-transparent" />

      <div
        className="flex w-max"
        style={{
          animation: "rr-marquee 28s linear infinite",
        }}
      >
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
}
