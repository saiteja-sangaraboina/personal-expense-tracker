import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight, Trash2, Pencil } from 'lucide-react';

const categoryColors = {
  Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Shopping: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Transportation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Education: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Entertainment: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Healthcare: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Bills: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Travel: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Salary: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Freelance: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';
  const catColor = categoryColors[transaction.category] || categoryColors.Other;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl px-2 transition-colors group">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isIncome ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          {isIncome
            ? <ArrowUpRight size={18} className="text-green-600 dark:text-green-400" />
            : <ArrowDownRight size={18} className="text-red-500 dark:text-red-400" />
          }
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {transaction.description || transaction.category}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor}`}>
              {transaction.category}
            </span>
            <span className="text-xs text-gray-400">
              {format(new Date(transaction.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {isIncome ? '+' : '-'}${Number(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>

        {(onEdit || onDelete) && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button onClick={() => onEdit(transaction)} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-indigo-600 transition-colors">
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(transaction._id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
