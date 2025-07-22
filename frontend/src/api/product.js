import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.SERVER_URL}/product`, 
    withCredentials: true
});

export default instance;
