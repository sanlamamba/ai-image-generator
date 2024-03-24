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
    const token = "SUPER_SECRET_TOKEN";
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
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
