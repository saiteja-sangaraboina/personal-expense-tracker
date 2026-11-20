/**
 * categoryAnalytics.js - Analyzes category spending changes and shifts across periods
 */

export const calculateCategoryDrift = (currentExpensesByCategory = {}, previousExpensesByCategory = {}) => {
  const allCategories = Array.from(
    new Set([...Object.keys(currentExpensesByCategory), ...Object.keys(previousExpensesByCategory)])
  );

  const driftResults = allCategories.map((category) => {
    const current = Number(currentExpensesByCategory[category]) || 0;
    const previous = Number(previousExpensesByCategory[category]) || 0;

    let percentageChange = 0;
    if (previous > 0) {
      percentageChange = Math.round(((current - previous) / previous) * 100);
    } else if (current > 0) {
      percentageChange = 100; // New category spend
    }

    let direction = 'flat';
    if (percentageChange >= 15) direction = 'surging';
    else if (percentageChange <= -15) direction = 'declining';

    return {
      category,
      currentSpend: current,
      previousSpend: previous,
      difference: Math.round((current - previous) * 100) / 100,
      percentageChange,
      direction,
      isSurging: direction === 'surging',
    };
  });

  driftResults.sort((a, b) => b.percentageChange - a.percentageChange);

  const surgingCount = driftResults.filter((d) => d.isSurging).length;

  return {
    categories: driftResults,
    surgingCount,
    hasMajorSurges: surgingCount > 0,
  };
};
