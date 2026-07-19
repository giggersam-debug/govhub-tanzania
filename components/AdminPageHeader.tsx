export default function AdminPageHeader({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-7">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-greentint flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="font-display text-2xl leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-inksoft mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
