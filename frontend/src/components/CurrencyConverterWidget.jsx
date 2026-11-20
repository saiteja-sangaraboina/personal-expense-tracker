import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { convertCurrency, getExchangeRateText } from '../utils/currencyRates';
import { SUPPORTED_CURRENCIES } from '../utils/constants';

const CurrencyConverterWidget = () => {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const convertedResult = convertCurrency(Number(amount) || 0, from, to);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ArrowRightLeft size={16} className="text-indigo-600 dark:text-indigo-400" />
          Quick Currency Converter
        </h3>
        <span className="text-[11px] text-gray-400">
          {getExchangeRateText(from, to)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">Amount</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-700 px-2.5 text-xs font-semibold focus:outline-none"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center sm:pt-4">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        <div className="sm:col-span-2">
          <label className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">Converted</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
            <div className="w-full px-3 py-2 text-sm font-bold text-gray-900 dark:text-white flex items-center">
              {convertedResult.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-700 px-2.5 text-xs font-semibold focus:outline-none"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterWidget;
