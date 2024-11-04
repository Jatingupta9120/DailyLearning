import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import './index.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* HomePage Route */}
          <Route
            path="/"
            element={<HomePage />}
          />
          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />
          {/* Sign In Route */}
          <Route
            path="/sign-in"
            element={
              <SignedOut>
                <SignInPage />
              </SignedOut>
            }
          />
          {/* Sign Up Route */}
          <Route
            path="/sign-up"
            element={
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            }
          />
          {/* Redirect unauthenticated to sign-in */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;