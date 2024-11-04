import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Clerk App</h1>
      <p className="text-lg text-gray-700 mb-2">This is a public homepage that anyone can view.</p>
      <p className="text-md text-gray-600">Please sign in to access more features.</p>
    </div>
  );
};

export { HomePage as default };