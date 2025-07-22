import axios from "axios";

const instance = axios.create({
    baseURL: 'https://devsneha.onrender.com/user', 
    withCredentials: true
});

export default instance;
