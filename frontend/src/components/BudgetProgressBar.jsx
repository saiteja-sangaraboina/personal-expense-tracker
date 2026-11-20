const BudgetProgressBar = ({
  spent = 0,
  limit = 100,
  alertThreshold = 80,
  showLabels = true,
}) => {
  const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;
  const isOver = spent > limit;
  const isNear = percentage >= alertThreshold && !isOver;

  let barColor = 'bg-indigo-600 dark:bg-indigo-500';
  if (isOver) {
    barColor = 'bg-red-500';
  } else if (isNear) {
    barColor = 'bg-amber-500';
  }

  return (
    <div className="w-full space-y-1.5">
      <div className="w-full bg-gray-100 dark:bg-gray-700/60 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            {percentage}% used
          </span>
          <span className={`font-medium ${isOver ? 'text-red-500' : isNear ? 'text-amber-500' : 'text-gray-600 dark:text-gray-300'}`}>
            ${Number(spent).toFixed(2)} / ${Number(limit).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default BudgetProgressBar;
