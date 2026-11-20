import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SessionActivityTracker } from '../sessionTimer';

describe('sessionTimer utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('tracks user activity and computes remaining time', () => {
    const tracker = new SessionActivityTracker(10000, 2000);
    expect(tracker.getRemainingTime()).toBe(10000);

    vi.advanceTimersByTime(3000);
    expect(tracker.getRemainingTime()).toBe(7000);

    tracker.recordActivity();
    expect(tracker.getRemainingTime()).toBe(10000);
  });

  it('triggers warning and timeout callbacks at appropriate intervals', () => {
    const tracker = new SessionActivityTracker(10000, 2000);
    const onWarning = vi.fn();
    const onTimeout = vi.fn();

    tracker.onWarning(onWarning);
    tracker.onTimeout(onTimeout);
    tracker.start();

    // Advance 8.5 seconds (in warning threshold of 2 seconds)
    vi.advanceTimersByTime(8500);
    expect(onWarning).toHaveBeenCalledTimes(1);
    expect(onTimeout).not.toHaveBeenCalled();

    // Advance remaining to timeout
    vi.advanceTimersByTime(2000);
    expect(onTimeout).toHaveBeenCalledTimes(1);

    tracker.stop();
  });
});
