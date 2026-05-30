import { useEffect } from "react";
import { asynccurrentuser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { asyncloadproducts } from "./store/actions/productActions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynccurrentuser());
    dispatch(asyncloadproducts());
  }, [dispatch]);

  return (
    <div className="font-thin w-screen  h-screen bg-gray-800 text-white px-[10%]">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
