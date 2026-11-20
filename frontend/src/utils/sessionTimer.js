/**
 * sessionTimer.js
 * Inactivity tracker and auto-logout timer for authenticated sessions.
 */

export class SessionActivityTracker {
  constructor(timeoutMs = 15 * 60 * 1000, warningBeforeMs = 60 * 1000) {
    this.timeoutMs = timeoutMs;
    this.warningBeforeMs = warningBeforeMs;
    this.lastActiveTime = Date.now();
    this.timerId = null;
    this.warningCallback = null;
    this.timeoutCallback = null;
    this.hasWarned = false;
  }

  recordActivity() {
    this.lastActiveTime = Date.now();
    this.hasWarned = false;
  }

  getRemainingTime() {
    const elapsed = Date.now() - this.lastActiveTime;
    return Math.max(0, this.timeoutMs - elapsed);
  }

  isTimedOut() {
    return this.getRemainingTime() <= 0;
  }

  isWarningPeriod() {
    return this.getRemainingTime() <= this.warningBeforeMs;
  }

  onWarning(cb) {
    this.warningCallback = cb;
  }

  onTimeout(cb) {
    this.timeoutCallback = cb;
  }

  start() {
    this.recordActivity();
    if (this.timerId) clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      const remaining = this.getRemainingTime();
      if (remaining <= 0) {
        this.stop();
        if (this.timeoutCallback) this.timeoutCallback();
      } else if (remaining <= this.warningBeforeMs && !this.hasWarned) {
        this.hasWarned = true;
        if (this.warningCallback) this.warningCallback(remaining);
      }
    }, 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
