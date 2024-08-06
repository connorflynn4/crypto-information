import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Cryptocurrencies from './pages/Cryptocurrencies';
import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import { useUser } from '@clerk/clerk-react';
import { ClipLoader } from 'react-spinners';

const App: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#123abc" loading={true} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isSignedIn && <Sidebar />}
      <div className={`flex-grow overflow-auto`}>
        <Routes>
          <Route path="/" element={isSignedIn ? <Navigate to="/homepage" /> : <Navigate to="/login" />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cryptocurrencies"
            element={
              <ProtectedRoute>
                <Cryptocurrencies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route path="/login/*" element={<Login />} />
          <Route path="/sign-up/*" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
