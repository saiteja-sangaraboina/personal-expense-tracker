import React, { useState } from 'react';
import { Lock, ShieldCheck, X, Delete } from 'lucide-react';
import { verifySecurityPin } from '../utils/securityPin';
import toast from 'react-hot-toast';

const SecurityPinModal = ({ isOpen, onClose, onSuccess, title = 'Enter Security PIN' }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDigit = async (digit) => {
    if (pin.length >= 4) return;
    const nextPin = pin + digit;
    setPin(nextPin);
    setError('');

    if (nextPin.length === 4) {
      const result = await verifySecurityPin(nextPin);
      if (result.success) {
        toast.success('Access authorized');
        setPin('');
        onSuccess && onSuccess();
        onClose();
      } else {
        setError(
          result.isLocked
            ? 'Account locked due to too many failed attempts'
            : `Incorrect PIN (${result.remainingAttempts} attempts remaining)`
        );
        setPin('');
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-xs p-6 shadow-2xl border border-gray-100 dark:border-slate-700 text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Lock size={22} />
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-4">Enter your 4-digit security code</p>

        {/* PIN Dots */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                i < pin.length
                  ? 'bg-indigo-600 border-indigo-600 scale-110'
                  : 'border-gray-300 dark:border-slate-600 bg-transparent'
              }`}
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-500 font-medium mb-4">{error}</p>}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[210px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleDigit(String(n))}
              className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold text-lg hover:bg-indigo-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
            >
              {n}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold text-lg hover:bg-indigo-50 dark:hover:bg-slate-600 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 active:scale-95 transition-all"
          >
            <Delete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPinModal;
