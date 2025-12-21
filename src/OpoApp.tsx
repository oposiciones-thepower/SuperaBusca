import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './styles/global.css';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </AnimatePresence>
  );
};

const OpoApp: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7c3aed',
          colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          colorBorder: 'rgba(255, 255, 255, 0.1)',
          colorText: '#f8fafc',
          colorTextSecondary: '#94a3b8',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Button: {
            primaryShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
          },
          Input: {
            activeBorderColor: '#7c3aed',
            hoverBorderColor: '#a78bfa',
          },
          Select: {
            optionSelectedBg: 'rgba(124, 58, 237, 0.2)',
          },
        },
      }}
    >
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ConfigProvider>
  );
};

export default OpoApp;
