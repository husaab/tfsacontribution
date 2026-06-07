/**
 * Shared calculator layout. On large screens the results panel sits in a sticky
 * left column beside the (scrolling) inputs; on smaller screens everything
 * stacks. `below` renders full-width under both columns (e.g. RRSP's tables).
 */
export function CalculatorShell({
  results,
  inputs,
  below,
}: {
  results: React.ReactNode;
  inputs: React.ReactNode;
  below?: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-8 lg:grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:space-y-0">
        {/* Sticky on mobile (compact card pins as inputs scroll) and on desktop (results column). */}
        <div className="min-w-0 sticky top-20 z-20 lg:top-24">{results}</div>
        <div className="min-w-0">{inputs}</div>
      </div>
      {below}
    </div>
  );
}
