import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, X, FileJson } from 'lucide-react';
import { validateBackupArchive } from '../utils/jsonImporter';
import toast from 'react-hot-toast';

const JsonRestoreModal = ({ isOpen, onClose, onRestore }) => {
  const [fileData, setFileData] = useState(null);
  const [validation, setValidation] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const result = validateBackupArchive(content);
      setValidation(result);
      if (result.isValid) {
        setFileData(result.data);
      } else {
        toast.error(result.error);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = () => {
    if (!validation?.isValid || !fileData) return;
    if (typeof onRestore === 'function') {
      onRestore(fileData);
    }
    toast.success('Backup archive verified and loaded!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <UploadCloud size={20} />
            <span>Restore Backup Archive</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 dark:bg-gray-750">
            <FileJson size={32} className="text-gray-400 mb-2" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              Select or Drop .json backup archive
            </span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {validation?.isValid && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800 text-xs mb-4">
            <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={14} /> Valid Archive: {validation.accountName}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Contains {validation.counts.transactions} transactions, {validation.counts.budgets} budgets, {validation.counts.goals} goals.
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary text-sm py-2 px-3">
            Cancel
          </button>
          <button
            onClick={handleConfirmRestore}
            disabled={!validation?.isValid}
            className="btn-primary text-sm py-2 px-4 disabled:opacity-50"
          >
            Confirm & Restore
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonRestoreModal;
