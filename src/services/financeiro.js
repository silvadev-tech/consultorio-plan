import financeiroService from "../services/financeiroService";
import Chart from "chart.js/auto"; // Chart.js já incluído via CDN no HTML

// Atualiza os cards de resumo
async function carregarResumo() {
  try {
    const [receitas, despesas, saldo] = await Promise.all([
      financeiroService.listarReceitas(),
      financeiroService.listarDespesas(),
      financeiroService.saldo()
    ]);

    document.getElementById("valor-receitas").textContent = `R$ ${receitas.data.total}`;
    document.getElementById("valor-despesas").textContent = `R$ ${despesas.data.total}`;
    document.getElementById("valor-saldo").textContent = `R$ ${saldo.data.total}`;
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar resumo financeiro.");
  }
}

// Renderiza os gráficos
async function carregarGraficos() {
  try {
    const relatorio = await financeiroService.relatorioMensal();

    // Gráfico de linha - fluxo de caixa mensal
    const ctxLine = document.getElementById("lineChart").getContext("2d");
    new Chart(ctxLine, {
      type: "line",
      data: {
        labels: relatorio.data.meses,
        datasets: [{
          label: "Fluxo de Caixa",
          data: relatorio.data.fluxoCaixa,
          borderColor: "#6c63ff",
          backgroundColor: "rgba(108,99,255,0.2)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Fluxo de Caixa Mensal" }
        }
      }
    });

    // Gráfico de barras - receitas vs despesas
    const ctxBar = document.getElementById("barChart").getContext("2d");
    new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: ["Receitas", "Despesas"],
        datasets: [{
          label: "Valores",
          data: [relatorio.data.totalReceitas, relatorio.data.totalDespesas],
          backgroundColor: ["#4CAF50", "#F44336"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Receitas vs Despesas" }
        }
      }
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar gráficos.");
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  carregarResumo();
  carregarGraficos();
});
