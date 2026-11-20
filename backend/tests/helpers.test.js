const {
  parsePagination,
  buildDateFilter,
  stripUndefined,
  startOfMonth,
  formatCurrency,
  capitalize,
  randomToken,
  clamp,
} = require('../utils/helpers');

describe('Backend Helpers Utility', () => {
  describe('parsePagination', () => {
    it('returns default page and limit when query is empty', () => {
      const res = parsePagination({});
      expect(res).toEqual({ page: 1, limit: 20, skip: 0 });
    });

    it('parses valid page and limit values', () => {
      const res = parsePagination({ page: '3', limit: '15' });
      expect(res).toEqual({ page: 3, limit: 15, skip: 30 });
    });

    it('caps limit at 100 max', () => {
      const res = parsePagination({ page: '1', limit: '500' });
      expect(res.limit).toBe(100);
    });
  });

  describe('buildDateFilter', () => {
    it('returns empty object when no dates provided', () => {
      expect(buildDateFilter({})).toEqual({});
    });

    it('builds date range filter for startDate and endDate', () => {
      const filter = buildDateFilter({
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      });
      expect(filter.date).toBeDefined();
      expect(filter.date.$gte).toBeInstanceOf(Date);
      expect(filter.date.$lte).toBeInstanceOf(Date);
    });
  });

  describe('stripUndefined', () => {
    it('removes null and undefined properties', () => {
      const obj = { a: 1, b: undefined, c: null, d: 'test' };
      expect(stripUndefined(obj)).toEqual({ a: 1, d: 'test' });
    });
  });

  describe('formatCurrency and capitalize', () => {
    it('formats amount to USD currency', () => {
      expect(formatCurrency(1234.5)).toBe('$1,234.50');
    });

    it('capitalizes words correctly', () => {
      expect(capitalize('groceries')).toBe('Groceries');
      expect(capitalize('')).toBe('');
    });
  });

  describe('randomToken and clamp', () => {
    it('generates random alphanumeric token of specific length', () => {
      const token = randomToken(16);
      expect(token).toHaveLength(16);
      expect(typeof token).toBe('string');
    });

    it('clamps numbers within given bounds', () => {
      expect(clamp(150, 0, 100)).toBe(100);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(50, 0, 100)).toBe(50);
    });
  });
});
