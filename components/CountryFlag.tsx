function FlagUK({ size = 16 }: { size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    <svg width={size} height={h} viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0 rounded-sm">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

function FlagUS({ size = 16 }: { size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    <svg width={size} height={h} viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0 rounded-sm">
      <rect width="60" height="40" fill="#B22234" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} y={i * 6 + 3} width="60" height="3" fill="#fff" />
      ))}
      <rect width="24" height="21" fill="#3C3B6E" />
    </svg>
  );
}

function FlagCA({ size = 16 }: { size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    <svg width={size} height={h} viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0 rounded-sm">
      <rect width="60" height="40" fill="#fff" />
      <rect width="15" height="40" fill="#D80621" />
      <rect x="45" width="15" height="40" fill="#D80621" />
      <path d="M30,8 L33,16 H41 L35,21 L37,29 L30,24 L23,29 L25,21 L19,16 H27 Z" fill="#D80621" />
    </svg>
  );
}

function FlagAU({ size = 16 }: { size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    <svg width={size} height={h} viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0 rounded-sm">
      <rect width="60" height="40" fill="#00008B" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="5" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="3" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="8" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="5" />
    </svg>
  );
}

export function CountryFlag({ country, size = 16 }: { country: string; size?: number }) {
  switch (country) {
    case "UK": return <FlagUK size={size} />;
    case "US": return <FlagUS size={size} />;
    case "CA": return <FlagCA size={size} />;
    case "AU": return <FlagAU size={size} />;
    case "UK/US": return <><FlagUK size={size} /><FlagUS size={size} /></>;
    default: return null;
  }
}
