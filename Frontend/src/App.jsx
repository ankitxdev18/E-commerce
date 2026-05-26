import { useEffect } from "react";
import axios from "./api/axiosconfig";

const App = () => {
  const getProduct = async () => {
    try {
      const res = await axios.get("/products");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>App</div>;
};

export default App;
