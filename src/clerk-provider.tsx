import React from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import App from './App';

const clerkPublishableKey = import.meta.env.VITE_CLERK_FRONTEND_API

const ClerkProviderWithRouter: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <App />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

export default ClerkProviderWithRouter;
