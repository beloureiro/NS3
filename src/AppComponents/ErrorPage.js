import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page Not Found</p>
        <a href="/" className="text-green-400 hover:underline">Go to Homepage</a>
      </div>
    </div>
  );
};

export default ErrorPage;
