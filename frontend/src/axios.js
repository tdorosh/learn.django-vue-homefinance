import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_URL,
});

export default axiosInstance;