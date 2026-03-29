import { Navigate, replace } from "react-router-dom";

export const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === true) {
        return <Navigate to="/admin" replace/>
    }

    return children;
}