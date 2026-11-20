/**
 * debtPayoff.js
 * Debt Payoff Simulator supporting Snowball (lowest balance first)
 * and Avalanche (highest interest rate first) strategies.
 */

/**
 * Simulate debt elimination timeline and calculate total interest paid.
 * @param {Array<{ name: string, balance: number, interestRate: number, minPayment: number }>} debts
 * @param {number} extraMonthlyPayment
 * @param {'avalanche' | 'snowball'} strategy
 * @returns {{
 *   monthsToDebtFree: number,
 *   totalInterestPaid: number,
 *   totalPrincipalPaid: number,
 *   schedule: Array<{ month: number, remainingTotal: number, interestPaidThisMonth: number }>
 * }}
 */
export function simulateDebtPayoff(debts = [], extraMonthlyPayment = 0, strategy = 'avalanche') {
  if (!debts || debts.length === 0) {
    return {
      monthsToDebtFree: 0,
      totalInterestPaid: 0,
      totalPrincipalPaid: 0,
      schedule: [],
    };
  }

  // Clone debts deeply
  let activeDebts = debts.map((d) => ({
    name: d.name,
    balance: Math.max(0, Number(d.balance) || 0),
    interestRate: Math.max(0, Number(d.interestRate) || 0) / 100 / 12, // Monthly interest rate
    minPayment: Math.max(0, Number(d.minPayment) || 0),
  })).filter((d) => d.balance > 0);

  const initialPrincipal = activeDebts.reduce((s, d) => s + d.balance, 0);
  let totalInterestPaid = 0;
  let months = 0;
  const maxMonths = 360; // 30-year safety ceiling
  const schedule = [];

  while (activeDebts.length > 0 && months < maxMonths) {
    months += 1;
    let interestThisMonth = 0;
    let extraBudget = Math.max(0, Number(extraMonthlyPayment) || 0);

    // 1. Accrue monthly interest
    for (const d of activeDebts) {
      const interest = d.balance * d.interestRate;
      d.balance += interest;
      interestThisMonth += interest;
      totalInterestPaid += interest;
    }

    // 2. Pay minimums
    for (const d of activeDebts) {
      const payment = Math.min(d.balance, d.minPayment);
      d.balance -= payment;
    }

    // 3. Sort active debts by chosen strategy for extra payment allocation
    if (strategy === 'avalanche') {
      activeDebts.sort((a, b) => b.interestRate - a.interestRate); // Highest rate first
    } else {
      activeDebts.sort((a, b) => a.balance - b.balance); // Lowest balance first (snowball)
    }

    // 4. Apply extra budget to prioritized debt
    for (const d of activeDebts) {
      if (extraBudget <= 0) break;
      const payment = Math.min(d.balance, extraBudget);
      d.balance -= payment;
      extraBudget -= payment;
    }

    // 5. Clean up debts paid off
    activeDebts = activeDebts.filter((d) => d.balance > 0.01);

    const currentTotalBalance = activeDebts.reduce((s, d) => s + d.balance, 0);
    schedule.push({
      month: months,
      remainingTotal: Math.round(currentTotalBalance),
      interestPaidThisMonth: Math.round(interestThisMonth),
    });
  }

  return {
    monthsToDebtFree: months,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalPrincipalPaid: Math.round(initialPrincipal),
    schedule,
  };
}
