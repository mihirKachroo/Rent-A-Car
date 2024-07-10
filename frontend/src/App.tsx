import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import OwnerRegisterPage from './pages/OwnerRegisterPage';
import Layout from './layouts/main';
import { AuthProvider } from './context/AuthContext';
import OwnerMainPage from './pages/OwnerMainPage';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/owner" element={<OwnerMainPage />} />
              <Route path="/owner-login" element={<OwnerLoginPage />} />
              <Route path="/owner-register" element={<OwnerRegisterPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
