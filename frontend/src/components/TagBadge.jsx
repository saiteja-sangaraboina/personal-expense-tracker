import React from 'react';
import { Tag as TagIcon, X } from 'lucide-react';

const TagBadge = ({ name, color = '#6366f1', onRemove, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: `${color}18`, // 10% opacity tint
        borderColor: `${color}40`,
        color: color,
      }}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      }`}
    >
      <TagIcon size={11} />
      <span>#{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="hover:opacity-75 focus:outline-hidden ml-0.5"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export default TagBadge;
