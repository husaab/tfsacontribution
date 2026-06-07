import { Bezel } from "@/components/calc/bezel";
import { Eyebrow } from "@/components/calc/eyebrow";

interface ComingSoonPageProps {
  title: string;
  description: string;
  message: string;
}

export function ComingSoonPage({ title, description, message }: ComingSoonPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>{title}</Eyebrow>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        <p className="mt-2 text-espresso/60">{description}</p>
      </div>
      <Bezel innerClassName="flex min-h-[400px] items-center justify-center rounded-[1.4rem]">
        <div className="text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-espresso">
            Coming Soon
          </p>
          <p className="mt-2 text-sm text-espresso/55">{message}</p>
        </div>
      </Bezel>
    </div>
  );
}
