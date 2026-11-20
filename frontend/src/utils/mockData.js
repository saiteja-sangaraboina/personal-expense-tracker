export const MOCK_USER = {
  _id: 'mock-user-123',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  currency: 'USD',
  theme: 'light',
  createdAt: '2026-01-15T08:00:00.000Z',
};

export const MOCK_TRANSACTIONS = [
  { _id: 't-1', type: 'income', amount: 6200, category: 'Salary', description: 'Monthly tech salary', date: '2026-11-01' },
  { _id: 't-2', type: 'income', amount: 850, category: 'Freelance', description: 'Logo and brand package', date: '2026-11-04' },
  { _id: 't-3', type: 'expense', amount: 1450, category: 'Bills', description: 'Apartment rent', date: '2026-11-02' },
  { _id: 't-4', type: 'expense', amount: 285.5, category: 'Food', description: 'Costco bulk grocery trip', date: '2026-11-03' },
  { _id: 't-5', type: 'expense', amount: 65, category: 'Transportation', description: 'Gas refill', date: '2026-11-05' },
  { _id: 't-6', type: 'expense', amount: 120, category: 'Entertainment', description: 'Cinema and arcade weekend', date: '2026-11-07' },
  { _id: 't-7', type: 'expense', amount: 45, category: 'Healthcare', description: 'Vitamins & wellness check', date: '2026-11-09' },
  { _id: 't-8', type: 'expense', amount: 195, category: 'Shopping', description: 'Noise-canceling headphones', date: '2026-11-12' },
  { _id: 't-9', type: 'expense', amount: 72, category: 'Food', description: 'Italian bistro dinner', date: '2026-11-14' },
  { _id: 't-10', type: 'expense', amount: 40, category: 'Education', description: 'Fullstack subscription book', date: '2026-11-16' },
  { _id: 't-11', type: 'expense', amount: 15.99, category: 'Bills', description: 'Netflix subscription', date: '2026-11-17' },
  { _id: 't-12', type: 'expense', amount: 10.99, category: 'Bills', description: 'Spotify family', date: '2026-11-18' },
];

export const MOCK_BUDGETS = [
  { _id: 'b-1', category: 'Food', monthlyLimit: 600, spent: 357.5, remaining: 242.5, percentage: 60, isOverBudget: false, isNearLimit: false },
  { _id: 'b-2', category: 'Bills', monthlyLimit: 1600, spent: 1476.98, remaining: 123.02, percentage: 92, isOverBudget: false, isNearLimit: true },
  { _id: 'b-3', category: 'Entertainment', monthlyLimit: 200, spent: 120, remaining: 80, percentage: 60, isOverBudget: false, isNearLimit: false },
  { _id: 'b-4', category: 'Shopping', monthlyLimit: 250, spent: 195, remaining: 55, percentage: 78, isOverBudget: false, isNearLimit: false },
];

export const MOCK_GOALS = [
  { _id: 'g-1', title: 'Emergency Fund', targetAmount: 10000, currentAmount: 6400, percentage: 64, deadline: '2027-06-30', category: 'Emergency Fund' },
  { _id: 'g-2', title: 'Japan Travel Trip', targetAmount: 3500, currentAmount: 2100, percentage: 60, deadline: '2027-04-15', category: 'Travel' },
  { _id: 'g-3', title: 'New Workstation', targetAmount: 2200, currentAmount: 2200, percentage: 100, deadline: '2026-12-31', category: 'Gadgets' },
];

export const MOCK_RECURRING = [
  { _id: 'r-1', title: 'Apartment Rent', amount: 1450, category: 'Bills', frequency: 'monthly', nextDueDate: '2026-12-01', isActive: true },
  { _id: 'r-2', title: 'Netflix 4K', amount: 15.99, category: 'Bills', frequency: 'monthly', nextDueDate: '2026-12-17', isActive: true },
  { _id: 'r-3', title: 'Spotify Premium', amount: 10.99, category: 'Bills', frequency: 'monthly', nextDueDate: '2026-12-18', isActive: true },
  { _id: 'r-4', title: 'Gym Membership', amount: 45, category: 'Healthcare', frequency: 'monthly', nextDueDate: '2026-12-05', isActive: true },
];
