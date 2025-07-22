import axios from "axios";

const instance = axios.create({
    baseURL: 'https://devsneha.onrender.com/product', 
    withCredentials: true
});

export default instance;
