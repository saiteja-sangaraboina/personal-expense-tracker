# Testing Architecture & Verification Guide

This guide describes the testing strategy, test suites, and coverage verification for the **Personal Expense Tracker** application.

---

## 1. Overview

The project follows a test-driven and continuously verified architecture:
- **Frontend Tests**: Executed using **Vitest** for blazing-fast in-memory testing of formatting helpers, business logic, parsers, and analytical engines.
- **Backend Tests**: Executed using **Jest** with isolated database mocking and controller validation.

---

## 2. Frontend Test Suites (Vitest)

Located in `frontend/src/utils/__tests__/`:

| Test Suite | Purpose | Covered Functions |
|---|---|---|
| `formatters.test.js` | Currency, date, and percentage formatting | `formatCurrency`, `formatDate`, `formatRelativeDate` |
| `validators.test.js` | Form input and regex sanity validation | `validateEmail`, `validatePassword`, `validateAmount` |
| `csvParser.test.js` | Parsing exported and imported CSV records | `parseCsv`, `generateCsvTemplate` |
| `currencyRates.test.js` | Multi-currency conversions and rate lookup | `convertCurrency`, `getSupportedCurrencies` |
| `filterHelpers.test.js` | Transaction date filtering and multi-criteria filters | `filterByDateRange`, `searchTransactions` |
| `healthScore.test.js` | 100-point financial health index calculator | `calculateFinancialHealthScore` |
| `forecasting.test.js` | Linear regression 30-day spending projection | `calculateSpendingForecast` |
| `achievements.test.js` | Gamification milestone & unlockable badges | `evaluateAchievements` |
| `receiptParser.test.js` | OCR receipt vendor detection and categorization | `parseReceiptText`, `detectVendor` |
| `spendingInsights.test.js` | AI natural-language spending insights | `generateInsights`, `categoryChanges` |
| `budgetPlanner.test.js` | 50/30/20 rule and suggested category limits | `calculate503020Rule`, `suggestCategoryBudgets` |
| `storageUtils.test.js` | LocalStorage serialization with TTL expiration | `setStorageItem`, `getStorageItem`, `clearAppStorage` |

### Running Frontend Tests
```bash
cd frontend
npx vitest run
```

---

## 3. Backend Test Suites (Jest)

Located in `backend/tests/`:

| Test Suite | Purpose | Key Checks |
|---|---|---|
| `sanity.test.js` | Verifies basic runtime environment and assertion library | Basic assertion sanity |
| `tokenUtils.test.js` | Verifies JWT signing, verification, and refresh lifecycle | Token generation & expiry |
| `dataPortability.test.js` | Tests user profile export (GDPR data export compliance) | JSON export sanitization |
| `activity.test.js` | Audit logging and activity trail creation | Event tracking validation |
| `helpers.test.js` | Common server utilities, pagination, and sanitization | Pagination clamping, date ranges |
| `notifications.test.js` | Email summary templates and digest generator | HTML & text monthly digest |
| `requestLogger.test.js` | Request telemetry and finish hook verification | Middleware execution order |

### Running Backend Tests
```bash
cd backend
npm test
```

---

## 4. Continuous Build Verification

Before committing changes, both test runners and the Vite production build must pass:
```bash
# Full verification pipeline:
cd frontend && npx vitest run && cd ../backend && npm test && cd ../frontend && npm run build
```
