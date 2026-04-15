// src/services/authService.js
import api from "./API";

const authService = {
  // Login
  login: async (email, senha) => {
    const response = await api.post("/auth/login", { email, senha });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Cadastro (signup)
  signup: async (dados) => {
    const response = await api.post("/auth/signup", dados);
    return response.data;
  },

  // Recuperação de senha
  recoverPassword: async (email) => {
    const response = await api.post("/auth/recover", { email });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redireciona para login
  },

  // Obter token
  getToken: () => {
    return localStorage.getItem("token");
  }
};

export default authService;
