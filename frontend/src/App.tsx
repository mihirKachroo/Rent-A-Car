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
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import FavouritesPage from './pages/FavouritesPage';
import { FavouriteProvider } from 'context/FavouriteContext';
import ListingFrequencyPage from 'pages/ListingFrequencyPage';
import AverageConditionPricePage from 'pages/AverageConditionPricePage';
import ListingPage from 'pages/ListingPage';
import UserRentalsPage from 'pages/UserRentalsPage';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const App: React.FC = () => {
  return (
    <Router>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <FavouriteProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/favourites" element={<FavouritesPage />} />
                  <Route path="/owner" element={<OwnerMainPage />} />
                  <Route path="/owner-login" element={<OwnerLoginPage />} />
                  <Route path="/rentals" element={<UserRentalsPage />} />
                  <Route path="/listing/:listingId" element={<ListingPage />} />
                  <Route
                    path="/owner-register"
                    element={<OwnerRegisterPage />}
                  />
                  <Route
                    path="/listing-frequency"
                    element={<ListingFrequencyPage />}
                  />
                  <Route
                    path="/average-condition"
                    element={<AverageConditionPricePage />}
                  />
                </Routes>
              </Layout>
            </FavouriteProvider>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </Router>
  );
};

export default App;
