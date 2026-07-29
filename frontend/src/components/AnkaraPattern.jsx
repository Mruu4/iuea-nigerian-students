function AnkaraPattern({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="lattice" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" />
          <path
            d="M20 0 L40 20 L20 40 L0 20 Z"
            fill="none"
            stroke="var(--color-gold-light)"
            strokeWidth="0.75"
            opacity="0.35"
          />
          <circle cx="20" cy="20" r="2.5" fill="var(--color-gold-light)" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#lattice)" />
    </svg>
  );
}

export default AnkaraPattern;
