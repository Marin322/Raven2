import { Navigate } from "react-router-dom";

export const GuestRoute = ({children}) => {
    const isAuth = localStorage.getItem('token');

    if (isAuth) {
        return <Navigate to="/" replace />
    }

    return children;
} 