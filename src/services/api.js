import axios from "axios";

// Substitua pela sua URL real do Railway (com https://)
const API_URL = "https://odontologia-production-7891.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT em todas as chamadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ou use seu authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globais (como token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se der erro 401 (Não autorizado), limpa o token e manda pro login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
