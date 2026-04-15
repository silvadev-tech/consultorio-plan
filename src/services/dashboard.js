import Chart from "chart.js/auto";

// Função para atualizar os cards de resumo
function atualizarCards({ orcamentos, fechados, taxa }) {
  document.getElementById("total-orcamentos").textContent = orcamentos;
  document.getElementById("tratamentos-fechados").textContent = fechados;
  document.getElementById("taxa-conversao").textContent = `${taxa}%`;
}

// Função para renderizar gráfico de barras
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

// Função para renderizar gráfico de pizza
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

// Função para carregar e renderizar planos
async function carregarPlanos() {
  try {
    const response = await fetch("http://localhost:8080/planos");
    const planos = await response.json();

    const container = document.getElementById("planos-container");
    container.innerHTML = "";

    planos.forEach(plano => {
      const card = document.createElement("div");
      card.className = "plano-card";

      // Alerta visual se estiver perto do limite
      let alerta = "";
      if (plano.limitePacientes && plano.pacientesCadastrados) {
        const ocupacao = (plano.pacientesCadastrados / plano.limitePacientes) * 100;
        if (ocupacao >= 80) {
          alerta = `<p class="alerta">⚠️ Atenção: você já atingiu ${ocupacao.toFixed(0)}% do limite de pacientes!</p>`;
        }
      }

      card.innerHTML = `
        <h3>${plano.nome}</h3>
        <p><strong>Preço:</strong> R$ ${plano.preco}</p>
        <p><strong>Limite de pacientes:</strong> ${plano.limitePacientes}</p>
        <p><strong>Valor excedente:</strong> R$ ${plano.valorExcedente} por paciente</p>
        <p><strong>Benefícios:</strong> ${plano.beneficios}</p>
        ${alerta}
        <button class="btn-assinar" data-id="${plano.id}">Escolher Plano</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar planos:", error);
  }
}

// Função para assinar plano
async function assinarPlano(planoId) {
  try {
    const response = await fetch(`http://localhost:8080/planos/assinar/${planoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      alert("Plano assinado com sucesso!");
      carregarPlanos(); // Atualiza a tela
    } else {
      alert("Erro ao assinar o plano.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
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
  // Atualiza cards com dados simulados (depois conecta com services reais)
  atualizarCards({ orcamentos: 120, fechados: 85, taxa: 70.8 });

  // Renderiza gráficos
  renderizarBarChart(
    ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    [20,40,60,80,50,70,90,100,85,75,65,95]
  );
  renderizarPieChart(85, 35);

  // Carrega planos
  carregarPlanos();
});
