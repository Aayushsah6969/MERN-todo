import React from 'react';

export default function PageNotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-red-600">404</h2>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a 
          href="/" 
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
