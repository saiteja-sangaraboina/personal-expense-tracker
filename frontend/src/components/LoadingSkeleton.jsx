export const SkeletonCard = () => (
  <div className="card animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center justify-between py-3 px-2 border-b border-gray-100 dark:border-gray-800 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      <div className="space-y-1.5">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
  </div>
);
