import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const andersonApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar intercepteros
andersonApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }

    return config;
});

export default andersonApi;