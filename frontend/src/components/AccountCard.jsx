import React from 'react';
import { Building2, CreditCard, Banknote, PiggyBank, TrendingUp, Coins, Check } from 'lucide-react';
import { maskAccountId } from '../utils/accountHelpers';

const iconMap = {
  bank: Building2,
  cash: Banknote,
  credit_card: CreditCard,
  investment: TrendingUp,
  savings: PiggyBank,
  crypto: Coins,
};

const AccountCard = ({ account, onSelect, isSelected = false }) => {
  const Icon = iconMap[account.type] || Building2;
  const isCredit = account.type === 'credit_card';

  return (
    <div
      onClick={() => onSelect && onSelect(account)}
      className={`card relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 hover:shadow-md ${
        isSelected
          ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/30 dark:bg-slate-800'
          : 'border-transparent bg-white dark:bg-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: account.color || '#6366f1' }}
          >
            <Icon size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {account.name}
            </h4>
            <p className="text-xs text-gray-400">
              {account.institution || account.type.replace('_', ' ')}
            </p>
          </div>
        </div>

        {account.isDefault && (
          <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
            Default
          </span>
        )}
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {maskAccountId(account._id || '1234')}
        </span>
        <span
          className={`text-base font-bold ${
            isCredit ? 'text-red-500' : 'text-gray-900 dark:text-white'
          }`}
        >
          {isCredit ? '-' : ''}${Math.abs(account.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default AccountCard;
