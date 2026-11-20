const mongoose = require('mongoose');
const Webhook = require('../models/Webhook');

describe('Webhook Mongoose Model', () => {
  it('validates schema requirements for Webhook', () => {
    const invalidWebhook = new Webhook({});
    const error = invalidWebhook.validateSync();

    expect(error.errors.userId).toBeDefined();
    expect(error.errors.url).toBeDefined();
  });

  it('populates default events and random secret', () => {
    const webhook = new Webhook({
      userId: new mongoose.Types.ObjectId(),
      url: 'https://example.com/webhook',
    });

    expect(webhook.secret).toBeTruthy();
    expect(webhook.events).toContain('BUDGET_EXCEEDED');
    expect(webhook.isActive).toBe(true);
  });
});
