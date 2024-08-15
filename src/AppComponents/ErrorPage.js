import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to="/" className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;