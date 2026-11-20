/**
 * offlineSync.js - Offline queue management and network detection
 */

class OfflineSyncQueue {
  constructor(storageKey = 'expense_offline_queue') {
    this.storageKey = storageKey;
    this.memoryQueue = [];
  }

  getStorage() {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      return globalThis.localStorage;
    }
    return null;
  }

  enqueue(action) {
    if (!action) return;
    const item = {
      ...action,
      queuedAt: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 9),
    };

    const storage = this.getStorage();
    if (storage) {
      try {
        const existing = JSON.parse(storage.getItem(this.storageKey) || '[]');
        existing.push(item);
        storage.setItem(this.storageKey, JSON.stringify(existing));
      } catch {
        this.memoryQueue.push(item);
      }
    } else {
      this.memoryQueue.push(item);
    }

    return item;
  }

  getAll() {
    const storage = this.getStorage();
    if (storage) {
      try {
        return JSON.parse(storage.getItem(this.storageKey) || '[]');
      } catch {
        return [...this.memoryQueue];
      }
    }
    return [...this.memoryQueue];
  }

  clear() {
    const storage = this.getStorage();
    if (storage) {
      try {
        storage.removeItem(this.storageKey);
      } catch {}
    }
    this.memoryQueue = [];
  }

  count() {
    return this.getAll().length;
  }
}

export const offlineQueue = new OfflineSyncQueue();
export { OfflineSyncQueue };
