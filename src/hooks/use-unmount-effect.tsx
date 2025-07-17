import React from "react";

/**
 * This hook ensures that the function is called when the component unmounts.
 * It uses a React effect to execute the provided function on unmount.
 * @param func Function to be executed when the component unmounts.
 * @returns A React effect that runs the provided function on unmount.
 */
export const useUnMountEffect = (func: () => void) => {
  return React.useEffect(() => func(), []);
};
