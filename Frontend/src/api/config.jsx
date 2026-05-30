import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 10000,
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data || error.response);
        }
        return Promise.reject(error);
    }
);

export default instance;
