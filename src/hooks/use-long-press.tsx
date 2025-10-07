import React from "react";

export function useLongPress({
  delay,
  onLongPress,
  onClick,
  onCancel,
  onFinish,
  onStart
}: {
  delay: number;
  onLongPress: () => void;
  onClick?: () => void;
  onCancel?: () => void;
  onFinish?: () => void;
  onStart?: () => void;
}) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const pressTriggeredRef = React.useRef<boolean>(false);
  const pressInitiatedRef = React.useRef<boolean>(false);

  const start = React.useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (event: React.MouseEvent<any, MouseEvent> | React.TouchEvent<any>) => {
      // Only left clicks (button 0)
      if ("button" in event && event.button !== 0) {
        return;
      }
      pressTriggeredRef.current = false;
      pressInitiatedRef.current = true;
      if (onStart) {
        onStart();
      }

      timerRef.current = setTimeout(() => {
        if (pressInitiatedRef.current) {
          onLongPress();
          if (onFinish) {
            onFinish();
          }
          pressTriggeredRef.current = true;
        }
      }, delay);
    },
    [onLongPress, delay, onFinish, onStart]
  );

  const clear = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!pressTriggeredRef.current && pressInitiatedRef.current && onClick) {
      onClick();
    }
    pressInitiatedRef.current = false;
    timerRef.current = undefined;
    if (!pressTriggeredRef.current && onCancel) {
      onCancel();
    }
  }, [onClick, onCancel]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear
  };
}
