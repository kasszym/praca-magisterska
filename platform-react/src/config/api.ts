import axios from 'axios';
import { toast } from 'react-toastify';

const API_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
};

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: API_HEADERS,
  timeout: 20000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.data?.message && !error.response?.data?.errors) {
      toast.error(error.response.data.message);
    } else if (!error.response) {
      toast.error('Błąd połączenia z serwerem');
    }
    
    return Promise.reject(error);
  }
);

export default API;
