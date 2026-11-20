import React, { useState } from 'react';
import { X, ArrowRightLeft, DollarSign, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const TransferFundsModal = ({ isOpen, onClose, accounts = [], onTransferSuccess }) => {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromAccountId || !toAccountId) {
      return toast.error('Please select both source and destination accounts');
    }
    if (fromAccountId === toAccountId) {
      return toast.error('Source and destination accounts must be different');
    }
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return toast.error('Please enter a valid transfer amount');
    }

    setLoading(true);
    try {
      if (onTransferSuccess) {
        await onTransferSuccess({ fromAccountId, toAccountId, amount: numAmount });
      }
      toast.success('Funds transferred successfully!');
      onClose();
    } catch (err) {
      toast.error(err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  const fromAccount = accounts.find((a) => a._id === fromAccountId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            <ArrowRightLeft size={20} />
            <h3 className="text-gray-900 dark:text-white">Transfer Funds</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">From Account *</label>
            <select
              required
              className="input-field"
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
            >
              <option value="">Select source account</option>
              {accounts.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name} (${Number(a.balance || 0).toFixed(2)})
                </option>
              ))}
            </select>
            {fromAccount && (
              <p className="text-xs text-gray-500 mt-1">
                Available balance: ${Number(fromAccount.balance || 0).toFixed(2)}
              </p>
            )}
          </div>

          <div>
            <label className="label">To Account *</label>
            <select
              required
              className="input-field"
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
            >
              <option value="">Select destination account</option>
              {accounts
                .filter((a) => a._id !== fromAccountId)
                .map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name} (${Number(a.balance || 0).toFixed(2)})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="label">Transfer Amount ($) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                className="input-field pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-gray-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-sm flex items-center gap-1.5"
            >
              <ArrowRightLeft size={16} />
              {loading ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferFundsModal;
