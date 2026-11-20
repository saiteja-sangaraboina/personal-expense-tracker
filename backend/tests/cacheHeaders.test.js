const setSecurityAndCacheHeaders = require('../middleware/cacheHeaders');

describe('Security & Cache Headers Middleware', () => {
  it('applies standard security and no-store cache headers to API requests', () => {
    const req = { path: '/api/transactions' };
    const headers = {};
    const res = {
      setHeader: jest.fn((key, value) => {
        headers[key] = value;
      }),
    };
    const next = jest.fn();

    setSecurityAndCacheHeaders(req, res, next);

    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Cache-Control']).toContain('no-store');
    expect(headers['Pragma']).toBe('no-cache');
    expect(next).toHaveBeenCalled();
  });

  it('omits no-store header for non-api static paths', () => {
    const req = { path: '/favicon.svg' };
    const headers = {};
    const res = {
      setHeader: jest.fn((key, value) => {
        headers[key] = value;
      }),
    };
    const next = jest.fn();

    setSecurityAndCacheHeaders(req, res, next);

    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['Cache-Control']).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });
});
