// Note: Main App Component
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Component Imports
import Header from './components/headings/header/Header';
import PrivateRoute from './components/reusable/PrivateRoute';
import LoginDialog from './components/dialogs/LoginDialog';

// Page Imports
import {
  HomePage,
  StorePage,
  CartPage,
  ProfilePage,
  CollectionPage,
  DeckBuilderPage,
  NotFoundPage,
  LoginPage,
} from './pages';

import {
  useUserContext,
  useCollectionStore,
  useDeckStore,
  useCartStore,
  useCardImages,
  useAuthContext,
  usePageContext,
} from './context';
import { AppContainer } from './pages/pageStyles/StyledComponents';

const App = () => {
  const { fetchAllCollectionsForUser } = useCollectionStore();
  const { fetchAllDecksForUser } = useDeckStore();
  const { fetchUserCart } = useCartStore();
  const { user } = useUserContext();
  const { logoutTimerRef, resetLogoutTimer } = useAuthContext();
  const {
    isPageLoading,
    setIsPageLoading,
    displaySplashPage,
    handleLoadingTimeout,
  } = usePageContext();
  const navigate = useNavigate();
  const loadingTimeoutRef = useRef(null);
  const userId = user?.id;
  const [showLoginDialog, setShowLoginDialog] = useState(!userId);
  // const [toolbarHeight, setToolbarHeight] = useState('64px'); // Default height

  const handleLoginSuccess = (isLoggedIn, userId) => {
    setShowLoginDialog(false);
    setIsPageLoading(false);
    if (isLoggedIn && userId) {
      resetLogoutTimer();
    }
  };

  useEffect(() => {
    if (userId) {
      window.addEventListener('mousemove', resetLogoutTimer);
      window.addEventListener('keypress', resetLogoutTimer);
    }

    return () => {
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keypress', resetLogoutTimer);
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [userId, resetLogoutTimer]);

  useEffect(() => {
    console.log('useEffect triggered for fetch data');

    const fetchData = async () => {
      try {
        if (userId) {
          console.log('Fetching user data');
          await Promise.all([
            fetchAllCollectionsForUser(),
            fetchAllDecksForUser(),
            fetchUserCart(),
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchData();
  }, [userId, fetchAllCollectionsForUser, fetchAllDecksForUser, fetchUserCart]);

  useEffect(() => {
    if (isPageLoading) {
      loadingTimeoutRef.current = setTimeout(() => {
        handleLoadingTimeout();
        navigate('/login');
      }, 45000); // 45 seconds
    }
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isPageLoading, navigate, handleLoadingTimeout]);

  useEffect(() => {
    if (window.location.pathname === '/login') {
      setShowLoginDialog(true);
      setIsPageLoading(false);
      // setIsLoading(false);
    }
  }, []);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Helmet>{' '}
      {displaySplashPage()}
      {!userId ? (
        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLogin={handleLoginSuccess}
        />
      ) : (
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/userprofile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/collection"
              element={
                <PrivateRoute>
                  <CollectionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/deckbuilder"
              element={
                <PrivateRoute>
                  <DeckBuilderPage />
                </PrivateRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/threejs" element={<ThreeJsCube />} /> */}
            {/* <Route path="/cardDeck" element={<CardDeckAnimation />} /> */}
            <Route path="*" element={<NotFoundPage />} />{' '}
          </Routes>
          {/* <Footer /> */}
        </AppContainer>
      )}
    </>
  );
};

export default App;
