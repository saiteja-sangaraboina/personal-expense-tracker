/**
 * financialRatios.js - Comprehensive solvency, liquidity, and debt-to-income financial ratios
 */

export const calculateFinancialRatios = ({
  monthlyIncome = 0,
  monthlyExpenses = 0,
  monthlyDebtService = 0,
  totalDebt = 0,
  totalAssets = 0,
  liquidCash = 0,
}) => {
  const inc = Math.max(0, Number(monthlyIncome) || 0);
  const exp = Math.max(0, Number(monthlyExpenses) || 0);
  const debtService = Math.max(0, Number(monthlyDebtService) || 0);
  const debt = Math.max(0, Number(totalDebt) || 0);
  const assets = Math.max(0, Number(totalAssets) || 0);
  const cash = Math.max(0, Number(liquidCash) || 0);

  // 1. Savings Ratio: (Income - Expenses) / Income * 100
  const savingsRate = inc > 0 ? Math.round(((inc - exp) / inc) * 100) : 0;
  const savingsStatus = savingsRate >= 20 ? 'Optimal' : savingsRate >= 10 ? 'Adequate' : 'Needs Focus';

  // 2. Debt-to-Income (DTI): Monthly Debt Service / Income * 100
  const dti = inc > 0 ? Math.round((debtService / inc) * 100) : 0;
  const dtiStatus = dti <= 35 ? 'Healthy' : dti <= 49 ? 'Moderate' : 'High Risk';

  // 3. Liquidity Ratio: Liquid Cash / Monthly Expenses
  const liquidityMonths = exp > 0 ? Math.round((cash / exp) * 10) / 10 : 0;
  const liquidityStatus = liquidityMonths >= 6 ? 'Exceptional' : liquidityMonths >= 3 ? 'Target Met' : 'Low Buffer';

  // 4. Solvency Ratio: (Total Assets - Total Debt) / Total Assets * 100
  const netWorth = assets - debt;
  const solvencyRatio = assets > 0 ? Math.round((netWorth / assets) * 100) : 0;
  const solvencyStatus = solvencyRatio >= 60 ? 'Strong' : solvencyRatio >= 25 ? 'Fair' : 'Vulnerable';

  // Overall Financial Health Score
  let compositeScore = 0;
  if (savingsRate >= 20) compositeScore += 25; else if (savingsRate >= 10) compositeScore += 15;
  if (dti <= 35) compositeScore += 25; else if (dti <= 49) compositeScore += 15;
  if (liquidityMonths >= 3) compositeScore += 25; else if (liquidityMonths >= 1) compositeScore += 10;
  if (solvencyRatio >= 40) compositeScore += 25; else if (solvencyRatio >= 10) compositeScore += 15;

  let grade = 'B';
  if (compositeScore >= 85) grade = 'A+';
  else if (compositeScore >= 70) grade = 'A';
  else if (compositeScore >= 50) grade = 'B';
  else if (compositeScore >= 35) grade = 'C';
  else grade = 'D';

  return {
    savingsRate,
    savingsStatus,
    dti,
    dtiStatus,
    liquidityMonths,
    liquidityStatus,
    solvencyRatio,
    solvencyStatus,
    compositeScore,
    grade,
  };
};
