import React, { useState } from 'react';
import { Bell, Mail, Webhook, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationSettingsCard = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [budgetWarnings, setBudgetWarnings] = useState(true);
  const [billReminders, setBillReminders] = useState(true);

  const handleSave = () => {
    toast.success('Notification preferences saved successfully!');
  };

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
          <Bell size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base">
            Notification & Delivery Channels
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Configure how and when you receive automated financial alerts
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-750 cursor-pointer">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-indigo-500" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Email Statements & Monthly Digest
            </span>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-750 cursor-pointer">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-amber-500" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Budget Overage Warning Thresholds (80%+)
            </span>
          </div>
          <input
            type="checkbox"
            checked={budgetWarnings}
            onChange={(e) => setBudgetWarnings(e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-750 cursor-pointer">
          <div className="flex items-center gap-2">
            <Webhook size={16} className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Upcoming Recurring Bill Reminders (3-Day Alert)
            </span>
          </div>
          <input
            type="checkbox"
            checked={billReminders}
            onChange={(e) => setBillReminders(e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
        >
          <Check size={14} /> Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettingsCard;
