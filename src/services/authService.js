import api from "./api";

const authService = {
  // Cadastro de usuário dentista
  signup: async ({ nome, email, senha, clinica, role, planoId }) => {
    try {
      const { data } = await api.post("/auth/register", {
        name: nome,
        email: email,
        senha: senha,
        clinica: clinica,
        role: role,
        planoId: planoId, // agora enviando o plano escolhido
      });
      return data;
    } catch (error) {
      throw new Error("Erro ao registrar usuário.");
    }
  },

  // Login de usuário dentista
  login: async (email, senha, clinica) => {
    try {
      const { data } = await api.post("/auth/login", {
        email: email,
        senha: senha,
        clinica: clinica,
      });
      // salva token no localStorage
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw new Error("Erro ao fazer login.");
    }
  },
};

export default authService;
