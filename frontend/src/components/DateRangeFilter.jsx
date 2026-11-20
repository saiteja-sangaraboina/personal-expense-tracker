import React from 'react';

const DateRangeFilter = ({ activePreset = 'this_month', onSelectPreset }) => {
  const presets = [
    { id: 'today', label: 'Today' },
    { id: 'this_month', label: 'This Month' },
    { id: 'last_month', label: 'Last Month' },
    { id: 'year_to_date', label: 'Year to Date' },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit border border-gray-200 dark:border-gray-700">
      {presets.map((p) => {
        const isActive = activePreset === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPreset(p.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
};

export default DateRangeFilter;
