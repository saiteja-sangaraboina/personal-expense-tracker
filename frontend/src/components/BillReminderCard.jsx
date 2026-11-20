import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';
import { analyzeUpcomingBills } from '../utils/reminderEngine';

const BillReminderCard = ({ bills = [] }) => {
  const analysis = analyzeUpcomingBills(bills);

  if (!analysis.bills.length) return null;

  const urgentBills = analysis.bills.filter(
    (b) => b.urgency === 'overdue' || b.urgency === 'due-today' || b.urgency === 'due-soon'
  );

  return (
    <div className="card border border-amber-200/60 dark:border-amber-900/40 bg-gradient-to-r from-amber-50/50 via-white to-white dark:from-amber-950/10 dark:via-gray-800 dark:to-gray-800 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded-xl">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Upcoming Bill Reminders
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {analysis.overdueCount > 0 ? (
                <span className="text-red-500 font-semibold">{analysis.overdueCount} overdue bill(s)</span>
              ) : (
                'All renewal deadlines are on track'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right px-3 py-1 bg-white dark:bg-gray-700/60 rounded-lg border border-gray-100 dark:border-gray-700">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Due in 7 Days</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ${analysis.dueWithin7DaysTotal.toFixed(2)}
            </span>
          </div>
          <div className="text-right px-3 py-1 bg-white dark:bg-gray-700/60 rounded-lg border border-gray-100 dark:border-gray-700">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Due in 30 Days</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              ${analysis.dueWithin30DaysTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {urgentBills.length > 0 ? (
          urgentBills.slice(0, 4).map((bill, idx) => {
            const isOverdue = bill.urgency === 'overdue';
            const isToday = bill.urgency === 'due-today';

            return (
              <div
                key={bill._id || idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-gray-750/70 border border-gray-100 dark:border-gray-700/80 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      isOverdue
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                        : isToday
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                        : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    }`}
                  >
                    {bill.statusLabel}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                      {bill.name}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">
                      {bill.category} · {bill.frequency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    ${bill.amountNumeric.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center gap-2 p-3 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-medium">
            <CheckCircle2 size={16} /> No urgent bills due within the next 3 days!
          </div>
        )}
      </div>
    </div>
  );
};

export default BillReminderCard;
