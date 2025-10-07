import React from "react";

const defaultEvents = [
  "mousemove",
  "mousedown",
  "touchstart",
  "keydown",
  "wheel",
  "resize"
];

interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

export const useIdle = ({
  timeout = 5000,
  events = defaultEvents
}: UseIdleOptions = {}) => {
  const [isIdle, setIsIdle] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      setIsIdle(false);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Initialize the timer
    resetTimer();

    // Event handler to reset the timer on user activity
    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    // Cleanup function
    return () => {
      clearTimeout(timer);
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [timeout, events]);

  return isIdle;
};
