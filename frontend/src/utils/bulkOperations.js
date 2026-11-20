/**
 * bulkOperations.js - Client-side batch operations for managing multiple transactions simultaneously
 */

export const bulkUpdateCategory = (transactions = [], targetIds = [], newCategory = 'Other') => {
  if (!Array.isArray(transactions) || !Array.isArray(targetIds)) return transactions;
  const idSet = new Set(targetIds.map(String));

  return transactions.map((t) => {
    if (idSet.has(String(t._id || t.id))) {
      return { ...t, category: newCategory };
    }
    return t;
  });
};

export const bulkAddTag = (transactions = [], targetIds = [], tagToAdd = '') => {
  if (!Array.isArray(transactions) || !tagToAdd) return transactions;
  const cleanTag = tagToAdd.trim().replace(/^#/, '');
  const idSet = new Set(targetIds.map(String));

  return transactions.map((t) => {
    if (idSet.has(String(t._id || t.id))) {
      const existingTags = Array.isArray(t.tags) ? t.tags : [];
      if (!existingTags.includes(cleanTag)) {
        return { ...t, tags: [...existingTags, cleanTag] };
      }
    }
    return t;
  });
};

export const bulkRemoveTransactions = (transactions = [], targetIds = []) => {
  if (!Array.isArray(transactions) || !Array.isArray(targetIds)) return transactions;
  const idSet = new Set(targetIds.map(String));
  return transactions.filter((t) => !idSet.has(String(t._id || t.id)));
};
