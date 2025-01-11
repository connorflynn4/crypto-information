import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleEnterClick = () => {
    navigate('/homepage'); // Navigate to the Homepage
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 lg:p-12 min-h-screen">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 animate__animated animate__fadeInDown">
          Welcome to CryptoApp
        </h1>
        <FontAwesomeIcon icon={faRocket} size="5x" className="animate__animated animate__bounceInUp" />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 lg:p-8 min-h-screen overflow-y-auto">
        <div className="p-6 lg:p-8 rounded-lg max-w-lg w-full text-center bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Ready to Explore the World of Crypto?</h2>
          <p className="text-gray-600 mb-6">
            Dive into the latest cryptocurrency trends, insights, and real-time market updates.
          </p>
          <button
            onClick={handleEnterClick}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Click to Enter
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
