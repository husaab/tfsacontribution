"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { RecapCard, type RecapData } from "./recap-card";
import { useExportImage } from "@/hooks/use-export-image";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export function ExportButton({
  recap,
  variant = "full",
  className,
}: {
  recap: RecapData;
  variant?: "full" | "icon";
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { exportImage } = useExportImage();
  const [busy, setBusy] = useState(false);

  // Web Share API is the mobile path; show the share glyph when available.
  // Resolve after mount so SSR and the first client render agree (the icon
  // would otherwise differ between server and client and trip hydration).
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(
      typeof navigator !== "undefined" && typeof navigator.canShare === "function"
    );
  }, []);
  const Icon = canShare ? Share2 : Download;

  async function handleClick() {
    if (busy || !cardRef.current) return;
    setBusy(true);
    try {
      const result = await exportImage(cardRef.current, {
        filename: recap.filename,
        title: `${recap.eyebrow} — ${recap.figure}`,
      });
      toast(result === "shared" ? "Recap ready to share" : "Saved your recap");
    } catch (err) {
      console.error("Recap export failed", err);
      toast.error("Couldn't save your recap. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        aria-label="Save recap"
        className={cn(
          variant === "full"
            ? "flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-white/60 px-4 py-3 text-sm font-semibold text-terra-deep shadow-[0_10px_28px_-20px_rgba(90,55,25,0.6)] transition hover:bg-white disabled:opacity-60"
            : "inline-flex items-center justify-center gap-1.5 rounded-full border border-hairline bg-white/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-terra-deep transition hover:bg-white disabled:opacity-60",
          className
        )}
      >
        <Icon className={variant === "full" ? "size-4" : "size-3.5"} aria-hidden />
        Save recap
      </button>

      {/* Off-screen but laid-out node for rasterization. Must NOT use display:none
          / hidden — the node needs layout to render into the PNG. */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] top-0"
      >
        <div ref={cardRef}>
          <RecapCard recap={recap} />
        </div>
      </div>
    </>
  );
}
