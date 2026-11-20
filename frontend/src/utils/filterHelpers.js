/**
 * Filters an array of transaction objects by type, category, date range, and search text
 */
export const filterTransactions = (transactions = [], { type, category, startDate, endDate, search }) => {
  return transactions.filter((t) => {
    if (type && t.type !== type) return false;
    if (category && category !== 'All' && t.category !== category) return false;

    if (startDate) {
      const itemDate = new Date(t.date).getTime();
      const start = new Date(startDate).getTime();
      if (itemDate < start) return false;
    }

    if (endDate) {
      const itemDate = new Date(t.date).getTime();
      const end = new Date(endDate).getTime();
      if (itemDate > end) return false;
    }

    if (search && search.trim()) {
      const term = search.toLowerCase();
      const descMatch = (t.description || '').toLowerCase().includes(term);
      const catMatch = (t.category || '').toLowerCase().includes(term);
      if (!descMatch && !catMatch) return false;
    }

    return true;
  });
};

/**
 * Sorts transactions by field and direction
 */
export const sortTransactions = (transactions = [], sortBy = 'date', order = 'desc') => {
  const sorted = [...transactions];
  sorted.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'date') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else if (sortBy === 'amount') {
      valA = Number(valA);
      valB = Number(valB);
    }

    if (order === 'asc') {
      return valA > valB ? 1 : -1;
    }
    return valA < valB ? 1 : -1;
  });
  return sorted;
};

/**
 * Paginates an array of items
 */
export const paginateItems = (items = [], page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  return items.slice(startIndex, startIndex + limit);
};
