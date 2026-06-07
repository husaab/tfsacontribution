import { formatCurrency } from "./format";

/**
 * A playful, escalating congratulations shown when someone raises their
 * "worth today" slider cap past the default. Tier depends on the new ceiling.
 */
export function flexMessage(cap: number): string {
  const amount = formatCurrency(cap);
  if (cap >= 2_000_000)
    return `Phenomenal.`;
  if (cap >= 1_000_000)
    return `👑 Millionaire status: ${amount} unlocked.`;
  if (cap >= 600_000)
    return `🤑 Save some for the rest of us.`;
  if (cap >= 400_000)
    return `🚀 Big baller alert! Slider opened to ${amount}.`;
  return `💰 Look at you, moneybags — ${amount} unlocked.`;
}
