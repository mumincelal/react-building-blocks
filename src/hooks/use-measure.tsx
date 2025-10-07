import React from "react";

interface MeasureResult<T extends Element> {
  ref: React.RefObject<T | null>;
  bounds: DOMRectReadOnly;
}

export const useMeasure = <T extends Element = Element>(): MeasureResult<T> => {
  const ref = React.useRef<T | null>(null);
  const [bounds, setBounds] = React.useState<DOMRectReadOnly>(
    new DOMRectReadOnly()
  );

  React.useEffect(() => {
    let observer: ResizeObserver;

    if (ref.current) {
      observer = new ResizeObserver(([entry]) => {
        if (entry) {
          setBounds(entry.contentRect);
        }
      });
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return { ref, bounds };
};
