import axios from 'axios';
import appConfig from './config'; 

const { apiBaseUrl, defaultTimeout, defaultHeaders } = appConfig;

// Updating Axios configuration with your app's specifics
const appAxios = axios.create({
    baseURL: apiBaseUrl,
    timeout: defaultTimeout,
    headers: defaultHeaders, 
});

appAxios.interceptors.request.use(config => {
    const temp = localStorage.getItem('temp');
    if(temp){
        localStorage.removeItem('temp');
        localStorage.removeItem('token');
    }
    const token = localStorage.getItem('token');
    const decryptedToken = atob(token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${decryptedToken}`;
    }
    return config;
}, error => Promise.reject(error));

// Adding a response interceptor for centralized error handling
appAxios.interceptors.response.use(response => response, error => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('Request timeout, please try again later');
    }
    return Promise.reject(error);
});

export default appAxios;
