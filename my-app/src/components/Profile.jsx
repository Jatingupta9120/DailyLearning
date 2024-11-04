import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <UserProfile path="/profile" routing="path" />
    </div>
  );
};

export { Profile as default };