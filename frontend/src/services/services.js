import API from './api';

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  updatePassword: (data) => API.put('/auth/password', data),
  exportData: () => API.get('/auth/export-data'),
  deleteAccount: () => API.delete('/auth/delete-account'),
};

export const transactionService = {
  getAll: (params) => API.get('/transactions', { params }),
  getOne: (id) => API.get(`/transactions/${id}`),
  create: (data) => API.post('/transactions', data),
  update: (id, data) => API.put(`/transactions/${id}`, data),
  remove: (id) => API.delete(`/transactions/${id}`),
  export: () => API.get('/transactions/export'),
};

export const budgetService = {
  getAll: (params) => API.get('/budgets', { params }),
  create: (data) => API.post('/budgets', data),
  update: (id, data) => API.put(`/budgets/${id}`, data),
  remove: (id) => API.delete(`/budgets/${id}`),
};

export const goalService = {
  getAll: () => API.get('/goals'),
  create: (data) => API.post('/goals', data),
  update: (id, data) => API.put(`/goals/${id}`, data),
  remove: (id) => API.delete(`/goals/${id}`),
};

export const recurringService = {
  getAll: () => API.get('/recurring'),
  create: (data) => API.post('/recurring', data),
  update: (id, data) => API.put(`/recurring/${id}`, data),
  remove: (id) => API.delete(`/recurring/${id}`),
};

export const categoryService = {
  getAll: (params) => API.get('/categories', { params }),
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  remove: (id) => API.delete(`/categories/${id}`),
};

export const dashboardService = {
  getSummary: () => API.get('/dashboard/summary'),
  getAnalytics: (params) => API.get('/dashboard/analytics', { params }),
};

export const accountService = {
  getAll: () => API.get('/accounts'),
  create: (data) => API.post('/accounts', data),
  transfer: (data) => API.post('/accounts/transfer', data),
  remove: (id) => API.delete(`/accounts/${id}`),
};
