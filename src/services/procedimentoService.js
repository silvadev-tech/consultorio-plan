// src/services/procedimentoService.js
import api from "./api";

const procedimentoService = {
  // Listar todos os procedimentos
  listar: async () => {
    try {
      const { data } = await api.get("/procedimentos");
      return data;
    } catch (error) {
      throw new Error("Erro ao listar procedimentos.");
    }
  },

  // Buscar procedimento por ID
  buscarPorId: async (id) => {
    try {
      const { data } = await api.get(`/procedimentos/${id}`);
      return data;
    } catch (error) {
      throw new Error("Procedimento não encontrado.");
    }
  },

  // Criar novo procedimento
  criar: async (dados) => {
    try {
      const { data } = await api.post("/procedimentos", dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao criar procedimento.");
    }
  },

  // Atualizar procedimento existente
  atualizar: async (id, dados) => {
    try {
      const { data } = await api.put(`/procedimentos/${id}`, dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao atualizar procedimento.");
    }
  },

  // Remover procedimento
  remover: async (id) => {
    try {
      await api.delete(`/procedimentos/${id}`);
      return true;
    } catch (error) {
      throw new Error("Erro ao remover procedimento.");
    }
  }
};

export default procedimentoService;
