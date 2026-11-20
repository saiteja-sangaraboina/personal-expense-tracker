import API from './api';

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  updatePassword: (data) => API.put('/auth/password', data),
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

export const dashboardService = {
  getSummary: () => API.get('/dashboard/summary'),
  getAnalytics: (params) => API.get('/dashboard/analytics', { params }),
};
