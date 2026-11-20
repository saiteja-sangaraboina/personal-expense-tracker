import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearAppStorage,
} from '../storageUtils';

// Mock localStorage for node test environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
  get length() {
    return Object.keys(this.store).length;
  }
}

describe('storageUtils utility', () => {
  beforeAll(() => {
    if (!globalThis.localStorage) {
      globalThis.localStorage = new LocalStorageMock();
    }
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves primitive values', () => {
    setStorageItem('user_currency', 'EUR');
    expect(getStorageItem('user_currency')).toBe('EUR');
  });

  it('stores and retrieves complex objects', () => {
    const preferences = { darkTheme: true, notifications: false };
    setStorageItem('prefs', preferences);
    expect(getStorageItem('prefs')).toEqual(preferences);
  });

  it('returns default value when key does not exist', () => {
    expect(getStorageItem('non_existent', 'DEFAULT')).toBe('DEFAULT');
  });

  it('removes stored items properly', () => {
    setStorageItem('temp', 123);
    removeStorageItem('temp');
    expect(getStorageItem('temp')).toBeNull();
  });

  it('respects expired TTL and clears item', () => {
    // Expired 1 second ago
    setStorageItem('expired_key', 'val', -1000);
    expect(getStorageItem('expired_key')).toBeNull();
  });

  it('clears all app-prefixed items without touching other storage', () => {
    setStorageItem('item1', 'A');
    setStorageItem('item2', 'B');
    localStorage.setItem('other_app_key', 'keep_me');

    clearAppStorage();

    expect(getStorageItem('item1')).toBeNull();
    expect(getStorageItem('item2')).toBeNull();
    expect(localStorage.getItem('other_app_key')).toBe('keep_me');
  });
});
