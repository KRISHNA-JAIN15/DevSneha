import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.SERVER_URL}/product`, 
    withCredentials: true
});

export default instance;
