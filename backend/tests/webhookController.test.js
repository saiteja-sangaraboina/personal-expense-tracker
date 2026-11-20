const { createWebhook } = require('../controllers/webhookController');

describe('webhookController validation', () => {
  it('returns 400 when url is missing from creation request', async () => {
    const req = {
      body: {},
      user: { _id: 'user_123' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await createWebhook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('destination URL'),
      })
    );
  });
});
