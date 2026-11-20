import { createContext, useContext, useState } from 'react';
import { MOCK_USER } from '../utils/mockData';

const DemoContext = createContext(null);

export const DemoProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('isDemoMode') === 'true';
  });

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('isDemoMode', 'true');
    localStorage.setItem('token', 'demo_mock_jwt_token_123');
    localStorage.setItem('user', JSON.stringify(MOCK_USER));
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem('isDemoMode');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, enableDemoMode, disableDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
};
