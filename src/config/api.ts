import axios from 'axios';
import { log } from 'console';

// Base URL de la API - usar variable de entorno
const API_BASE_URL = import.meta.env.VITE_REACT_API_BASE_URL;
// Crear instancia de axios con configuración global
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Aquí se pueden agregar headers adicionales si es necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      // Token expirado o no autorizado
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
