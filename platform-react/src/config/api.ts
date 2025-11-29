import axios from 'axios';

const API_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
};

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: API_HEADERS,
  timeout: 20000,
});

// Add authorization token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default API;
