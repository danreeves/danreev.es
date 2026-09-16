import { Wave } from "./Wave.tsx";

interface LoadingProps {
  label: string;
  className?: string;
  compact?: boolean;
  /** Reserve a square media area (e.g. album art) so tall image-led panels
   * don't jump in height once loaded. */
  media?: boolean;
  /** Tailwind min-height class to roughly match the loaded content's size
   * and reduce layout shift. Defaults to a small box. */
  minHeightClass?: string;
}

function ScanBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 w-full ${className}`}>
      <span className="shrink-0">[</span>
      <span className="relative flex-1 h-0 border-t border-dashed border-current">
        <span className="absolute -top-[0.6em] animate-scan">|</span>
      </span>
      <span className="shrink-0">]</span>
    </div>
  );
}

export function Loading({
  label,
  className = "",
  compact = false,
  media = false,
  minHeightClass = "min-h-40",
}: LoadingProps) {
  if (compact) {
    return (
      <div
        className={`w-full overflow-hidden bg-black p-1 text-white flex items-center gap-3 ${className}`}
      >
        <span className="shrink-0 animate-blink">▮</span>
        <span className="shrink-0 whitespace-nowrap uppercase">
          <Wave text={`loading ${label}`} />
        </span>
        <ScanBar className="max-w-40" />
      </div>
    );
  }

  const body = (
    <>
      <div className="font-title text-2xl sm:text-4xl uppercase " title={label}>
        {label}
      </div>
      <ScanBar className="max-w-64" />
      <span className="text-xs uppercase tracking-widest opacity-60">
        <Wave text="loading..." />
      </span>
    </>
  );

  if (media) {
    // Mirrors the real panel's `aspect-square w-full` art area so it
    // reserves the same height at any viewport width, then centers the
    // loading indicator in the space below it.
    return (
      <div className={`w-full flex flex-col overflow-hidden ${className}`}>
        <div className="aspect-square w-full bg-black/5" aria-hidden="true" />
        <div className="flex flex-col items-center justify-center gap-3">{body}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 w-full ${minHeightClass} ${className}`}
    >
      {body}
    </div>
  );
}
