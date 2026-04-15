// src/services/financeiroService.js
import api from "./API";

const financeiroService = {
  listarReceitas: () => api.get("/financeiro/receitas"),
  listarDespesas: () => api.get("/financeiro/despesas"),
  saldo: () => api.get("/financeiro/saldo"),
  relatorioMensal: () => api.get("/financeiro/relatorio-mensal"),
};

export default financeiroService;
