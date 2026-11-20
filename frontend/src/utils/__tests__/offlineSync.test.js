import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { OfflineSyncQueue } from '../offlineSync';

class LocalStorageMock {
  constructor() {
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
  clear() {
    this.store = {};
  }
}

describe('offlineSync queue utility', () => {
  beforeAll(() => {
    globalThis.localStorage = new LocalStorageMock();
  });

  let queue;

  beforeEach(() => {
    queue = new OfflineSyncQueue('test_offline_queue');
    queue.clear();
  });

  it('enqueues an offline action and assigns an id and timestamp', () => {
    const action = queue.enqueue({ type: 'CREATE_TRANSACTION', payload: { amount: 50 } });

    expect(action.id).toBeTruthy();
    expect(action.queuedAt).toBeTruthy();
    expect(queue.count()).toBe(1);
  });

  it('retrieves all enqueued actions and clears them', () => {
    queue.enqueue({ type: 'OP_1' });
    queue.enqueue({ type: 'OP_2' });

    expect(queue.count()).toBe(2);
    const items = queue.getAll();
    expect(items.length).toBe(2);
    expect(items[0].type).toBe('OP_1');

    queue.clear();
    expect(queue.count()).toBe(0);
  });
});
