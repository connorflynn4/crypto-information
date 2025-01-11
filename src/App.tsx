import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Cryptocurrencies from './pages/Cryptocurrencies';
import CoinDetail from './pages/CoinDetail';
import News from './pages/News';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const location = useLocation();

  // Determine if the current page is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex h-screen">
      {/* Conditionally render Sidebar */}
      {!isLoginPage && <Sidebar />}

      {/* Main Content */}
      <div
        className={`flex-grow overflow-auto ${
          !isLoginPage ? '' : ''
        }`} /* Adjust padding only when sidebar is visible on large screens */
      >
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route: Login */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/coin/:uuid" element={<CoinDetail />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
