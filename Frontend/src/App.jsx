import { useEffect } from "react";
import { asyncregisteruser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";

const App = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(asyncregisteruser());
  }, []);

  return (
    <div className="font-thin w-screen  h-screen bg-gray-800 text-white px-[10%]">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
