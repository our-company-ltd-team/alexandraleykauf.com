import { useCallback, useEffect } from "react";

type KeyboardNavigationOptions = {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  enabled?: boolean;
};

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const { onLeft, onRight, onUp, onDown, enabled = true } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (event.target instanceof HTMLInputElement
      || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        onLeft?.();
        break;
      case "ArrowRight":
        event.preventDefault();
        onRight?.();
        break;
      case "ArrowUp":
        event.preventDefault();
        onUp?.();
        break;
      case "ArrowDown":
        event.preventDefault();
        onDown?.();
        break;
    }
  }, [onLeft, onRight, onUp, onDown]);

  useEffect(() => {
    if (!enabled)
      return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, enabled]);
}
