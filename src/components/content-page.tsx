import { Eyebrow } from "@/components/calc/eyebrow";

/** Editorial wrapper for long-form text pages (privacy, about, disclaimer, guides). */
export function ContentPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-espresso sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-lg leading-relaxed text-espresso/70">{intro}</p>
        )}
        {updated && (
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-espresso/40">
            Last updated {updated}
          </p>
        )}
      </header>
      <div className="space-y-10">{children}</div>
    </article>
  );
}

export function ContentSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-espresso">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-espresso/75">
        {children}
      </div>
    </section>
  );
}
