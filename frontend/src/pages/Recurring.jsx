import { useState, useEffect } from 'react';
import { CalendarClock, Plus, Pencil, Trash2, CheckCircle2, PauseCircle } from 'lucide-react';
import { recurringService } from '../services/services';
import RecurringModal from '../components/RecurringModal';
import BillReminderCard from '../components/BillReminderCard';
import EmptyState from '../components/EmptyState';
import { SkeletonRow } from '../components/LoadingSkeleton';
import toast from 'react-hot-toast';

const Recurring = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await recurringService.getAll();
      setItems(data.data || []);
    } catch {
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this recurring subscription?')) return;
    try {
      await recurringService.remove(id);
      toast.success('Subscription deleted');
      fetchItems();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await recurringService.update(item._id, { isActive: !item.isActive });
      toast.success(item.isActive ? 'Subscription paused' : 'Subscription resumed');
      fetchItems();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const totalMonthlyCommitment = items
    .filter((i) => i.isActive)
    .reduce((sum, item) => {
      let multiplier = 1;
      if (item.frequency === 'yearly') multiplier = 1 / 12;
      if (item.frequency === 'weekly') multiplier = 4.33;
      return sum + Number(item.amount) * multiplier;
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Subscriptions & Bills
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Keep track of upcoming renewals, software licenses, and recurring charges
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="text-xs text-gray-400 block">Monthly Active Total</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              ${totalMonthlyCommitment.toFixed(2)}/mo
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            className="btn-primary text-sm flex items-center gap-1.5 py-2"
          >
            <Plus size={16} /> Add Subscription
          </button>
        </div>
      </div>

      <BillReminderCard bills={items} />

      {loading ? (
        <div className="card space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No recurring bills or subscriptions"
          description="Add your recurring expenses like Netflix, Spotify, gym memberships, and rent to plan ahead."
          actionLabel="Add Subscription"
          onAction={() => {
            setSelectedItem(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div className="card divide-y divide-gray-100 dark:divide-gray-700/60 p-0 overflow-hidden">
          {items.map((item) => (
            <div
              key={item._id}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                !item.isActive ? 'opacity-60 bg-gray-50/50 dark:bg-gray-800/40' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleStatus(item)}
                  title={item.isActive ? 'Click to Pause' : 'Click to Activate'}
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {item.isActive ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : (
                    <PauseCircle size={20} className="text-gray-400" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {item.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Next due: {new Date(item.nextDueDate).toLocaleDateString()} · {item.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ${Number(item.amount).toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RecurringModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        recurring={selectedItem}
        onSuccess={fetchItems}
      />
    </div>
  );
};

export default Recurring;
