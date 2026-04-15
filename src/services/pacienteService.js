// src/services/pacienteService.js
import api from "./api";

const pacienteService = {
  // Listar todos os pacientes
  listar: async () => {
    try {
      const { data } = await api.get("/pacientes");
      return data;
    } catch (error) {
      throw new Error("Erro ao listar pacientes.");
    }
  },

  // Buscar paciente por ID
  buscarPorId: async (id) => {
    try {
      const { data } = await api.get(`/pacientes/${id}`);
      return data;
    } catch (error) {
      throw new Error("Paciente não encontrado.");
    }
  },

  // Criar novo paciente
  criar: async (dados) => {
    try {
      const { data } = await api.post("/pacientes", dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao criar paciente.");
    }
  },

  // Atualizar paciente existente
  atualizar: async (id, dados) => {
    try {
      const { data } = await api.put(`/pacientes/${id}`, dados);
      return data;
    } catch (error) {
      throw new Error("Erro ao atualizar paciente.");
    }
  },

  // Remover paciente
  remover: async (id) => {
    try {
      await api.delete(`/pacientes/${id}`);
      return true;
    } catch (error) {
      throw new Error("Erro ao remover paciente.");
    }
  }
};

export default pacienteService;
