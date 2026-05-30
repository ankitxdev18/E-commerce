import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Unauth = (props) => {
    const { user, authChecked } = useSelector((state) => state.userReducer);
    if (!authChecked) {
        return <div className="p-5">Checking authentication...</div>;
    }
    return !user ? props.children : <Navigate to="/" />;
};

export default Unauth;
