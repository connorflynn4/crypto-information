import { SignIn } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import 'animate.css'; 

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 lg:p-12 min-h-screen lg:min-h-screen">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 animate__animated animate__fadeInDown">Welcome to CryptoApp</h1>
        <FontAwesomeIcon icon={faRocket} size="5x" className="animate__animated animate__bounceInUp" />
      </div>
      
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-white p-4 lg:p-8 min-h-screen lg:min-h-screen overflow-y-auto">
        <div className="p-6 lg:p-8 rounded-lg max-w-md w-full">
          <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  );
};

export default Login;
