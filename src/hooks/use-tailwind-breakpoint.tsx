import React from "react";
// Update the path to your Tailwind config file
// @ts-expect-error
import tailwindConfig from "tailwind.config";
// @ts-expect-error
import resolveConfig from "tailwindcss/resolveConfig";

export const useTailwindBreakpoint = ({
  onBreakpointChange
}: {
  // eslint-disable-next-line no-unused-vars
  onBreakpointChange?: (breakpoint: string) => void;
} = {}): string => {
  const fullConfig = resolveConfig(tailwindConfig);
  const breakpoints: { [key: string]: string } = fullConfig.theme.screens;

  // Sort breakpoints by size and get the smallest one
  const sortedBreakpoints = Object.keys(breakpoints).sort(
    (a, b) =>
      Number.parseInt(breakpoints[a] as string, 10) -
      Number.parseInt(breakpoints[b] as string, 10)
  );
  const smallestBreakpoint = sortedBreakpoints[0] as string;

  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<string>("");

  React.useEffect(() => {
    let debounceTimeout: ReturnType<typeof setTimeout>;

    const checkBreakpoint = () => {
      const matchedBreakpoints = Object.keys(breakpoints).filter(
        (breakpoint) => {
          const breakpointValue = breakpoints[breakpoint] as string;
          const breakpointSize = Number.parseInt(breakpointValue, 10);
          return (
            !Number.isNaN(breakpointSize) && window.innerWidth >= breakpointSize
          );
        }
      );
      const newBreakpoint = matchedBreakpoints.pop() || smallestBreakpoint;
      if (newBreakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
        if (onBreakpointChange) {
          onBreakpointChange(newBreakpoint);
        }
      }
    };

    checkBreakpoint();

    const debouncedCheckBreakpoint = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(checkBreakpoint, 100);
    };

    window.addEventListener("resize", debouncedCheckBreakpoint);

    return () => {
      window.removeEventListener("resize", debouncedCheckBreakpoint);
      clearTimeout(debounceTimeout);
    };
  }, [breakpoints, currentBreakpoint, onBreakpointChange]);

  return currentBreakpoint;
};
