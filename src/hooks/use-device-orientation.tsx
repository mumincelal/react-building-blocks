import React from "react";

interface DeviceOrientationState {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean;
}

// Define an extended interface for DeviceOrientationEvent including requestPermission
interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = React.useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false
  });

  // Check if the DeviceOrientationEvent is supported - this will be true in most browsers (even desktop)
  const isSupported = typeof window.DeviceOrientationEvent !== "undefined";

  // Determine if we need to request permission (for iOS 13+)
  const [isPermissionGranted, setIsPermissionGranted] = React.useState(
    typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventExtended)
      .requestPermission !== "function"
  );

  const handleOrientation = React.useCallback(
    (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute
      });
    },
    []
  );

  React.useEffect(() => {
    if (isPermissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [isPermissionGranted, handleOrientation]);

  const requestPermission = React.useCallback(async () => {
    const deviceOrientationEvent =
      DeviceOrientationEvent as unknown as DeviceOrientationEventExtended;

    if (typeof deviceOrientationEvent.requestPermission === "function") {
      try {
        const permissionState =
          await deviceOrientationEvent.requestPermission();
        setIsPermissionGranted(permissionState === "granted");
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error requesting device orientation permission:", error);
      }
    }
  }, []);

  return { orientation, requestPermission, isPermissionGranted, isSupported };
}
