import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/ui/Loader";

const PublicRoute = ({ children }) => {
    const { user, authChecked } = useSelector((state) => state.userReducer);

    if (!authChecked) {
        return <Loader message="Checking your session..." />;
    }

    return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
