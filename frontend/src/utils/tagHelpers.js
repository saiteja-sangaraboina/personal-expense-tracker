/**
 * tagHelpers.js
 * Hashtag extraction, parsing, and multi-tag filtering utilities.
 */

/**
 * Extract hashtag tokens from text description.
 * @param {string} text
 * @returns {Array<string>} list of extracted tags without '#' symbol
 */
export function extractHashtags(text = '') {
  if (!text || typeof text !== 'string') return [];
  const matches = text.match(/#([a-zA-Z0-9_\-]+)/g);
  if (!matches) return [];
  return [...new Set(matches.map((m) => m.slice(1).toLowerCase()))];
}

/**
 * Filter transactions that include any or all of the specified tags.
 * @param {Array<{ tags?: Array<string>, description?: string }>} transactions
 * @param {Array<string>} searchTags
 * @param {'any' | 'all'} matchMode
 * @returns {Array} filtered transactions
 */
export function filterTransactionsByTags(transactions = [], searchTags = [], matchMode = 'any') {
  if (!searchTags || searchTags.length === 0) return transactions;
  const targetTags = searchTags.map((t) => t.toLowerCase().replace(/^#/, ''));

  return transactions.filter((t) => {
    const explicitTags = Array.isArray(t.tags) ? t.tags.map((x) => x.toLowerCase()) : [];
    const inlineTags = extractHashtags(t.description || '');
    const combined = new Set([...explicitTags, ...inlineTags]);

    if (matchMode === 'all') {
      return targetTags.every((tag) => combined.has(tag));
    }
    return targetTags.some((tag) => combined.has(tag));
  });
}
