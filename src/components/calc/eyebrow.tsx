import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-white/50 px-3 py-1.5",
        "text-[10px] font-semibold uppercase tracking-[0.2em] text-terra-deep",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-terra" />
      {children}
    </span>
  );
}
