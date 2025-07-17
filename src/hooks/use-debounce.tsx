import React from "react";
import { useMountEffect } from "./use-mount-effect";
import { useUnMountEffect } from "./use-unmount-effect";

type DebounceOptions = {
  initialValue: string;
  delay?: number;
};

/**
 * This hook provides a debounced value that updates after a specified delay.
 * It uses a ref to track the mounted state and a timeout to manage the delay.
 * @param initialValue Initial value for the debounced state.
 * @param delay Delay in milliseconds before the value is updated.
 * @returns An object containing the current value, a function to set the value, and the debounced value.
 */
export const useDebounce = ({ initialValue, delay = 400 }: DebounceOptions) => {
  const [value, setValue] = React.useState(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState(initialValue);
  const mountedRef = React.useRef(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const cancelTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useMountEffect(() => {
    mountedRef.current = true;
  });

  useUnMountEffect(() => {
    cancelTimer();
  });

  React.useEffect(() => {
    if (!mountedRef.current) {
      return;
    }

    cancelTimer();

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  return { value, setValue, debouncedValue } as const;
};
