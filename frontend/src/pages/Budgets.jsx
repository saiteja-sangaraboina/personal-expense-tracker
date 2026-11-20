import { useEffect, useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { budgetService } from '../services/services';
import BudgetSuggestionCard from '../components/BudgetSuggestionCard';
import BudgetUtilizationCard from '../components/BudgetUtilizationCard';
import BudgetAllocationChart from '../components/BudgetAllocationChart';
import toast from 'react-hot-toast';

const CATEGORIES = ['Food','Shopping','Transportation','Education','Entertainment','Healthcare','Bills','Travel','Other'];

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const now = new Date();
  const [form, setForm] = useState({
    category: '', monthlyLimit: '', month: now.getMonth() + 1, year: now.getFullYear(), alertThreshold: 80,
  });

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const { data } = await budgetService.getAll({ month: now.getMonth() + 1, year: now.getFullYear() });
      setBudgets(data.data);
    } catch { toast.error('Failed to load budgets'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBudgets(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await budgetService.create(form);
      toast.success('Budget created!');
      setShowForm(false);
      fetchBudgets();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create budget'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this budget?')) return;
    try {
      await budgetService.remove(id);
      toast.success('Budget deleted');
      fetchBudgets();
    } catch { toast.error('Failed to delete'); }
  };

  const handleApplySuggestion = (suggestion) => {
    setForm((prev) => ({
      ...prev,
      category: suggestion.category,
      monthlyLimit: suggestion.suggestedLimit,
    }));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const smartSuggestions = [
    { category: 'Food', averageSpent: 380, suggestedLimit: 420, transactionCount: 14 },
    { category: 'Shopping', averageSpent: 220, suggestedLimit: 250, transactionCount: 8 },
    { category: 'Transportation', averageSpent: 140, suggestedLimit: 160, transactionCount: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {now.toLocaleString('default', { month: 'long', year: 'numeric' })} budgets
        </p>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm flex items-center gap-1.5 py-2">
          <Plus size={15} /> Set Budget
        </button>
      </div>

      <BudgetUtilizationCard budgets={budgets} />

      {/* Allocation Doughnut Visualizer */}
      <BudgetAllocationChart budgets={budgets} />

      {/* Form */}
      {showForm && (
        <div className="card border-2 border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">New Budget</h3>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select required className="input-field" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Monthly Limit ($) *</label>
              <input type="number" min="1" required className="input-field" placeholder="e.g. 500"
                value={form.monthlyLimit} onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })} />
            </div>
            <div>
              <label className="label">Alert Threshold (%)</label>
              <input type="number" min="1" max="100" className="input-field"
                value={form.alertThreshold} onChange={(e) => setForm({ ...form, alertThreshold: e.target.value })} />
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">Create Budget</button>
            </div>
          </form>
        </div>
      )}

      {/* Budget Cards */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : budgets.length === 0 ? (
        <div className="card text-center py-16 text-gray-400">
          <p className="text-lg mb-2">No budgets set for this month</p>
          <p className="text-sm">Create a budget to start tracking your spending.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {budgets.map((b) => (
            <div key={b._id} className={`card border-2 ${b.isOverBudget ? 'border-red-200 dark:border-red-800' : b.isNearLimit ? 'border-amber-200 dark:border-amber-800' : 'border-transparent'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{b.category}</h3>
                  <p className="text-xs text-gray-500">${b.spent.toFixed(2)} of ${b.monthlyLimit.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {b.isOverBudget ? <AlertTriangle size={16} className="text-red-500" /> : <CheckCircle size={16} className="text-green-500" />}
                  <button onClick={() => handleDelete(b._id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${b.isOverBudget ? 'bg-red-500' : b.isNearLimit ? 'bg-amber-500' : 'bg-indigo-500'}`}
                  style={{ width: `${Math.min(b.percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{b.percentage}% used</span>
                <span>${b.remaining.toFixed(2)} left</span>
              </div>
              {b.isOverBudget && <p className="text-xs text-red-500 mt-2 font-medium">⚠️ Over budget!</p>}
              {b.isNearLimit && !b.isOverBudget && <p className="text-xs text-amber-600 mt-2 font-medium">⚡ Approaching limit</p>}
            </div>
          ))}
        </div>
      )}

      <BudgetSuggestionCard
        suggestions={smartSuggestions}
        onApplySuggestion={handleApplySuggestion}
      />
    </div>
  );
};

export default Budgets;
