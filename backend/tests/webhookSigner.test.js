const { signWebhookPayload, verifyWebhookSignature } = require('../utils/webhookSigner');

describe('webhookSigner utility', () => {
  const secret = 'super_secret_signing_key_123';
  const payload = { event: 'BUDGET_EXCEEDED', amount: 450 };

  it('generates consistent HMAC-SHA256 signature for given payload and secret', () => {
    const sig1 = signWebhookPayload(payload, secret);
    const sig2 = signWebhookPayload(payload, secret);

    expect(sig1).toBeTruthy();
    expect(sig1).toBe(sig2);
  });

  it('validates matching signatures and rejects tampered ones', () => {
    const validSig = signWebhookPayload(payload, secret);
    expect(verifyWebhookSignature(payload, secret, validSig)).toBe(true);

    const tamperedPayload = { event: 'BUDGET_EXCEEDED', amount: 9999 };
    expect(verifyWebhookSignature(tamperedPayload, secret, validSig)).toBe(false);
  });
});
