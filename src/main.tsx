import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_FRONTEND_API;

if (!clerkPublishableKey) {
  throw new Error('Missing Clerk publishable key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <App />
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);

