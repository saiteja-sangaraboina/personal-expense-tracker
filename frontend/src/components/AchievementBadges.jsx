import { Award } from 'lucide-react';
import { calculateUserAchievements } from '../utils/achievements';

const AchievementBadges = ({ transactionCount = 12, budgetCount = 4, goalCount = 3, totalSaved = 5400 }) => {
  const { achievements, unlockedCount, totalCount } = calculateUserAchievements({
    transactionCount,
    budgetCount,
    goalCount,
    totalSaved,
  });

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-amber-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Financial Badges & Milestones
          </h3>
        </div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
          {unlockedCount} of {totalCount} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((badge) => (
          <div
            key={badge.id}
            className={`p-3 rounded-xl border text-center transition-all ${
              badge.isUnlocked
                ? 'bg-amber-50/40 border-amber-200/80 dark:bg-amber-950/20 dark:border-amber-900/40'
                : 'bg-gray-50/50 border-gray-100 dark:bg-gray-800/30 dark:border-gray-700/40 opacity-40 grayscale'
            }`}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">{badge.title}</h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;
