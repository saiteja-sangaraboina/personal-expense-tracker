import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { transactionService } from '../services/services';
import toast from 'react-hot-toast';

const EXPENSE_CATEGORIES = ['Food','Shopping','Transportation','Education','Entertainment','Healthcare','Bills','Travel','Other'];
const INCOME_CATEGORIES = ['Salary','Freelance','Business','Investment','Gift','Other'];

const TransactionModal = ({ isOpen, onClose, transaction, onSuccess }) => {
  const isEditing = !!transaction;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description || '',
        date: new Date(transaction.date).toISOString().split('T')[0],
      });
    } else {
      setForm({ type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
    }
  }, [transaction, isOpen]);

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return toast.error('Please fill all required fields');
    setLoading(true);
    try {
      if (isEditing) {
        await transactionService.update(transaction._id, form);
        toast.success('Transaction updated!');
      } else {
        await transactionService.create(form);
        toast.success('Transaction added!');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
            {['expense', 'income'].map((t) => (
              <button key={t} type="button"
                onClick={() => setForm({ ...form, type: t, category: '' })}
                className={`flex-1 py-2.5 text-sm font-medium capitalize transition-all ${
                  form.type === t
                    ? t === 'expense' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="label">Amount *</label>
            <input type="number" step="0.01" min="0.01" required placeholder="0.00"
              value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="input-field" />
          </div>

          <div>
            <label className="label">Category *</label>
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Description</label>
            <input type="text" placeholder="Optional note..." value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" />
          </div>

          <div>
            <label className="label">Date *</label>
            <input type="date" required value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
