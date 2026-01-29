/**
 * useAnalytics Hook
 * =================
 * Client-side analytics tracking for page views and interactions.
 */

"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { TrackEventInput } from "@/types";

interface UseAnalyticsOptions {
  trackPageViews?: boolean;
  debounceMs?: number;
}

interface UseAnalyticsReturn {
  trackEvent: (input: TrackEventInput) => Promise<void>;
  trackProductView: (productId: string) => Promise<void>;
  trackProductLike: (productId: string) => Promise<void>;
  trackProductShare: (productId: string) => Promise<void>;
  trackProductContact: (productId: string) => Promise<void>;
  trackGalleryView: (imageId: string) => Promise<void>;
  trackGalleryLike: (imageId: string) => Promise<void>;
  trackWhatsAppClick: (context?: string) => Promise<void>;
  trackContactForm: () => Promise<void>;
}

// Generic event sender (defined outside component to avoid stale closure issues)
async function sendAnalyticsEvent(input: TrackEventInput): Promise<void> {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch (error) {
    // Silently fail - analytics shouldn't break the user experience
    console.warn("Analytics event failed:", error);
  }
}

export function useAnalytics(
  options: UseAnalyticsOptions = {},
): UseAnalyticsReturn {
  const { trackPageViews = true, debounceMs = 1000 } = options;
  const pathname = usePathname();
  const lastTrackedPage = useRef<string>("");
  const lastTrackTime = useRef<number>(0);

  // Track page views automatically
  useEffect(() => {
    if (!trackPageViews) return;
    if (pathname === lastTrackedPage.current) return;

    const now = Date.now();
    if (now - lastTrackTime.current < debounceMs) return;

    lastTrackedPage.current = pathname;
    lastTrackTime.current = now;

    // Send page view event
    sendAnalyticsEvent({
      event: "page_view",
      page: pathname,
    });
  }, [pathname, trackPageViews, debounceMs]);

  // Wrapped event sender
  const sendEvent = useCallback(
    async (input: TrackEventInput): Promise<void> => {
      await sendAnalyticsEvent(input);
    },
    [],
  );

  // Track custom event
  const trackEvent = useCallback(
    async (input: TrackEventInput): Promise<void> => {
      await sendEvent(input);
    },
    [sendEvent],
  );

  // Product tracking helpers
  const trackProductView = useCallback(
    async (productId: string): Promise<void> => {
      await sendEvent({
        event: "product_view",
        page: pathname,
        productId,
      });
    },
    [sendEvent, pathname],
  );

  const trackProductLike = useCallback(
    async (productId: string): Promise<void> => {
      await sendEvent({
        event: "product_like",
        page: pathname,
        productId,
      });
    },
    [sendEvent, pathname],
  );

  const trackProductShare = useCallback(
    async (productId: string): Promise<void> => {
      await sendEvent({
        event: "product_share",
        page: pathname,
        productId,
      });
    },
    [sendEvent, pathname],
  );

  const trackProductContact = useCallback(
    async (productId: string): Promise<void> => {
      await sendEvent({
        event: "product_contact",
        page: pathname,
        productId,
      });
    },
    [sendEvent, pathname],
  );

  // Gallery tracking helpers
  const trackGalleryView = useCallback(
    async (imageId: string): Promise<void> => {
      await sendEvent({
        event: "gallery_view",
        page: pathname,
        productId: imageId, // Using productId field for imageId
        metadata: { type: "gallery" },
      });
    },
    [sendEvent, pathname],
  );

  const trackGalleryLike = useCallback(
    async (imageId: string): Promise<void> => {
      await sendEvent({
        event: "gallery_like",
        page: pathname,
        productId: imageId,
        metadata: { type: "gallery" },
      });
    },
    [sendEvent, pathname],
  );

  // Contact tracking helpers
  const trackWhatsAppClick = useCallback(
    async (context?: string): Promise<void> => {
      await sendEvent({
        event: "whatsapp_click",
        page: pathname,
        metadata: context ? { context } : undefined,
      });
    },
    [sendEvent, pathname],
  );

  const trackContactForm = useCallback(async (): Promise<void> => {
    await sendEvent({
      event: "contact_form",
      page: pathname,
    });
  }, [sendEvent, pathname]);

  return {
    trackEvent,
    trackProductView,
    trackProductLike,
    trackProductShare,
    trackProductContact,
    trackGalleryView,
    trackGalleryLike,
    trackWhatsAppClick,
    trackContactForm,
  };
}

export default useAnalytics;
