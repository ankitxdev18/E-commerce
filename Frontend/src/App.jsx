import { useEffect } from "react";
import { asyncgetusers } from "./store/userActions";
import { useDispatch, useSelector } from "react-redux";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(asyncgetusers());
  }, []);

  return (
    <div className="w-screen  h-screen bg-gray-800 text-white ">
      <Mainroutes />
    </div>
  );
};

export default App;
