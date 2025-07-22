// src/pages/404.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            <h1 className="text-8xl font-extrabold text-gray-800 mb-6 animate-pulse">404</h1>
            <p className="text-2xl text-gray-700 mb-8 max-w-md">
                Oops! The page you're looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
