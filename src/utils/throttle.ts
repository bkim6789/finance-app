/**
 * Creates a throttled version of a callback that runs at most once every `limit` milliseconds.
 * Useful for creating throttled state updates that are reusable across components.
 */
export function createThrottle(limit: number) {
  let lastRun = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let pendingCallback: (() => void) | null = null;

  return function throttledFn(callback: () => void) {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun;

    if (timeSinceLastRun >= limit) {
      // Enough time has passed, run immediately
      lastRun = now;
      callback();
      pendingCallback = null;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    } else {
      // Not enough time has passed, schedule for later
      pendingCallback = callback;
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          if (pendingCallback) {
            lastRun = Date.now();
            pendingCallback();
            pendingCallback = null;
          }
          timeoutId = null;
        }, limit - timeSinceLastRun);
      }
    }
  };
}
