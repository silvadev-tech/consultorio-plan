import planoService from "../services/planoService";

async function carregarPlanos() {
  try {
    const planos = await planoService.listar();
    const tbody = document.querySelector("#planos-table tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // limpa antes de renderizar

    planos.forEach(({ nome, preco }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nome}</td>
        <td>${preco.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Erro ao carregar planos. Verifique sua conexão.");
    console.error(err);
  }
}

// Inicialização ao abrir a página
document.addEventListener("DOMContentLoaded", carregarPlanos);

// Listener para criar plano
const form = document.querySelector(".plano-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      nome: e.target.nome.value.trim(),
      preco: parseFloat(e.target.preco.value),
    };

    if (!dados.nome || isNaN(dados.preco)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await planoService.criar(dados);
      alert("Plano cadastrado com sucesso!");
      carregarPlanos(); // recarrega lista depois de cadastrar
      form.reset(); // limpa o formulário
    } catch (err) {
      alert("Erro ao cadastrar plano. Tente novamente.");
      console.error(err);
    }
  });
}
