/**
 * Evaluates unlocked gamified badges based on user stats
 */
export const calculateUserAchievements = ({
  transactionCount = 0,
  budgetCount = 0,
  goalCount = 0,
  hasEmergencyFund = false,
  totalSaved = 0,
}) => {
  const achievements = [
    {
      id: 'first_step',
      title: 'First Step',
      description: 'Logged your very first transaction.',
      icon: '🌱',
      isUnlocked: transactionCount >= 1,
    },
    {
      id: 'budget_planner',
      title: 'Budget Master',
      description: 'Set your first category budget.',
      icon: '🎯',
      isUnlocked: budgetCount >= 1,
    },
    {
      id: 'goal_setter',
      title: 'Visionary',
      description: 'Created a savings goal target.',
      icon: '🏆',
      isUnlocked: goalCount >= 1,
    },
    {
      id: 'century_club',
      title: 'Century Club',
      description: 'Recorded over 100 transactions.',
      icon: '💯',
      isUnlocked: transactionCount >= 100,
    },
    {
      id: 'wealth_builder',
      title: 'Wealth Builder',
      description: 'Accumulated over $5,000 in savings.',
      icon: '💎',
      isUnlocked: totalSaved >= 5000,
    },
  ];

  return {
    achievements,
    unlockedCount: achievements.filter((a) => a.isUnlocked).length,
    totalCount: achievements.length,
  };
};
