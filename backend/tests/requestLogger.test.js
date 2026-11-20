const requestLogger = require('../middleware/requestLogger');

describe('Request Logger Middleware', () => {
  it('calls next() and attaches finish listener to response', () => {
    const req = {
      method: 'GET',
      originalUrl: '/api/transactions',
      headers: { 'user-agent': 'Jest' },
    };

    let finishHandler = null;
    const res = {
      statusCode: 200,
      on: (event, handler) => {
        if (event === 'finish') finishHandler = handler;
      },
    };

    const next = jest.fn();

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(typeof finishHandler).toBe('function');
    // Invoking handler directly should not throw
    expect(() => finishHandler()).not.toThrow();
  });
});
