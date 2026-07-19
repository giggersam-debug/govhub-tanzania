import Link from "next/link";

export default function Breadcrumb({ items }: { items: [string, string | null][] }) {
  return (
    <div className="text-xs text-inksoft flex gap-1.5 flex-wrap">
      {items.map(([label, href], i) => (
        <span key={label} className="flex items-center gap-1.5">
          {href ? (
            <Link href={href} className="hover:text-greendeep hover:underline">
              {label}
            </Link>
          ) : (
            <span>{label}</span>
          )}
          {i < items.length - 1 && <span className="text-line">/</span>}
        </span>
      ))}
    </div>
  );
}
