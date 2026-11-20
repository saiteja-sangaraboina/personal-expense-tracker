import { useState, useEffect } from 'react';
import { Target, Plus, Pencil, Trash2, Calendar, Award } from 'lucide-react';
import { goalService } from '../services/services';
import GoalModal from '../components/GoalModal';
import FireCalculatorCard from '../components/FireCalculatorCard';
import InvestmentGrowthCard from '../components/InvestmentGrowthCard';
import EmptyState from '../components/EmptyState';
import { SkeletonCard } from '../components/LoadingSkeleton';
import toast from 'react-hot-toast';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const { data } = await goalService.getAll();
      setGoals(data.data || []);
    } catch {
      toast.error('Failed to load savings goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    try {
      await goalService.remove(id);
      toast.success('Savings goal deleted');
      fetchGoals();
    } catch {
      toast.error('Failed to delete goal');
    }
  };

  const handleQuickAddFunds = async (goal) => {
    const input = prompt(`Enter deposit amount for "${goal.title}":`, '50');
    if (!input || isNaN(input) || Number(input) <= 0) return;

    try {
      const newAmount = Number(goal.currentAmount) + Number(input);
      await goalService.update(goal._id, { currentAmount: newAmount });
      toast.success(`Added $${Number(input).toFixed(2)} to ${goal.title}!`);
      fetchGoals();
    } catch {
      toast.error('Failed to update funds');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Savings Goals</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Set and track targets for long-term purchases, investments, and emergencies
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedGoal(null);
            setIsModalOpen(true);
          }}
          className="btn-primary text-sm flex items-center gap-1.5 py-2"
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No savings goals set"
          description="Create your first financial target to monitor your savings progress effortlessly."
          actionLabel="Create a Goal"
          onAction={() => {
            setSelectedGoal(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {goals.map((goal) => {
            const isCompleted = goal.currentAmount >= goal.targetAmount;
            return (
              <div
                key={goal._id}
                className={`card relative overflow-hidden transition-all duration-200 hover:shadow-md ${
                  isCompleted ? 'border-emerald-200 dark:border-emerald-800' : ''
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Award size={12} /> Target Met!
                  </div>
                )}

                <div className="flex items-start justify-between pr-20">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                      {goal.category}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1.5">
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 mb-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      ${Number(goal.currentAmount || 0).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 ml-1.5">
                      of ${Number(goal.targetAmount).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {goal.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-500'
                    }`}
                    style={{ width: `${Math.min(goal.percentage || 0, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                  <span>${Math.max(0, goal.targetAmount - goal.currentAmount).toLocaleString()} left</span>
                </div>

                {goal.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4 line-clamp-1">
                    "{goal.notes}"
                  </p>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                  <button
                    onClick={() => handleQuickAddFunds(goal)}
                    className="flex-1 btn-secondary text-xs py-1.5 flex items-center justify-center gap-1"
                  >
                    <Plus size={13} /> Deposit
                  </button>
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FIRE Independence Milestone Projection */}
      <FireCalculatorCard />

      {/* Compound Interest & Portfolio Simulator */}
      <InvestmentGrowthCard />

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
        onSuccess={fetchGoals}
      />
    </div>
  );
};

export default Goals;
