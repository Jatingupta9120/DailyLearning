import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-pink-300">
    <div className="text-center">
      <SignUp path="/sign-up" routing="path" />
    </div>
  </div>
);


export { SignUpPage as default};