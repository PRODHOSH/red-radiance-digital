type Props = { className?: string; mark?: boolean };

export function Logo({ className = "", mark = false }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="rrgrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e11d1d" />
            <stop offset="1" stopColor="#8a0000" />
          </linearGradient>
        </defs>
        <path
          d="M8 22 L18 34 L24 16 L32 32 L40 16 L46 34 L56 22 L52 46 L12 46 Z"
          fill="url(#rrgrad)"
        />
        <circle cx="8"  cy="22" r="2.5" fill="#c00000" />
        <circle cx="56" cy="22" r="2.5" fill="#c00000" />
        <circle cx="32" cy="10" r="2.5" fill="#c00000" />
        <rect x="14" y="50" width="36" height="3" rx="1.5" fill="#c00000" />
      </svg>
      {!mark && (
        <div className="leading-tight">
          <div className="font-display text-lg font-semibold tracking-wide text-white">
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
