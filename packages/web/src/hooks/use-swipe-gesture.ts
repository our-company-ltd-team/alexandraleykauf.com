import { useEffect, useRef } from "react";

type SwipeGestureOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // minimum distance for swipe (default: 50px)
  enabled?: boolean;
};

export function useSwipeGesture<T extends HTMLElement>(
  options: SwipeGestureOptions,
) {
  const { onSwipeLeft, onSwipeRight, threshold = 50, enabled = true } = options;
  const ref = useRef<T>(null);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !ref.current)
      return;

    const element = ref.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          onSwipeLeft?.(); // Swipe left = go to next
        }
        else {
          onSwipeRight?.(); // Swipe right = go to previous
        }
      }
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, enabled]);

  return ref;
}
