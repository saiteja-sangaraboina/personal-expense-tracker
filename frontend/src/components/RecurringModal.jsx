import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { recurringService } from '../services/services';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Bills', 'Entertainment', 'Education', 'Food', 'Healthcare', 'Shopping', 'Transportation', 'Salary', 'Other'
];

const RecurringModal = ({ isOpen, onClose, recurring, onSuccess }) => {
  const isEditing = Boolean(recurring);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'expense',
    amount: '',
    category: 'Bills',
    frequency: 'monthly',
    nextDueDate: '',
    autoRecord: false,
    isActive: true,
  });

  useEffect(() => {
    if (recurring) {
      setForm({
        title: recurring.title || '',
        type: recurring.type || 'expense',
        amount: recurring.amount || '',
        category: recurring.category || 'Bills',
        frequency: recurring.frequency || 'monthly',
        nextDueDate: recurring.nextDueDate ? new Date(recurring.nextDueDate).toISOString().split('T')[0] : '',
        autoRecord: recurring.autoRecord || false,
        isActive: recurring.isActive !== undefined ? recurring.isActive : true,
      });
    } else {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setForm({
        title: '',
        type: 'expense',
        amount: '',
        category: 'Bills',
        frequency: 'monthly',
        nextDueDate: nextMonth.toISOString().split('T')[0],
        autoRecord: false,
        isActive: true,
      });
    }
  }, [recurring, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.nextDueDate) {
      return toast.error('Please fill in all required fields');
    }

    setLoading(true);
    try {
      if (isEditing) {
        await recurringService.update(recurring._id, form);
        toast.success('Subscription updated successfully!');
      } else {
        await recurringService.create(form);
        toast.success('Subscription created successfully!');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save recurring item');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Subscription' : 'Add Subscription / Bill'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Netflix, Spotify, Gym, Rent"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Amount ($) *</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                placeholder="14.99"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Frequency</label>
              <select
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                className="input-field"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="label">Next Due Date *</label>
              <input
                type="date"
                required
                value={form.nextDueDate}
                onChange={(e) => setForm({ ...form, nextDueDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActiveCheck"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isActiveCheck" className="text-sm text-gray-700 dark:text-gray-300 select-none">
              Active subscription
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecurringModal;
