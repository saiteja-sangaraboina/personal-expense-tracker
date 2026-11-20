import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PrivacyModeToggle = ({ isPrivacyMode, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-2 rounded-xl transition-colors border ${
        isPrivacyMode
          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
      title={isPrivacyMode ? 'Disable Privacy Mode (Reveal Balances)' : 'Enable Privacy Mode (Mask Balances)'}
    >
      {isPrivacyMode ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
};

export default PrivacyModeToggle;
