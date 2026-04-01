import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface UseLoadingReturn {
  loading: LoadingState;
  isLoading: (key?: string) => boolean;
  setLoading: (key: string, value: boolean) => void;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  withLoading: <T>(key: string, asyncFn: () => Promise<T>) => Promise<T>;
  resetLoading: () => void;
}

export const useLoading = (initialState: LoadingState = {}): UseLoadingReturn => {
  const [loading, setLoadingState] = useState<LoadingState>(initialState);

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loading[key] || false;
    }
    return Object.values(loading).some(Boolean);
  }, [loading]);

  const setLoading = useCallback((key: string, value: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const startLoading = useCallback((key: string) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false);
  }, [setLoading]);

  const withLoading = useCallback(async <T>(key: string, asyncFn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(key, true);
      const result = await asyncFn();
      return result;
    } finally {
      setLoading(key, false);
    }
  }, [setLoading]);

  const resetLoading = useCallback(() => {
    setLoadingState({});
  }, []);

  return {
    loading,
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
    resetLoading
  };
};

export default useLoading;
