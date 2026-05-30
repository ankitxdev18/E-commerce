import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = (props) => {
    const { user, authChecked } = useSelector((state) => state.userReducer);
    if (!authChecked) {
        return <div className="p-5">Restoring session...</div>;
    }
    return user ? props.children : <Navigate to="/signin" />;
};

export default Auth;
