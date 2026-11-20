import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { categoryService } from '../services/services';
import toast from 'react-hot-toast';

const PRESET_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

const CategoryModal = ({ isOpen, onClose, category, onSuccess }) => {
  const isEditing = Boolean(category);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'expense',
    color: '#6366f1',
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || '',
        type: category.type || 'expense',
        color: category.color || '#6366f1',
      });
    } else {
      setForm({ name: '', type: 'expense', color: '#6366f1' });
    }
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Category name is required');

    setLoading(true);
    try {
      if (isEditing) {
        await categoryService.update(category._id, form);
        toast.success('Category updated successfully!');
      } else {
        await categoryService.create(form);
        toast.success('Category created successfully!');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Category' : 'Create Custom Category'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Pet Care, Gaming"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Type</label>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    form.type === t
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Badge Color</label>
            <div className="flex items-center gap-2 mt-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-indigo-500' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving...' : isEditing ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
