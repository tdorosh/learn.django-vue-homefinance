import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.baseURL || 'http://127.0.0.1:8000/',
});

export default axiosInstance;