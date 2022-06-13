import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/" replace />
    }

    return children;
}

export const SuperAdminPreviledgeRoute = ({ user, children }) => {
    if (!user.role.includes('ROLE_SUPERADMIN')) {
        return <Navigate to="/dashboard" replace />
    }
    return children;
}