import { useSelector } from "react-redux";

const useAuth = () => {
    const { user, authChecked, status, error } = useSelector((state) => state.userReducer);
    return {
        user,
        authChecked,
        isAuthenticated: Boolean(user),
        authLoading: status === "loading",
        authError: error,
    };
};

export default useAuth;
