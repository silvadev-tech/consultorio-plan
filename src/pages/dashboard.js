import api from "../services/api";
import planoService from "../services/planoService";

// Carrega resumo geral
async function carregarResumo() {
  try {
    // Busca dados agregados direto do backend
    const resumoResponse = await api.get("/dashboard/resumo");
    const resumo = resumoResponse.data;

    atualizarCards({
      orcamentos: resumo.orcamentos,
      fechados: resumo.fechados,
      taxa: resumo.taxaConversao,
    });

    // Conversões mensais
    const conversoesResponse = await api.get("/dashboard/conversoes-mensais");
    const conversoes = conversoesResponse.data;
    renderizarBarChart(conversoes.labels, conversoes.data);

    // Fechados vs não fechados
    const fechadosResponse = await api.get("/dashboard/fechados-vs-nao-fechados");
    const fechadosData = fechadosResponse.data;
    renderizarPieChart(fechadosData.fechados, fechadosData.naoFechados);

    // Planos
    const planos = await planoService.listar();
    carregarPlanos(planos);

  } catch (err) {
    alert("Erro ao carregar resumo do dashboard.");
    console.error(err);
  }
}

// Atualiza cards
function atualizarCards({ orcamentos, fechados, taxa }) {
  const orcamentosCard = document.querySelector("#card-orcamentos .card-value");
  const fechadosCard = document.querySelector("#card-fechados .card-value");
  const conversaoCard = document.querySelector("#card-conversao .card-value");

  if (orcamentosCard) orcamentosCard.textContent = orcamentos;
  if (fechadosCard) fechadosCard.textContent = fechados;
  if (conversaoCard) conversaoCard.textContent = `${taxa}%`;
}

// Renderiza gráfico de barras
function renderizarBarChart(labels, data) {
  const ctx = document.getElementById("barChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Conversões",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Renderiza gráfico de pizza
function renderizarPieChart(fechados, naoFechados) {
  const ctx = document.getElementById("pieChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Fechados", "Não Fechados"],
      datasets: [{
        data: [fechados, naoFechados],
        backgroundColor: ["#4CAF50", "#F44336"]
      }]
    },
    options: {
      responsive: true
    }
  });
}

// Renderiza tabela de planos
function carregarPlanos(planos) {
  const tbody = document.querySelector("#planos-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  planos.forEach(({ nome, preco }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nome}</td>
      <td>${preco.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", carregarResumo);
