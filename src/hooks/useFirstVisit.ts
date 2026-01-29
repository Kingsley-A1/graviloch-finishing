/**
 * useFirstVisit Hook
 * ==================
 * Detects if this is the user's first visit to show welcome animation.
 * Uses localStorage to persist visit state.
 */

"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "graviloch-visited";
const ANIMATION_SHOWN_KEY = "graviloch-animation-shown";

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
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useFirstVisit(): UseFirstVisitReturn {
  // Use useSyncExternalStore to safely read from localStorage
  const hasVisited = useSyncExternalStore(
    subscribe,
    () => getStorageValue(STORAGE_KEY) === "true",
    () => false, // Server snapshot
  );

  const animationShown = useSyncExternalStore(
    subscribe,
    () => getStorageValue(ANIMATION_SHOWN_KEY) === "true",
    () => true, // Server snapshot - don't show animation during SSR
  );

  const [localIsFirstVisit, setLocalIsFirstVisit] = useState(!hasVisited);
  const [localShowAnimation, setLocalShowAnimation] = useState(
    !animationShown && !hasVisited,
  );

  const isFirstVisit = localIsFirstVisit && !hasVisited;
  const showWelcomeAnimation = localShowAnimation && !animationShown;

  const markAsVisited = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      setLocalIsFirstVisit(false);
    } catch (error) {
      console.warn("Could not save visit status:", error);
    }
  }, []);

  const dismissWelcomeAnimation = useCallback(() => {
    try {
      localStorage.setItem(ANIMATION_SHOWN_KEY, "true");
      localStorage.setItem(STORAGE_KEY, "true");
      setLocalShowAnimation(false);
      setLocalIsFirstVisit(false);
    } catch (error) {
      console.warn("Could not save animation status:", error);
    }
  }, []);

  const resetVisitStatus = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ANIMATION_SHOWN_KEY);
      setLocalIsFirstVisit(true);
      setLocalShowAnimation(true);
    } catch (error) {
      console.warn("Could not reset visit status:", error);
    }
  }, []);

  return {
    isFirstVisit,
    isLoading: false, // No longer needed with useSyncExternalStore
    markAsVisited,
    resetVisitStatus,
    showWelcomeAnimation,
    dismissWelcomeAnimation,
  };
}

export default useFirstVisit;
