import api from "./api"; // Importa a instância do Axios que já tem a URL do Railway

const dashboardService = {
  // Busca o resumo (cards)
  getResumo: async () => {
    try {
      const response = await api.get("/dashboard/resumo");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar resumo:", error);
      throw error;
    }
  },

  // Busca a lista de pacientes (usada no seu Dashboard.jsx)
  listarPacientes: async () => {
    try {
      const response = await api.get("/pacientes"); // ou a rota correta do seu backend
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      throw error;
    }
  }
};

export default dashboardService;
