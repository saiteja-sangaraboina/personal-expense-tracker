/**
 * webhookSigner.js - Generates HMAC-SHA256 signature for outgoing webhook notifications
 */
const crypto = require('crypto');

const signWebhookPayload = (payload, secret) => {
  if (!secret) return '';
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

const verifyWebhookSignature = (payload, secret, receivedSignature) => {
  if (!secret || !receivedSignature) return false;
  const expected = signWebhookPayload(payload, secret);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedSignature));
};

module.exports = {
  signWebhookPayload,
  verifyWebhookSignature,
};
