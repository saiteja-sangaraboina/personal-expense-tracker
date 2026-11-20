const { sanitizeString, validateTransaction } = require('../middleware/validator');

describe('Request Validator Middleware', () => {
  it('sanitizes strings and strips embedded HTML tags', () => {
    const malicious = '<script>alert("hack")</script>Dinner at Bistro';
    const cleaned = sanitizeString(malicious);

    expect(cleaned).toBe('alert("hack")Dinner at Bistro');
    expect(cleaned).not.toContain('<script>');
  });

  it('rejects transaction payloads missing title', () => {
    const req = { body: { amount: 50, type: 'expense' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('title'),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects non-positive transaction amounts', () => {
    const req = { body: { title: 'Lunch', amount: -25, type: 'expense' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    validateTransaction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('passes validation for valid transaction payload and calls next()', () => {
    const req = {
      body: {
        title: 'Weekly Groceries',
        amount: 85.5,
        type: 'expense',
        category: 'Food',
      },
    };
    const res = {};
    const next = jest.fn();

    validateTransaction(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
