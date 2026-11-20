import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { goalService } from '../services/services';
import toast from 'react-hot-toast';

const GOAL_CATEGORIES = ['Emergency Fund', 'Travel', 'Vehicle', 'Home', 'Education', 'Gadgets', 'Investment', 'General'];

const GoalModal = ({ isOpen, onClose, goal, onSuccess }) => {
  const isEditing = Boolean(goal);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'General',
    notes: '',
  });

  useEffect(() => {
    if (goal) {
      setForm({
        title: goal.title || '',
        targetAmount: goal.targetAmount || '',
        currentAmount: goal.currentAmount || 0,
        deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : '',
        category: goal.category || 'General',
        notes: goal.notes || '',
      });
    } else {
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      setForm({
        title: '',
        targetAmount: '',
        currentAmount: 0,
        deadline: nextYear.toISOString().split('T')[0],
        category: 'General',
        notes: '',
      });
    }
  }, [goal, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.targetAmount || !form.deadline) {
      return toast.error('Please fill in all required fields');
    }

    setLoading(true);
    try {
      if (isEditing) {
        await goalService.update(goal._id, form);
        toast.success('Savings goal updated successfully!');
      } else {
        await goalService.create(form);
        toast.success('Savings goal created successfully!');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save goal');
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
            {isEditing ? 'Edit Savings Goal' : 'Create Savings Goal'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Goal Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. New Laptop, Emergency Fund"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Target Amount ($) *</label>
              <input
                type="number"
                min="1"
                step="0.01"
                required
                placeholder="2500"
                value={form.targetAmount}
                onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Current Saved ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                value={form.currentAmount}
                onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
              >
                {GOAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Target Date *</label>
              <input
                type="date"
                required
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label">Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Add any reminders or plans..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
