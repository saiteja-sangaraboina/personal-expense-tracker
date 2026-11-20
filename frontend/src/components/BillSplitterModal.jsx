import React, { useState } from 'react';
import { Users, DollarSign, X, Copy, Check } from 'lucide-react';
import { splitBillEqually } from '../utils/billSplitter';
import toast from 'react-hot-toast';

const BillSplitterModal = ({ isOpen, onClose }) => {
  const [totalAmount, setTotalAmount] = useState('120');
  const [peopleCount, setPeopleCount] = useState('3');
  const [tipPercent, setTipPercent] = useState('15');
  const [taxPercent, setTaxPercent] = useState('8.5');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const result = splitBillEqually(
    Number(totalAmount) || 0,
    Number(peopleCount) || 1,
    Number(tipPercent) || 0,
    Number(taxPercent) || 0
  );

  const handleCopySummary = () => {
    const summaryText = `💸 Bill Split Summary\nTotal: $${result.grandTotal.toFixed(2)}\nPeople: ${peopleCount}\nEach person owes: $${result.perPerson.toFixed(2)}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast.success('Split summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Users size={20} />
            <h3 className="text-gray-900 dark:text-white text-lg">Split Bill with Friends</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Bill Amount ($) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Participants *</label>
              <input
                type="number"
                min="1"
                className="input-field"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Tip (%)</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Tax (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="input-field"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/60 dark:from-slate-700 dark:to-slate-700/80 p-5 rounded-2xl border border-indigo-100 dark:border-slate-600 mb-6">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Tip: ${result.tipAmount.toFixed(2)} | Tax: ${result.taxAmount.toFixed(2)}</span>
            <span>Total: ${result.grandTotal.toFixed(2)}</span>
          </div>
          <div className="text-center pt-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
              Each Person Pays
            </span>
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              ${result.perPerson.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn-primary w-full text-sm flex items-center justify-center gap-2 py-2.5"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard' : 'Copy Split Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillSplitterModal;
