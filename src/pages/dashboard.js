import Chart from "chart.js/auto";
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
        legend: { display: false },
        title: { display: true, text: "Conversões Mensais" }
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
      responsive: true,
      plugins: {
        title: { display: true, text: "Fechados vs Não Fechados" }
      }
    }
  });
}

// Renderiza cards comparativos de planos
function carregarPlanos(planos) {
  const container = document.getElementById("planos-container");
  if (!container) return;

  container.innerHTML = "";
  planos.forEach(({ id, nome, valor, limitePacientes, funcionalidades }) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="plano-card">
        <h3>${nome}</h3>
        <p><strong>Preço:</strong> R$ ${valor.toFixed(2)}/mês</p>
        <ul>
          <li>✓ Limite: ${limitePacientes} pacientes</li>
          <li>✓ Funcionalidades: ${funcionalidades.join(", ")}</li>
        </ul>
        <button class="btn-assinar" data-id="${id}">Escolher Plano</button>
      </div>
    `;

    container.appendChild(col);
  });
}

// Listener para assinar plano
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-assinar")) {
    const planoId = e.target.getAttribute("data-id");
    try {
      const planoAssinado = await planoService.assinar(planoId);
      alert(`Plano "${planoAssinado.nome}" assinado com sucesso!`);

      // Atualiza seção de plano ativo
      const planoAtivoContainer = document.getElementById("plano-ativo");
      if (planoAtivoContainer) {
        planoAtivoContainer.innerHTML = `
          <h2>Plano Ativo</h2>
          <p><strong>Nome:</strong> ${planoAssinado.nome}</p>
          <p><strong>Preço:</strong> R$ ${planoAssinado.valor.toFixed(2)}</p>
          <p><strong>Limite de pacientes:</strong> ${planoAssinado.limitePacientes}</p>
          <p><strong>Funcionalidades:</strong> ${planoAssinado.funcionalidades.join(", ")}</p>
        `;
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao assinar plano.");
    }
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", carregarResumo);
