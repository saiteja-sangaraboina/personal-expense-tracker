/**
 * reminderEngine.js - Logic for tracking upcoming recurring bills, subscription renewals, and alert levels
 */

export const getDaysUntil = (targetDateStr, referenceDate = new Date()) => {
  if (!targetDateStr) return null;
  const target = new Date(targetDateStr);
  const ref = new Date(referenceDate);

  // Normalize to UTC midnight for exact date diff
  const utcTarget = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const utcRef = Date.UTC(ref.getFullYear(), ref.getMonth(), ref.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utcTarget - utcRef) / msPerDay);
};

export const classifyBillUrgency = (targetDateStr, referenceDate = new Date()) => {
  const days = getDaysUntil(targetDateStr, referenceDate);
  if (days === null) return 'unknown';

  if (days < 0) return 'overdue';
  if (days === 0) return 'due-today';
  if (days <= 3) return 'due-soon';
  if (days <= 7) return 'upcoming';
  return 'future';
};

export const analyzeUpcomingBills = (bills = [], referenceDate = new Date()) => {
  const activeBills = bills.filter((b) => b && (b.isActive === undefined || b.isActive === true));

  let overdueCount = 0;
  let overdueTotal = 0;
  let dueWithin7DaysCount = 0;
  let dueWithin7DaysTotal = 0;
  let dueWithin30DaysCount = 0;
  let dueWithin30DaysTotal = 0;

  const analyzed = activeBills.map((bill) => {
    const daysUntil = getDaysUntil(bill.nextDueDate, referenceDate);
    const urgency = classifyBillUrgency(bill.nextDueDate, referenceDate);
    const amount = Number(bill.amount) || 0;

    if (urgency === 'overdue') {
      overdueCount += 1;
      overdueTotal += amount;
    } else if (daysUntil >= 0 && daysUntil <= 7) {
      dueWithin7DaysCount += 1;
      dueWithin7DaysTotal += amount;
    }

    if (daysUntil !== null && daysUntil >= 0 && daysUntil <= 30) {
      dueWithin30DaysCount += 1;
      dueWithin30DaysTotal += amount;
    }

    let statusLabel = 'Future';
    if (urgency === 'overdue') statusLabel = `${Math.abs(daysUntil)}d overdue`;
    else if (urgency === 'due-today') statusLabel = 'Due today';
    else if (urgency === 'due-soon' || urgency === 'upcoming') statusLabel = `Due in ${daysUntil}d`;

    return {
      ...bill,
      daysUntil,
      urgency,
      statusLabel,
      amountNumeric: amount,
    };
  });

  analyzed.sort((a, b) => {
    if (a.daysUntil === null) return 1;
    if (b.daysUntil === null) return -1;
    return a.daysUntil - b.daysUntil;
  });

  return {
    bills: analyzed,
    overdueCount,
    overdueTotal,
    dueWithin7DaysCount,
    dueWithin7DaysTotal,
    dueWithin30DaysCount,
    dueWithin30DaysTotal,
    hasUrgentAlerts: overdueCount > 0 || dueWithin7DaysCount > 0,
  };
};
