import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
    const { user, authChecked } = useSelector((state) => state.userReducer);

    if (!authChecked) {
        return <Loader message="Checking your session..." />;
    }

    return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
