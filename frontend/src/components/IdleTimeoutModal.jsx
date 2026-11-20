import React from 'react';
import { Clock, ShieldAlert, LogOut } from 'lucide-react';

const IdleTimeoutModal = ({ isOpen, remainingSeconds = 60, onStayLoggedIn, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-amber-200 dark:border-amber-900/40 text-center">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock size={24} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">
          Are you still there?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          For your financial security, your session will automatically log out in{' '}
          <span className="font-bold text-amber-600 dark:text-amber-400">{remainingSeconds}s</span> due to inactivity.
        </p>

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={onLogout}
            className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-2 text-red-600"
          >
            <LogOut size={14} /> Log Out
          </button>
          <button
            type="button"
            onClick={onStayLoggedIn}
            className="btn-primary text-xs px-4 py-2"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdleTimeoutModal;
