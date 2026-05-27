import { useEffect } from "react";
import { asyncgetusers } from "./store/userActions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncgetusers());
  }, []);

  return <div>App</div>;
};

export default App;
