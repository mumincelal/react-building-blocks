import React from "react";

/**
 * This hook ensures that the function is only called once when the component mounts.
 * It uses a ref to track if the component has already mounted, preventing multiple calls.
 * @param func Function to be executed when the component mounts.
 * @returns A React effect that runs the provided function on mount.
 */
export const useMountEffect = (func: () => void) => {
  const mounted = React.useRef(false);

  return React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      func();
    }
  }, []);
};
