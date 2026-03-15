/**
 * useFirstVisit Hook
 * ==================
 * Detects if this is the user's first visit to show welcome animation.
 * Uses localStorage to persist visit state with a 7-day cooldown.
 */

"use client";

import { useState, useCallback, useSyncExternalStore, useEffect } from "react";

export const STORAGE_KEY = "graviloch-visited";
export const ANIMATION_SHOWN_KEY = "graviloch-animation-shown";
const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

interface UseFirstVisitReturn {
  isFirstVisit: boolean;
  isLoading: boolean;
  markAsVisited: () => void;
  resetVisitStatus: () => void;
  showWelcomeAnimation: boolean;
  dismissWelcomeAnimation: () => void;
}

// Helper to get localStorage value safely
function getStorageValue(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Subscribe function for useSyncExternalStore
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useFirstVisit(): UseFirstVisitReturn {
  // Use useSyncExternalStore to safely read from localStorage
  const hasVisitedStr = useSyncExternalStore(
    subscribe,
    () => getStorageValue(STORAGE_KEY),
    () => null, // Server snapshot
  );

  const animationShownStr = useSyncExternalStore(
    subscribe,
    () => getStorageValue(ANIMATION_SHOWN_KEY),
    () => null, // Server snapshot
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if animation should be shown based on timestamp and cooldown
  let shouldShowAnimation = false;
  let isFirstVisit = false;

  if (isClient) {
    // If no record exists, it's a first visit
    if (!hasVisitedStr) {
      isFirstVisit = true;
    }

    if (!animationShownStr) {
      // Never shown before
      shouldShowAnimation = true;
    } else {
      // Parse the timestamp it was last shown
      const lastShownTimestamp = parseInt(animationShownStr, 10);
      if (!isNaN(lastShownTimestamp)) {
        const now = Date.now();
        // If 7 days have passed, show it again
        if (now - lastShownTimestamp > COOLDOWN_MS) {
          shouldShowAnimation = true;
        }
      } else {
        // Fallback for old "true" string value (pre-feature fix)
        // Treat as if we need to show it again to reset to a proper timestamp
        shouldShowAnimation = true;
      }
    }
  }

  const markAsVisited = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (error) {
      console.warn("Could not save visit status:", error);
    }
  }, []);

  const dismissWelcomeAnimation = useCallback(() => {
    try {
      const now = Date.now().toString();
      localStorage.setItem(ANIMATION_SHOWN_KEY, now);
      localStorage.setItem(STORAGE_KEY, now);
      // Force a re-render by dispatching a storage event
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.warn("Could not save animation status:", error);
    }
  }, []);

  const resetVisitStatus = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ANIMATION_SHOWN_KEY);
      // Force a re-render by dispatching a storage event
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.warn("Could not reset visit status:", error);
    }
  }, []);

  return {
    isFirstVisit,
    isLoading: !isClient,
    markAsVisited,
    resetVisitStatus,
    showWelcomeAnimation: shouldShowAnimation,
    dismissWelcomeAnimation,
  };
}

export default useFirstVisit;
