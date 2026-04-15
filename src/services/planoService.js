import api from "./api";

const planoService = {
  // Listar todos os planos
  listar: async () => {
    try {
      const { data } = await api.get("/planos");
      return data;
    } catch (error) {
      throw new Error("Erro ao listar planos.");
    }
  },

  // Buscar plano por ID
  buscarPorId: async (id) => {
    try {
      const { data } = await api.get(`/planos/${id}`);
      return data;
    } catch (error) {
      throw new Error("Plano não encontrado.");
    }
  },

  // Criar novo plano
  criar: async (dados) => {
    try {
      const { data } = await api.post("/planos", dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao criar plano.");
    }
  },

  // Atualizar plano existente
  atualizar: async (id, dados) => {
    try {
      const { data } = await api.put(`/planos/${id}`, dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao atualizar plano.");
    }
  },

  // Remover plano
  remover: async (id) => {
    try {
      await api.delete(`/planos/${id}`);
      return true;
    } catch (error) {
      throw new Error("Erro ao remover plano.");
    }
  }
};

export default planoService;
