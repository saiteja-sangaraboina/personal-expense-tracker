import { useState, useEffect, useRef } from 'react';
import { Bell, AlertTriangle, Calendar, Check, X } from 'lucide-react';
import { budgetService, recurringService } from '../services/services';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchAlerts();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const [budgetsRes, recurringRes] = await Promise.all([
        budgetService.getAll({ month: now.getMonth() + 1, year: now.getFullYear() }),
        recurringService.getAll(),
      ]);

      const alerts = [];

      // Budget alerts
      (budgetsRes.data?.data || []).forEach((b) => {
        if (b.isOverBudget) {
          alerts.push({
            id: `b-over-${b._id}`,
            type: 'danger',
            title: `Budget Exceeded: ${b.category}`,
            message: `You've spent $${b.spent.toFixed(2)} of your $${b.monthlyLimit.toFixed(2)} limit.`,
            time: 'This month',
          });
        } else if (b.isNearLimit) {
          alerts.push({
            id: `b-near-${b._id}`,
            type: 'warning',
            title: `Approaching Budget: ${b.category}`,
            message: `${b.percentage}% of your limit reached ($${b.remaining.toFixed(2)} left).`,
            time: 'This month',
          });
        }
      });

      // Upcoming bill alerts (due within 5 days)
      const fiveDaysFromNow = new Date();
      fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

      (recurringRes.data?.data || [])
        .filter((r) => r.isActive)
        .forEach((r) => {
          const dueDate = new Date(r.nextDueDate);
          if (dueDate >= now && dueDate <= fiveDaysFromNow) {
            alerts.push({
              id: `r-due-${r._id}`,
              type: 'info',
              title: `Upcoming Bill: ${r.title}`,
              message: `$${Number(r.amount).toFixed(2)} due on ${dueDate.toLocaleDateString()}.`,
              time: 'Soon',
            });
          }
        });

      setNotifications(alerts);
    } catch {
      // Gracefully silent on background alert fetch
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
      >
        <Bell size={18} />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3.5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Alerts & Reminders
            </h4>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 font-bold px-2 py-0.5 rounded-full">
              {notifications.length} New
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/50">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                <Check size={20} className="mx-auto text-emerald-500 mb-1" />
                No pending budget alerts or upcoming bills!
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-3 text-xs hover:bg-gray-50 dark:hover:bg-gray-700/30 flex gap-2.5 items-start">
                  <div className="pt-0.5">
                    {n.type === 'danger' && <AlertTriangle size={15} className="text-red-500" />}
                    {n.type === 'warning' && <AlertTriangle size={15} className="text-amber-500" />}
                    {n.type === 'info' && <Calendar size={15} className="text-indigo-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{n.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">{n.message}</p>
                  </div>
                  <button onClick={() => handleDismiss(n.id)} className="text-gray-400 hover:text-gray-600">
                    <X size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
