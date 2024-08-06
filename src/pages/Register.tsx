import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
};

export default Register;
