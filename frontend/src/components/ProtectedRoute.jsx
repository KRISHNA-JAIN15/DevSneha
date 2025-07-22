import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        // User not logged in
        return <Navigate to="/" />;
    }

    if (requireAdmin && user.role !== 'admin') {
        // User is not admin but trying to access admin-only route
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
