import React from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isCached: boolean;
  refetch: () => void;
};

// A generic fetch hook for API calls with caching, error handling, and refetch capability
export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): FetchState<T> {
  const [state, setState] = React.useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
    isCached: false,
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    refetch: () => {}
  });

  const fetchData = React.useCallback(
    async (ignoreCache = false) => {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      try {
        let data: T;
        let isCached = false;
        const cache = sessionStorage.getItem(url);

        if (cache && !ignoreCache) {
          data = JSON.parse(cache) as T;
          isCached = true;
        } else {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          data = await response.json();
          sessionStorage.setItem(url, JSON.stringify(data));
        }

        setState({
          data,
          isLoading: false,
          error: null,
          isCached,
          refetch: () => fetchData(true)
        });
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          data: null,
          isLoading: false,
          error: error as Error
        }));
      }
    },
    [url, options]
  );

  // Triggering the fetch operation when the URL or options change
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}
