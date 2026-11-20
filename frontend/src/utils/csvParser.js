/**
 * Parses raw CSV string into an array of transaction candidate objects
 * @param {string} csvText
 * @returns {Array<{ date: string, type: string, amount: number, category: string, description: string }>}
 */
export const parseTransactionCsv = (csvText) => {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

  // Find column indices
  const dateIdx = headers.findIndex((h) => h.includes('date') || h.includes('time'));
  const amountIdx = headers.findIndex((h) => h.includes('amount') || h.includes('price') || h.includes('cost'));
  const descIdx = headers.findIndex((h) => h.includes('desc') || h.includes('title') || h.includes('note') || h.includes('memo') || h.includes('payee'));
  const catIdx = headers.findIndex((h) => h.includes('cat') || h.includes('type') || h.includes('tag'));
  const typeIdx = headers.findIndex((h) => h === 'type' || h.includes('transaction type'));

  const parsedResults = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((col) => col.trim().replace(/^["']|["']$/g, ''));

    const rawAmount = amountIdx !== -1 ? cols[amountIdx] : null;
    const cleanAmount = rawAmount ? Math.abs(parseFloat(rawAmount.replace(/[^0-9.-]+/g, ''))) : 0;

    if (!cleanAmount || isNaN(cleanAmount)) continue;

    // Detect income vs expense
    let type = 'expense';
    if (typeIdx !== -1 && cols[typeIdx]) {
      const t = cols[typeIdx].toLowerCase();
      if (t.includes('income') || t.includes('credit') || t.includes('deposit')) {
        type = 'income';
      }
    } else if (rawAmount && (rawAmount.startsWith('+') || parseFloat(rawAmount) > 0 && headers[amountIdx]?.includes('credit'))) {
      type = 'income';
    }

    const rawDate = dateIdx !== -1 ? cols[dateIdx] : new Date().toISOString().split('T')[0];
    const parsedDate = !isNaN(new Date(rawDate).getTime())
      ? new Date(rawDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const description = descIdx !== -1 && cols[descIdx] ? cols[descIdx] : 'Imported transaction';
    const category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : (type === 'income' ? 'Salary' : 'Other');

    parsedResults.push({
      date: parsedDate,
      type,
      amount: cleanAmount,
      category,
      description,
    });
  }

  return parsedResults;
};
