import planoService from "../services/planoService";

async function carregarPlanos() {
  try {
    const planos = await planoService.listar();
    const tbody = document.querySelector("#planos-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    planos.forEach(({ id, nome, preco }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nome}</td>
        <td>R$ ${preco.toFixed(2)}</td>
        <td><button class="selecionar-plano" data-id="${id}" data-nome="${nome}">Selecionar</button></td>
      `;
      tbody.appendChild(tr);
    });

    // adiciona listeners nos botões
    document.querySelectorAll(".selecionar-plano").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const planoId = e.target.dataset.id;
        const planoNome = e.target.dataset.nome;
        // salva escolha do plano
        localStorage.setItem("planoEscolhidoId", planoId);
        localStorage.setItem("planoEscolhidoNome", planoNome);
        // redireciona para cadastro
        window.location.href = "/cadastro.html";
      });
    });
  } catch (err) {
    alert("Erro ao carregar planos.");
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", carregarPlanos);
