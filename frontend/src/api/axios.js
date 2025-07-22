import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.SERVER_URL}/user`, 
    withCredentials: true
});

export default instance;
