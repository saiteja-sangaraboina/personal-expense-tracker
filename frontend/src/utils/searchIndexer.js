/**
 * searchIndexer.js - Advanced tokenized search and fuzzy filtering for transactions
 */

export const tokenizeQuery = (queryString = '') => {
  if (!queryString || typeof queryString !== 'string') {
    return { tokens: [], tags: [], minAmount: null, maxAmount: null };
  }

  const rawTokens = queryString.trim().toLowerCase().split(/\s+/);
  const tokens = [];
  const tags = [];
  let minAmount = null;
  let maxAmount = null;

  rawTokens.forEach((t) => {
    if (t.startsWith('#') && t.length > 1) {
      tags.push(t.slice(1));
    } else if (t.startsWith('>') && !isNaN(t.slice(1))) {
      minAmount = Number(t.slice(1));
    } else if (t.startsWith('<') && !isNaN(t.slice(1))) {
      maxAmount = Number(t.slice(1));
    } else if (t.length > 0) {
      tokens.push(t);
    }
  });

  return { tokens, tags, minAmount, maxAmount };
};

export const scoreTransactionMatch = (transaction, parsedQuery) => {
  if (!transaction) return 0;
  const { tokens, tags, minAmount, maxAmount } = parsedQuery;

  const amount = Number(transaction.amount) || 0;
  if (minAmount !== null && amount <= minAmount) return 0;
  if (maxAmount !== null && amount >= maxAmount) return 0;

  // If query is tag-only
  if (tags.length > 0) {
    const txTags = (transaction.tags || []).map((tag) =>
      typeof tag === 'string' ? tag.toLowerCase() : tag.name?.toLowerCase() || ''
    );
    const hasTagMatch = tags.some((qTag) => txTags.some((t) => t.includes(qTag)));
    if (!hasTagMatch) return 0;
  }

  // If no general tokens, and amount/tag match passed
  if (tokens.length === 0) return 10;

  let score = 0;
  const title = (transaction.title || transaction.description || '').toLowerCase();
  const category = (transaction.category || '').toLowerCase();
  const paymentMethod = (transaction.paymentMethod || '').toLowerCase();
  const notes = (transaction.notes || '').toLowerCase();

  for (const token of tokens) {
    if (title === token) score += 50;
    else if (title.includes(token)) score += 20;

    if (category === token) score += 30;
    else if (category.includes(token)) score += 15;

    if (paymentMethod.includes(token)) score += 10;
    if (notes.includes(token)) score += 10;
  }

  return score;
};

export const filterTransactionsByQuery = (transactions = [], queryString = '') => {
  if (!queryString || !queryString.trim()) return transactions;

  const parsed = tokenizeQuery(queryString);
  const scored = [];

  for (const tx of transactions) {
    const score = scoreTransactionMatch(tx, parsed);
    if (score > 0) {
      scored.push({ tx, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map((item) => item.tx);
};
