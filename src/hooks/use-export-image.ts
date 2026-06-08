"use client";

import { useCallback } from "react";
import * as htmlToImage from "html-to-image";

export interface ExportImageOptions {
  filename: string;
  title: string;
}

export type ExportResult = "shared" | "downloaded";

export function useExportImage() {
  const exportImage = useCallback(
    async (node: HTMLElement, { filename, title }: ExportImageOptions): Promise<ExportResult> => {
      // Ensure web fonts (Bricolage, Geist) are loaded before rasterizing,
      // otherwise the PNG falls back to a system font.
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }

      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: 2,
        cacheBust: true,
      });

      if (!blob) {
        throw new Error("Failed to render image");
      }

      const file = new File([blob], `${filename}.png`, { type: "image/png" });

      // Mobile / share-capable: open the native share sheet.
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] }) &&
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({ files: [file], title });
          return "shared";
        } catch (err) {
          // User dismissed the share sheet — not an error.
          if (err instanceof DOMException && err.name === "AbortError") {
            return "shared";
          }
          throw err;
        }
      }

      // Desktop / fallback: download via object URL.
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke after the click has been processed.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return "downloaded";
    },
    []
  );

  return { exportImage };
}
