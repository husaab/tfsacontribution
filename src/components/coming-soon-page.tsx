import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonPageProps {
  title: string;
  description: string;
  message: string;
}

export function ComingSoonPage({ title, description, message }: ComingSoonPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">Coming Soon</p>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
