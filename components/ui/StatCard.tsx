export function StatCard({
  label,
  value,
  accent = false,
  className = "",
}: {
  label: string;
  value: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`concrete-bg hairline rounded-xs px-3 py-3 flex flex-col gap-1 ${className}`}
    >
      <span className="text-[9px] uppercase tracking-label text-sweat font-mono">
        {label}
      </span>
      <span
        className={`display-tight text-2xl ${
          accent ? "text-win-gold" : "text-jordan-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
