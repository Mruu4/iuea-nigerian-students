function CoatOfArms({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 130"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wreath base */}
      <ellipse cx="60" cy="118" rx="30" ry="6" fill="#0B6E4F" opacity="0.8" />

      {/* Left horse supporter */}
      <ellipse cx="18" cy="80" rx="9" ry="22" fill="#F5F1E8" stroke="#12201A" strokeWidth="1" />
      {/* Right horse supporter */}
      <ellipse cx="102" cy="80" rx="9" ry="22" fill="#F5F1E8" stroke="#12201A" strokeWidth="1" />

      {/* Black shield */}
      <path
        d="M32 30 H88 V70 C88 92 60 108 60 108 C60 108 32 92 32 70 Z"
        fill="#12201A"
      />
      {/* White Y-shaped band (River Niger confluence) */}
      <path
        d="M60 40 L60 65 M60 65 L44 90 M60 65 L76 90"
        stroke="#F5F1E8"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Red eagle crest on top of shield */}
      <path
        d="M60 6 C50 10 42 16 38 24 C46 20 53 18 60 18 C67 18 74 20 82 24 C78 16 70 10 60 6 Z"
        fill="#C1272D"
      />
      <circle cx="60" cy="14" r="3" fill="#12201A" />
    </svg>
  );
}

export default CoatOfArms;
