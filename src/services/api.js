// src/services/api.js
import axios from "axios";
import authService from "./authService";

const api = axios.create({
  baseURL: "https://odontologia-1-ev6n.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado → remove e redireciona
      authService.logout();
      localStorage.setItem("sessionExpired", "true");
    }
    return Promise.reject(error);
  }
);

export default api;
