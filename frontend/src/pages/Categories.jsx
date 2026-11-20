import { useState, useEffect } from 'react';
import { Tag, Plus, Pencil, Trash2 } from 'lucide-react';
import { categoryService } from '../services/services';
import CategoryModal from '../components/CategoryModal';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryService.getAll();
      setCategories(data.data || []);
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this custom category?')) return;
    try {
      await categoryService.remove(id);
      toast.success('Category removed');
      fetchCategories();
    } catch {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Custom Categories</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Create tailored tags to organize and label your transactions your way
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
          className="btn-primary text-sm flex items-center gap-1.5 py-2"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {categories.length === 0 && !loading ? (
        <EmptyState
          icon={Tag}
          title="No custom categories yet"
          description="Default system categories are always available. Add your own custom categories for more specific tagging!"
          actionLabel="Add Category"
          onAction={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {c.name}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {c.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(c);
                    setModalOpen(true);
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-indigo-600"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSuccess={fetchCategories}
      />
    </div>
  );
};

export default Categories;
