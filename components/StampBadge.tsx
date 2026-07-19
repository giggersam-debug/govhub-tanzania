// The circular "RASMI" (official) seal used to mark verified forms.
// Pure SVG, server-renderable — no client JS required.
export default function StampBadge({
  color = "#0B6E4F",
  label = "✓",
  size = 62,
}: {
  color?: string;
  label?: string;
  size?: number;
}) {
  const pathId = `stamp-path-${label}-${size}`.replace(/\s+/g, "-");

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <path id={pathId} d="M 32,32 m -24,0 a 24,24 0 1,1 48,0 a 24,24 0 1,1 -48,0" />
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke={color} strokeWidth="1.4" strokeDasharray="1.5 3.4" opacity="0.55" />
      <circle cx="32" cy="32" r="22" fill="none" stroke={color} strokeWidth="1.2" />
      <text fontSize="5.6" fill={color} letterSpacing="2">
        <textPath href={`#${pathId}`} startOffset="1%">
          RASMI • SERIKALI • RASMI • SERIKALI •
        </textPath>
      </text>
      <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill={color} fontFamily="IBM Plex Mono, monospace">
        {label}
      </text>
    </svg>
  );
}
