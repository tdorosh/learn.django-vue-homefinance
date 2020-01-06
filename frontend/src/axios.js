import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://django-vue-homefinance.herokuapp.com/',
});

export default axiosInstance;