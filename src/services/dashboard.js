import Chart from "chart.js/auto";
import planoService from "../services/planoService"; // importa o service

// Atualiza os cards de resumo
function atualizarCards({ orcamentos, fechados, taxa }) {
  document.getElementById("total-orcamentos").textContent = orcamentos;
  document.getElementById("tratamentos-fechados").textContent = fechados;
  document.getElementById("taxa-conversao").textContent = `${taxa}%`;
}

// Renderiza gráfico de barras
function renderizarBarChart(meses, conversoes) {
  const ctxBar = document.getElementById("barChart").getContext("2d");
  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [{
        label: "Conversões",
        data: conversoes,
        backgroundColor: "#6c63ff"
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
  const ctxPie = document.getElementById("pieChart").getContext("2d");
  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Fechados","Não Fechados"],
      datasets: [{
        data: [fechados, naoFechados],
        backgroundColor: ["#4CAF50","#F44336"]
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

// Carrega e renderiza planos
async function carregarPlanos() {
  try {
    const planos = await planoService.listar(); // usa o service
    const tipos = await planoService.listarTipos(); // nomes oficiais do enum

    const container = document.getElementById("planos-container");
    container.innerHTML = "";

    planos.forEach(plano => {
      const card = document.createElement("div");
      card.className = "plano-card";

      card.innerHTML = `
        <h3>${plano.nome}</h3>
        <p><strong>Preço:</strong> R$ ${plano.valor}</p>
        <p><strong>Limite de pacientes:</strong> ${plano.limitePacientes}</p>
        <p><strong>Funcionalidades:</strong> ${plano.funcionalidades.join(", ")}</p>
        <button class="btn-assinar" data-id="${plano.id}">Escolher Plano</button>
      `;

      container.appendChild(card);
    });

    // Exibe os tipos oficiais em console (ou pode renderizar em tela)
    console.log("Tipos de plano disponíveis:", tipos);

  } catch (error) {
    console.error("Erro ao carregar planos:", error);
  }
}

// Assinar plano
async function assinarPlano(planoId) {
  try {
    const planoAssinado = await planoService.assinar(planoId);
    alert(`Plano "${planoAssinado.nome}" assinado com sucesso!`);

    // Atualiza seção do plano ativo
    const planoAtivoContainer = document.getElementById("plano-ativo");
    planoAtivoContainer.innerHTML = `
      <h2>Plano Ativo</h2>
      <p><strong>Nome:</strong> ${planoAssinado.nome}</p>
      <p><strong>Preço:</strong> R$ ${planoAssinado.valor}</p>
      <p><strong>Limite de pacientes:</strong> ${planoAssinado.limitePacientes}</p>
      <p><strong>Funcionalidades:</strong> ${planoAssinado.funcionalidades.join(", ")}</p>
    `;

    carregarPlanos();
  } catch (error) {
    console.error("Erro ao assinar plano:", error);
    alert("Erro ao assinar o plano.");
  }
}

// Listener para botões de assinatura
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-assinar")) {
    const planoId = e.target.getAttribute("data-id");
    assinarPlano(planoId);
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado para acessar o dashboard.");
    window.location.href = "/login.html";
    return;
  }

  atualizarCards({ orcamentos: 120, fechados: 85, taxa: 70.8 });
  renderizarBarChart(
    ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    [20,40,60,80,50,70,90,100,85,75,65,95]
  );
  renderizarPieChart(85, 35);

  carregarPlanos();
});
