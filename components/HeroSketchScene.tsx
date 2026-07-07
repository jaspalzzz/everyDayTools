/**
 * Hand-drawn line-art scene used as a decorative background layer on dark
 * hero/featured banners (news, guides). Pure single-weight strokes in a
 * light tone at low opacity so it reads as an etched sketch behind white
 * heading text, echoing the site's colored sketch-illustration language
 * (see components/home/GuidesResources.tsx) without competing with it.
 */
export function HeroSketchScene({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 900 300"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Payslip / document, tilted slightly like a hand-drawn sketch */}
        <g transform="translate(560 40) rotate(-4)">
          <path d="M4 2 H132 L156 26 V214 Q156 220 150 220 H10 Q4 220 4 214 V8 Q4 2 10 2 Z" />
          <path d="M132 2 V26 H156" />
          <line x1="24" y1="52" x2="132" y2="52" strokeWidth="2.2" />
          <line x1="24" y1="70" x2="104" y2="70" />
          <line x1="24" y1="94" x2="70" y2="94" opacity="0.85" />
          <line x1="96" y1="94" x2="132" y2="94" opacity="0.85" />
          <line x1="24" y1="112" x2="64" y2="112" opacity="0.85" />
          <line x1="96" y1="112" x2="132" y2="112" opacity="0.85" />
          <line x1="24" y1="130" x2="76" y2="130" opacity="0.85" />
          <line x1="96" y1="130" x2="132" y2="130" opacity="0.85" />
          <path d="M18 152 H142" strokeDasharray="3 5" opacity="0.7" />
          <line x1="24" y1="172" x2="68" y2="172" strokeWidth="2.2" />
          <rect x="94" y="164" width="38" height="16" rx="3" strokeWidth="1.4" />
        </g>

        {/* Coin stack with pound sign */}
        <g transform="translate(760 190)">
          <circle cx="0" cy="0" r="46" />
          <circle cx="0" cy="0" r="32" opacity="0.85" />
          <path
            d="M-9 -12 h16 M-11 -1 h20 M-6 -12 v22 c0 6 6 8 10 4"
            strokeWidth="2.2"
          />
          <circle cx="-70" cy="24" r="20" opacity="0.7" />
          <circle cx="52" cy="-52" r="14" opacity="0.6" />
        </g>

        {/* Calculator, simple hand-drawn outline */}
        <g transform="translate(340 120) rotate(3)">
          <rect x="0" y="0" width="92" height="128" rx="10" />
          <rect x="14" y="16" width="64" height="26" rx="4" opacity="0.85" />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={26 + col * 21}
                cy={66 + row * 16}
                r="5.5"
                opacity="0.7"
              />
            )),
          )}
        </g>

        {/* Loose connecting flourish — the "checking your rights" line */}
        <path
          d="M120 250 C 220 210, 260 150, 330 150"
          opacity="0.45"
          strokeDasharray="1 8"
          strokeWidth="2.2"
        />

        {/* Small checkmark badge, top-left of the scene */}
        <g transform="translate(150 60)" opacity="0.7">
          <circle cx="0" cy="0" r="22" />
          <path d="M-9 1 L-2 9 L11 -8" strokeWidth="2.4" />
        </g>
      </g>
    </svg>
  );
}
