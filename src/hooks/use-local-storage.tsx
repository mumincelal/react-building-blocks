/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import React from "react";

export function useLocalStorageValue<T>(
  key: string,
  fallbackValue?: T
): [T | undefined, boolean, (value: T) => void] {
  const [value, setValue] = React.useState<T | undefined>(fallbackValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);

    try {
      const item = window.localStorage.getItem(key);
      setValue(item !== null ? JSON.parse(item) : fallbackValue);
    } catch (error) {
      console.error(error);
      setValue(fallbackValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, fallbackValue]);

  const setStorageValue = React.useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Effect to update component when localStorage changes
  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const item = window.localStorage.getItem(key);
          setValue(item !== null ? JSON.parse(item) : fallbackValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, fallbackValue]);

  return [value, isLoading, setStorageValue];
}
