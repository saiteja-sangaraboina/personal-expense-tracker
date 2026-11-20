/**
 * securityPin.js
 * Client-side 4-digit Security PIN management with SHA-256 hashing and attempt throttling.
 */

const PIN_STORAGE_KEY = 'expensetracker_user_pin';
const ATTEMPTS_KEY = 'expensetracker_pin_attempts';
const MAX_ATTEMPTS = 5;

/**
 * Hash a numeric PIN using SHA-256.
 * @param {string} pin - 4-digit PIN string
 * @returns {Promise<string>} hex string
 */
export async function hashPin(pin) {
  const clean = String(pin).trim();
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clean + '_salt_expense_tracker');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback hash for test/node environments
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  return `fallback_${Math.abs(hash)}`;
}

/**
 * Set and persist a new user security PIN.
 * @param {string} pin - 4-digit PIN
 * @returns {Promise<boolean>}
 */
export async function saveSecurityPin(pin) {
  if (!/^\d{4}$/.test(pin)) return false;
  const hash = await hashPin(pin);
  localStorage.setItem(PIN_STORAGE_KEY, hash);
  localStorage.removeItem(ATTEMPTS_KEY);
  return true;
}

/**
 * Check if a security PIN is currently configured.
 * @returns {boolean}
 */
export function hasSecurityPin() {
  return Boolean(localStorage.getItem(PIN_STORAGE_KEY));
}

/**
 * Verify an entered PIN against the stored hash.
 * @param {string} enteredPin
 * @returns {Promise<{ success: boolean, remainingAttempts: number, isLocked: boolean }>}
 */
export async function verifySecurityPin(enteredPin) {
  const storedHash = localStorage.getItem(PIN_STORAGE_KEY);
  if (!storedHash) {
    return { success: true, remainingAttempts: MAX_ATTEMPTS, isLocked: false };
  }

  let attempts = Number(localStorage.getItem(ATTEMPTS_KEY)) || 0;
  if (attempts >= MAX_ATTEMPTS) {
    return { success: false, remainingAttempts: 0, isLocked: true };
  }

  const hash = await hashPin(enteredPin);
  if (hash === storedHash) {
    localStorage.removeItem(ATTEMPTS_KEY);
    return { success: true, remainingAttempts: MAX_ATTEMPTS, isLocked: false };
  }

  attempts += 1;
  localStorage.setItem(ATTEMPTS_KEY, String(attempts));
  const remainingAttempts = Math.max(0, MAX_ATTEMPTS - attempts);

  return {
    success: false,
    remainingAttempts,
    isLocked: remainingAttempts <= 0,
  };
}

/**
 * Clear stored PIN.
 */
export function removeSecurityPin() {
  localStorage.removeItem(PIN_STORAGE_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
}
