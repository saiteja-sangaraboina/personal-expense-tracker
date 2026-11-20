/**
 * billSplitter.js
 * Bill and shared expense calculator supporting equal, custom exact, and percentage splits with tip & tax.
 */

/**
 * Calculate equal split per participant.
 * @param {number} totalAmount
 * @param {number} participantCount
 * @param {number} tipPercent - default 0
 * @param {number} taxPercent - default 0
 * @returns {{
 *   subtotal: number,
 *   tipAmount: number,
 *   taxAmount: number,
 *   grandTotal: number,
 *   perPerson: number
 * }}
 */
export function splitBillEqually(totalAmount = 0, participantCount = 1, tipPercent = 0, taxPercent = 0) {
  const subtotal = Math.max(0, Number(totalAmount) || 0);
  const people = Math.max(1, Math.round(Number(participantCount) || 1));
  const tipRate = Math.max(0, Number(tipPercent) || 0) / 100;
  const taxRate = Math.max(0, Number(taxPercent) || 0) / 100;

  const tipAmount = Math.round(subtotal * tipRate * 100) / 100;
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const grandTotal = Math.round((subtotal + tipAmount + taxAmount) * 100) / 100;
  const perPerson = Math.round((grandTotal / people) * 100) / 100;

  return {
    subtotal,
    tipAmount,
    taxAmount,
    grandTotal,
    perPerson,
  };
}

/**
 * Calculate custom shares by percentages.
 * @param {number} grandTotal
 * @param {Array<{ name: string, percentage: number }>} shares
 * @returns {Array<{ name: string, percentage: number, amount: number }>}
 */
export function splitBillByPercentages(grandTotal = 0, shares = []) {
  const total = Math.max(0, Number(grandTotal) || 0);
  return shares.map((s) => {
    const pct = Math.max(0, Number(s.percentage) || 0);
    const amount = Math.round((total * (pct / 100)) * 100) / 100;
    return {
      name: s.name || 'Friend',
      percentage: pct,
      amount,
    };
  });
}
