import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAdminEmail } from '../../lib/userProfile';

const ProtectedRoute = ({ children, requireAdmin = false, requireGuest = false }) => {
    const { currentUser, isAdmin, loading } = useAuth();
    const location = useLocation();
    const emailIsAdmin = currentUser?.email?.trim().toLowerCase() === getAdminEmail();
    const hasAdminAccess = isAdmin || emailIsAdmin;

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-brand-dark/60">
                Loading dashboard...
            </div>
        );
    }

    if (requireGuest) {
        if (!currentUser) return children;
        return <Navigate to={hasAdminAccess ? '/admin/dashboard' : '/dashboard'} replace />;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (requireAdmin && !hasAdminAccess) {
        return <Navigate to="/dashboard" replace />;
    }

    if (!requireAdmin && hasAdminAccess && location.pathname === '/dashboard') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
