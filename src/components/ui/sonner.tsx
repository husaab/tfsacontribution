"use client";

import { Toaster as SonnerToaster } from "sonner";

// Re-export toast from this single module so every caller shares the same
// sonner observer instance as the <Toaster> below. Importing `toast` directly
// from "sonner" in other client components can resolve to a separate module
// instance under Turbopack, so its toasts never reach this Toaster.
export { toast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "!bg-paper !text-espresso !border-hairline !rounded-2xl !shadow-[0_8px_30px_-8px_rgba(110,65,25,0.35)] !font-[family-name:var(--font-geist-sans)]",
          title: "!text-espresso",
          description: "!text-espresso/70",
        },
      }}
    />
  );
}
