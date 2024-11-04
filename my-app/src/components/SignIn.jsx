import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-cyan-300"> {/* Updated background color */}
    <div className="text-center">
      <SignIn path="/sign-in" routing="path" />
    </div>
  </div>
);

export default SignInPage;
