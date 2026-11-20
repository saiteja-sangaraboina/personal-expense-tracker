import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  hashPin,
  saveSecurityPin,
  hasSecurityPin,
  verifySecurityPin,
  removeSecurityPin,
} from '../securityPin';

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
}

describe('securityPin utility', () => {
  beforeAll(() => {
    if (!globalThis.localStorage) {
      globalThis.localStorage = new LocalStorageMock();
    }
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('rejects invalid non-4-digit PIN formats', async () => {
    expect(await saveSecurityPin('12')).toBe(false);
    expect(await saveSecurityPin('12345')).toBe(false);
    expect(await saveSecurityPin('abcd')).toBe(false);
  });

  it('hashes and verifies correct 4-digit PIN', async () => {
    await saveSecurityPin('4321');
    expect(hasSecurityPin()).toBe(true);

    const match = await verifySecurityPin('4321');
    expect(match.success).toBe(true);
    expect(match.isLocked).toBe(false);

    const wrong = await verifySecurityPin('9999');
    expect(wrong.success).toBe(false);
    expect(wrong.remainingAttempts).toBe(4);
  });

  it('locks out after 5 consecutive incorrect attempts', async () => {
    await saveSecurityPin('1111');

    for (let i = 0; i < 4; i++) {
      await verifySecurityPin('0000');
    }
    const finalAttempt = await verifySecurityPin('0000');
    expect(finalAttempt.isLocked).toBe(true);
    expect(finalAttempt.remainingAttempts).toBe(0);
  });

  it('removes security pin cleanly', async () => {
    await saveSecurityPin('7890');
    expect(hasSecurityPin()).toBe(true);
    removeSecurityPin();
    expect(hasSecurityPin()).toBe(false);
  });
});
