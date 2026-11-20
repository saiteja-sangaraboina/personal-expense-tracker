import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '../services/services';
import toast from 'react-hot-toast';

export const useTransactions = (initialFilters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== 'All')
      );
      const { data } = await transactionService.getAll(params);
      setTransactions(data.data);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (formData) => {
    const { data } = await transactionService.create(formData);
    fetchTransactions();
    return data;
  };

  const updateTransaction = async (id, formData) => {
    const { data } = await transactionService.update(id, formData);
    fetchTransactions();
    return data;
  };

  const removeTransaction = async (id) => {
    await transactionService.remove(id);
    fetchTransactions();
  };

  return {
    transactions,
    loading,
    total,
    pages,
    filters,
    setFilters,
    refetch: fetchTransactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
  };
};
