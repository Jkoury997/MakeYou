import { Navigate } from 'react-router-dom';
import checkToken from "../api/checkToken"

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = checkToken.isUserAuthenticated();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
