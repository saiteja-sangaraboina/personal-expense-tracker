/**
 * receiptGenerator.js - Formats transactions into structured printable voucher receipts
 */

export const generateReceiptVoucherHtml = (transaction) => {
  if (!transaction) return '';
  const dateStr = transaction.date ? new Date(transaction.date).toLocaleDateString() : new Date().toLocaleDateString();
  const amt = Number(transaction.amount) || 0;
  const voucherId = `REC-${Math.abs(hashString(transaction._id || transaction.title || '0')).toString().padStart(8, '0')}`;

  return `
    <div style="font-family: monospace; max-width: 380px; padding: 24px; border: 1px dashed #ccc; background: #fff; color: #111;">
      <div style="text-align: center; border-bottom: 2px dashed #999; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Expense Receipt Voucher</h2>
        <p style="margin: 4px 0 0; font-size: 12px; color: #666;">Voucher #: ${voucherId}</p>
        <p style="margin: 2px 0 0; font-size: 11px; color: #888;">Date: ${dateStr}</p>
      </div>

      <div style="margin-bottom: 16px; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Item / Title:</span>
          <strong>${escapeHtml(transaction.title || transaction.description || 'General Expense')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Category:</span>
          <span>${escapeHtml(transaction.category || 'General')}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Type:</span>
          <span style="text-transform: uppercase;">${escapeHtml(transaction.type || 'expense')}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Payment Method:</span>
          <span>${escapeHtml(transaction.paymentMethod || 'Default')}</span>
        </div>
      </div>

      <div style="border-top: 2px dashed #999; padding-top: 12px; display: flex; justify-content: space-between; font-size: 16px; font-weight: bold;">
        <span>TOTAL:</span>
        <span>$${amt.toFixed(2)}</span>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #888;">
        Verified by Personal Expense Tracker
      </div>
    </div>
  `;
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

const escapeHtml = (text) => {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};
