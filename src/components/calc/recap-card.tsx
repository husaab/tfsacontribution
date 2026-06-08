"use client";

export interface RecapData {
  eyebrow: string; // "TFSA · 2026"
  kicker: string; // "You can still contribute"
  figure: string; // "$109,000"
  context: string; // "of $109,000 cumulative room"
  pct: number; // 0..1 for the donut
  pctLabel: string; // "room used" | "lifetime used"
  stats: { label: string; value: string; accent?: boolean }[];
  filename: string; // "tfsa-contribution-room"
}

// Hardcoded hex equivalents of the OKLCH theme tokens (src/app/globals.css).
// html-to-image rasterizes via an SVG <foreignObject>; some engines do not
// resolve oklch() inside that context, so the card is styled with literal hex
// to guarantee the export matches the brand colors.
const COLOR = {
  cream: "#fdf9f6",
  paper: "#f6efe8",
  ink: "#2f1f16",
  espresso: "#442d20",
  terra: "#c47048",
  terraDeep: "#aa5635",
  hairline: "#e3ddd6",
  white: "#ffffff",
} as const;

const DISPLAY_FONT =
  "var(--font-bricolage), 'Bricolage Grotesque', system-ui, sans-serif";
const SANS_FONT = "var(--font-geist-sans), system-ui, sans-serif";

function Donut({ pct, label }: { pct: number; label: string }) {
  const clamped = Math.min(1, Math.max(0, pct));
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ position: "relative", height: 120, width: 120, flexShrink: 0 }}>
        <svg
          viewBox="0 0 120 120"
          width={120}
          height={120}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle cx="60" cy="60" r={r} fill="none" stroke={COLOR.paper} strokeWidth="14" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={COLOR.terra}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - clamped)}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: DISPLAY_FONT,
            fontSize: 24,
            fontWeight: 700,
            color: COLOR.ink,
          }}
        >
          {Math.round(clamped * 100)}%
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(68,45,32,0.55)",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function RecapCard({ recap }: { recap: RecapData }) {
  const dateStr = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const accentStat = recap.stats.find((s) => s.accent);
  const restStats = recap.stats.filter((s) => !s.accent);

  return (
    <div
      style={{
        width: 640,
        boxSizing: "border-box",
        padding: 48,
        background: `linear-gradient(160deg, ${COLOR.cream} 0%, ${COLOR.paper} 100%)`,
        fontFamily: SANS_FONT,
        color: COLOR.ink,
        borderRadius: 32,
        border: `1px solid ${COLOR.hairline}`,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 999,
          border: `1px solid ${COLOR.hairline}`,
          background: "rgba(255,255,255,0.6)",
          padding: "7px 14px",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: COLOR.terraDeep,
        }}
      >
        <span
          style={{
            height: 6,
            width: 6,
            borderRadius: 999,
            background: COLOR.terra,
            display: "inline-block",
          }}
        />
        {recap.eyebrow}
      </div>

      {/* Kicker */}
      <p
        style={{
          margin: "24px 0 0",
          fontFamily: DISPLAY_FONT,
          fontSize: 20,
          fontWeight: 500,
          color: COLOR.espresso,
        }}
      >
        {recap.kicker}
      </p>

      {/* Big figure */}
      <p
        style={{
          margin: "6px 0 0",
          fontFamily: DISPLAY_FONT,
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color: COLOR.ink,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {recap.figure}
      </p>

      {/* Context */}
      <p style={{ margin: "14px 0 0", fontSize: 16, color: "rgba(68,45,32,0.6)" }}>
        {recap.context}
      </p>

      {/* Donut + accent stat row */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Donut pct={recap.pct} label={recap.pctLabel} />
        {accentStat && (
          <div
            style={{
              borderRadius: 22,
              padding: "18px 22px",
              background: `linear-gradient(135deg, ${COLOR.terra} 0%, ${COLOR.terraDeep} 100%)`,
              color: COLOR.white,
              minWidth: 200,
              textAlign: "right",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {accentStat.label}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontFamily: DISPLAY_FONT,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {accentStat.value}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ marginTop: 32, height: 1, background: COLOR.hairline }} />

      {/* Remaining stats */}
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        {restStats.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                color: "rgba(68,45,32,0.55)",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: 22,
                fontWeight: 700,
                color: COLOR.espresso,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 36,
          paddingTop: 20,
          borderTop: `1px solid ${COLOR.hairline}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: "rgba(68,45,32,0.5)",
        }}
      >
        <span style={{ fontWeight: 600, color: COLOR.terraDeep }}>
          tfsacontribution.com
        </span>
        <span>{dateStr}</span>
      </div>
    </div>
  );
}
