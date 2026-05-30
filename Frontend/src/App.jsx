import { useEffect } from "react";
import ModernNav from "./components/ModernNav";
import Mainroutes from "./routes/Mainroutes";
import { useDispatch } from "react-redux";
import { restoreSession } from "./store/slices/userSlice";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white">
            <ModernNav />
            <Mainroutes />
        </div>
    );
};

export default App;
