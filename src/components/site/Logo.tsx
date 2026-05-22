type Props = { className?: string; mark?: boolean; dark?: boolean };

export function Logo({ className = "", mark = false, dark = false }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Circular crop — zoomed to the RR centre of the logo */}
      <div
        className={`h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 ${
          dark ? "border-white/20 bg-white" : "border-rr-red/25"
        }`}
      >
        <img
          src="/images/logo.png"
          alt="Red Radiance"
          className="h-full w-full object-cover"
          style={{
            transform: "scale(1.4)",
            transformOrigin: "50% 54%",   /* 54% y centres on the RR letters */
            mixBlendMode: dark ? "normal" : "darken",
          }}
        />
      </div>

      {!mark && (
        <div className="leading-tight">
          <div
            className={`font-display text-lg font-semibold tracking-wide ${
              dark ? "text-white" : "text-rr-ink"
            }`}
          >
            Red Radiance
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-rr-red">
            Ladies Salon
          </div>
        </div>
      )}
    </div>
  );
}
