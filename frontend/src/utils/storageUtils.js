/**
 * storageUtils.js
 * Robust browser LocalStorage wrapper with JSON serialization, TTL expiration, and error handling.
 */

const PREFIX = 'expensetracker_';

/**
 * Set an item in localStorage with an optional time-to-live (TTL) in milliseconds.
 * @param {string} key
 * @param {any} value
 * @param {number} [ttlMs] - Optional expiration in milliseconds
 * @returns {boolean} true if successful
 */
export function setStorageItem(key, value, ttlMs = null) {
  try {
    const payload = {
      val: value,
      exp: ttlMs ? Date.now() + ttlMs : null,
    };
    localStorage.setItem(PREFIX + key, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn(`[storageUtils] Failed to set item "${key}":`, err);
    return false;
  }
}

/**
 * Get an item from localStorage. Automatically handles expiration.
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return defaultValue;

    const payload = JSON.parse(raw);
    if (!payload || typeof payload !== 'object' || !('val' in payload)) {
      return defaultValue;
    }

    if (payload.exp && Date.now() > payload.exp) {
      removeStorageItem(key);
      return defaultValue;
    }

    return payload.val;
  } catch (err) {
    console.warn(`[storageUtils] Failed to get item "${key}":`, err);
    return defaultValue;
  }
}

/**
 * Remove an item from localStorage.
 * @param {string} key
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (err) {
    console.warn(`[storageUtils] Failed to remove item "${key}":`, err);
  }
}

/**
 * Clear all items belonging to this app prefix.
 */
export function clearAppStorage() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn('[storageUtils] Failed to clear storage:', err);
  }
}
