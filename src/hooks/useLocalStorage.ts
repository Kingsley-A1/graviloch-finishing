/**
 * useLocalStorage Hook
 * ====================
 * Type-safe localStorage hook with SSR support.
 * Uses useState + useEffect pattern to avoid useSyncExternalStore issues.
 */

"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type SetValue<T> = T | ((prevValue: T) => T);

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
  isLoading: boolean;
}

// Helper to safely read from localStorage
function getStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  // Start with initialValue to avoid hydration mismatch
  const [value, setValueState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const initialValueRef = useRef(initialValue);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const stored = getStorageValue(key, initialValueRef.current);
    setValueState(stored);
    setIsLoading(false);
  }, [key]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValueState(JSON.parse(e.newValue));
        } catch {
          // Ignore parse errors
        }
      } else if (e.key === key && e.newValue === null) {
        setValueState(initialValueRef.current);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  // Set value
  const setValue = useCallback(
    (newValue: SetValue<T>) => {
      try {
        setValueState((prev) => {
          const valueToStore =
            newValue instanceof Function ? newValue(prev) : newValue;

          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }

          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  // Remove value
  const removeValue = useCallback(() => {
    try {
      setValueState(initialValueRef.current);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
  };
}

/**
 * Specialized hook for managing liked items
 */
export function useLikedItems(storageKey: string = "graviloch-liked") {
  const {
    value: likedIds,
    setValue,
    isLoading,
  } = useLocalStorage<string[]>(storageKey, []);

  const isLiked = useCallback(
    (id: string): boolean => {
      return likedIds.includes(id);
    },
    [likedIds],
  );

  const toggleLike = useCallback(
    (id: string): boolean => {
      const isCurrentlyLiked = likedIds.includes(id);

      if (isCurrentlyLiked) {
        setValue(likedIds.filter((likedId) => likedId !== id));
      } else {
        setValue([...likedIds, id]);
      }

      return !isCurrentlyLiked;
    },
    [likedIds, setValue],
  );

  const addLike = useCallback(
    (id: string): void => {
      if (!likedIds.includes(id)) {
        setValue([...likedIds, id]);
      }
    },
    [likedIds, setValue],
  );

  const removeLike = useCallback(
    (id: string): void => {
      setValue(likedIds.filter((likedId) => likedId !== id));
    },
    [likedIds, setValue],
  );

  return {
    likedIds,
    isLiked,
    toggleLike,
    addLike,
    removeLike,
    isLoading,
  };
}

/**
 * Specialized hook for cart/inquiry items
 */
export function useInquiryList(storageKey: string = "graviloch-inquiries") {
  interface InquiryItem {
    id: string;
    name: string;
    price?: number;
    imageUrl?: string;
    addedAt: string;
  }

  const {
    value: items,
    setValue,
    isLoading,
  } = useLocalStorage<InquiryItem[]>(storageKey, []);

  const addItem = useCallback(
    (item: Omit<InquiryItem, "addedAt">): void => {
      if (!items.some((i) => i.id === item.id)) {
        setValue([...items, { ...item, addedAt: new Date().toISOString() }]);
      }
    },
    [items, setValue],
  );

  const removeItem = useCallback(
    (id: string): void => {
      setValue(items.filter((item) => item.id !== id));
    },
    [items, setValue],
  );

  const clearAll = useCallback((): void => {
    setValue([]);
  }, [setValue]);

  const hasItem = useCallback(
    (id: string): boolean => {
      return items.some((item) => item.id === id);
    },
    [items],
  );

  return {
    items,
    addItem,
    removeItem,
    clearAll,
    hasItem,
    count: items.length,
    isLoading,
  };
}

export default useLocalStorage;
