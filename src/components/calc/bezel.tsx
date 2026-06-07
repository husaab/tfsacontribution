import { cn } from "@/lib/utils";

/** Double-bezel (Doppelrand): translucent outer tray wrapping a solid inner core. */
export function Bezel({
  children,
  className,
  innerClassName,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "light" | "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/60 bg-white/40 p-1.5",
        "shadow-[0_20px_50px_-30px_rgba(90,55,25,0.5),inset_0_1px_1px_rgba(255,255,255,0.7)]",
        className
      )}
    >
      <div
        className={cn(
          "rounded-[calc(2rem-0.375rem)] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
          tone === "accent"
            ? "bg-gradient-to-br from-terra to-terra-deep text-white"
            : "bg-white",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
