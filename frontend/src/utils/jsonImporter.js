/**
 * jsonImporter.js - Validates and extracts records from an exported backup archive
 */

export const validateBackupArchive = (jsonString) => {
  if (!jsonString || typeof jsonString !== 'string') {
    return { isValid: false, error: 'Empty file provided' };
  }

  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { isValid: false, error: 'Invalid JSON root object' };
    }

    if (!parsed.exportedAt) {
      return { isValid: false, error: 'Missing export timestamp metadata' };
    }

    const data = parsed.data || parsed;
    const transactions = Array.isArray(data.transactions) ? data.transactions : [];
    const budgets = Array.isArray(data.budgets) ? data.budgets : [];
    const goals = Array.isArray(data.goals) ? data.goals : [];
    const accounts = Array.isArray(data.accounts) ? data.accounts : [];

    return {
      isValid: true,
      exportedAt: parsed.exportedAt,
      accountName: parsed.account?.name || 'Unknown User',
      counts: {
        transactions: transactions.length,
        budgets: budgets.length,
        goals: goals.length,
        accounts: accounts.length,
      },
      data: {
        transactions,
        budgets,
        goals,
        accounts,
      },
    };
  } catch (err) {
    return { isValid: false, error: 'Malformed JSON syntax: ' + err.message };
  }
};
