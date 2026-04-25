import api from "./api";

const planoService = {
  // Listar todos os planos
  listar: async () => {
    try {
      const { data } = await api.get("/planos");
      return data; // retorna lista de PlanoDTO
    } catch (error) {
      throw new Error("Erro ao listar planos.");
    }
  },

  // Buscar plano por ID
  buscarPorId: async (id) => {
    try {
      const { data } = await api.get(`/planos/${id}`);
      return data; // retorna PlanoDTO
    } catch (error) {
      throw new Error("Plano não encontrado.");
    }
  },

  // Criar novo plano
  criar: async (dados) => {
    try {
      const { data } = await api.post("/planos", dados);
      return data; // retorna PlanoDTO
    } catch (error) {
      throw new Error("Erro ao criar plano.");
    }
  },

  // Atualizar plano existente
  atualizar: async (id, dados) => {
    try {
      const { data } = await api.put(`/planos/${id}`, dados);
      return data; // retorna PlanoDTO
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
  },

  // Assinar plano (usuário logado)
  assinar: async (id) => {
    try {
      const { data } = await api.post(`/planos/assinar/${id}`);
      return data; // retorna PlanoDTO do plano assinado
    } catch (error) {
      throw new Error("Erro ao assinar plano.");
    }
  },

  // Listar tipos de plano (enum oficial)
  listarTipos: async () => {
    try {
      const { data } = await api.get("/planos/tipos");
      return data; // retorna ["Básico","Premium","Profissional"]
    } catch (error) {
      throw new Error("Erro ao listar tipos de plano.");
    }
  }
};

export default planoService;
