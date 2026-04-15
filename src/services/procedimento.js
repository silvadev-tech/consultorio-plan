import procedimentoService from "../services/procedimentoService";

async function carregarProcedimentos() {
  try {
    const procedimentos = await procedimentoService.listar();
    const tbody = document.querySelector("#procedimentos-table tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // limpa antes de renderizar

    procedimentos.forEach(({ descricao, valor, pacienteId }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${descricao}</td>
        <td>${valor.toFixed(2)}</td>
        <td>${pacienteId}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Erro ao carregar procedimentos. Verifique sua conexão.");
    console.error(err);
  }
}

// Inicialização ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProcedimentos);

// Listener para criar procedimento
const form = document.querySelector(".procedimento-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      descricao: e.target.descricao.value.trim(),
      valor: parseFloat(e.target.valor.value),
      pacienteId: parseInt(e.target.pacienteId.value, 10),
    };

    if (!dados.descricao || isNaN(dados.valor) || isNaN(dados.pacienteId)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await procedimentoService.criar(dados);
      alert("Procedimento cadastrado com sucesso!");
      carregarProcedimentos(); // recarrega lista depois de cadastrar
      form.reset(); // limpa o formulário
    } catch (err) {
      alert("Erro ao cadastrar procedimento. Tente novamente.");
      console.error(err);
    }
  });
}
