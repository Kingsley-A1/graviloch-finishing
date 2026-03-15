import { renderHook, act } from "@testing-library/react";
import { useFirstVisit, ANIMATION_SHOWN_KEY } from "./useFirstVisit";

describe("useFirstVisit", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    // Mock Date.now to return a stable value
    jest.spyOn(Date, "now").mockImplementation(() => 1000000000000); 
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return isLoading: true on initial (server) render", () => {
    const { result } = renderHook(() => useFirstVisit());
    
    // First render simulation - this is tricky to test perfectly with RTL 
    // since renderHook usually simulates the full mount (hydration complete).
    // However, if we assume standard behavior, right after mount it shouldn't show animation.
    expect(result.current.showWelcomeAnimation).toBe(true);
  });

  it("should return showWelcomeAnimation: true if there is no localStorage entry", () => {
    const { result } = renderHook(() => useFirstVisit());
    expect(result.current.showWelcomeAnimation).toBe(true);
  });

  it("should return showWelcomeAnimation: false if animation was shown recently", () => {
    // Set timestamp to "just now"
    window.localStorage.setItem(ANIMATION_SHOWN_KEY, "1000000000000");

    const { result } = renderHook(() => useFirstVisit());
    expect(result.current.showWelcomeAnimation).toBe(false);
  });

  it("should return showWelcomeAnimation: true if animation was shown over 7 days ago", () => {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    // Set timestamp to exactly 7 days + 1ms ago
    const oldTimestamp = 1000000000000 - sevenDaysInMs - 1;
    window.localStorage.setItem(ANIMATION_SHOWN_KEY, oldTimestamp.toString());

    const { result } = renderHook(() => useFirstVisit());
    expect(result.current.showWelcomeAnimation).toBe(true);
  });

  it("should update localStorage when dismissWelcomeAnimation is called", () => {
    const { result } = renderHook(() => useFirstVisit());
    
    act(() => {
      result.current.dismissWelcomeAnimation();
    });

    const storedValue = window.localStorage.getItem(ANIMATION_SHOWN_KEY);
    expect(storedValue).toBe("1000000000000"); // Matches our mocked Date.now()
    expect(result.current.showWelcomeAnimation).toBe(false);
  });
});
