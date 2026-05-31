import { useEffect } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ModernNav />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pb-20"
      >
        <Mainroutes />
      </motion.main>
    </div>
  );
};

export default App;
