import React from 'react';
import { CheckSquare, Trash2, Tag, FolderEdit, X } from 'lucide-react';

const BulkActionToolbar = ({
  selectedCount = 0,
  onClearSelection,
  onBulkCategory,
  onBulkTag,
  onBulkDelete,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2 pr-3 border-r border-gray-700 text-sm font-semibold">
        <CheckSquare size={16} className="text-indigo-400" />
        <span>{selectedCount} selected</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onBulkCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium transition-colors"
        >
          <FolderEdit size={14} /> Category
        </button>

        <button
          onClick={onBulkTag}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium transition-colors"
        >
          <Tag size={14} /> Add Tag
        </button>

        <button
          onClick={onBulkDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-medium transition-colors"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

      <button
        onClick={onClearSelection}
        className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors ml-2"
        title="Cancel selection"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default BulkActionToolbar;
