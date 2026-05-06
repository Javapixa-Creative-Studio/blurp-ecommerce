"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

type SafeImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fallbackSrcs?: string[];
};

function uniq(list: (string | undefined)[]) {
  const out: string[] = [];
  for (const v of list) {
    if (!v) continue;
    if (!out.includes(v)) out.push(v);
  }
  return out;
}

export function SafeImage({
  src,
  fallbackSrcs,
  className,
  alt,
  ...props
}: SafeImageProps) {
  const candidates = React.useMemo(
    () =>
      uniq([
        src,
        ...(fallbackSrcs ?? []),
        // last resort: always-load placeholder
        "https://placehold.co/900x900?text=SoraStore",
      ]),
    [src, fallbackSrcs]
  );

  const [idx, setIdx] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const current = candidates[Math.min(idx, candidates.length - 1)];
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // If the image loads before hydration attaches onLoad, ensure we still show it.
  React.useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    if (el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [current]);

  return (
    <img
      {...props}
      ref={imgRef}
      src={current}
      alt={alt ?? ""}
      referrerPolicy={props.referrerPolicy ?? "no-referrer"}
      decoding={props.decoding ?? "async"}
      data-loaded={loaded ? "true" : "false"}
      className={cn("block img-fade", className)}
      onLoad={(e) => {
        props.onLoad?.(e);
        setLoaded(true);
      }}
      onError={(e) => {
        props.onError?.(e);
        setLoaded(false);
        setIdx((v) => (v < candidates.length - 1 ? v + 1 : v));
      }}
    />
  );
}

