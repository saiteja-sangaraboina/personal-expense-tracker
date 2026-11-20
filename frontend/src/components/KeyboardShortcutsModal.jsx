import { X, Command } from 'lucide-react';

const SHORTCUTS = [
  { key: 'Ctrl + N', label: 'Create new transaction' },
  { key: 'Ctrl + K  or  /', label: 'Focus global search input' },
  { key: 'Shift + T', label: 'Toggle dark / light theme' },
  { key: 'Esc', label: 'Close active dialog or cancel' },
  { key: '?', label: 'Open this shortcuts helper' },
];

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Command size={18} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Keyboard Shortcuts
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 divide-y divide-gray-100 dark:divide-gray-700/50">
          {SHORTCUTS.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0">
              <span className="text-gray-600 dark:text-gray-300">{s.label}</span>
              <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 font-mono font-bold text-gray-700 dark:text-gray-200 text-[11px] border border-gray-200 dark:border-gray-600">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
