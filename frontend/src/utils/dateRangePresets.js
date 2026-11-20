/**
 * dateRangePresets.js - Generates exact boundary timestamps for reporting and analytics filters
 */

export const getDateRangePreset = (preset = 'this_month', referenceDate = new Date()) => {
  const ref = new Date(referenceDate);
  const year = ref.getFullYear();
  const month = ref.getMonth();

  let start = new Date(year, month, 1);
  let end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  if (preset === 'today') {
    start = new Date(year, month, ref.getDate(), 0, 0, 0);
    end = new Date(year, month, ref.getDate(), 23, 59, 59, 999);
  } else if (preset === 'last_month') {
    start = new Date(year, month - 1, 1);
    end = new Date(year, month, 0, 23, 59, 59, 999);
  } else if (preset === 'year_to_date') {
    start = new Date(year, 0, 1);
    end = new Date(year, 11, 31, 23, 59, 59, 999);
  }

  return {
    preset,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
};
