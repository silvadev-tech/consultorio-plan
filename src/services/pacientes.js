import pacienteService from "../services/pacienteService";

async function carregarPacientes() {
  try {
    const pacientes = await pacienteService.listar();
    const tbody = document.querySelector("#pacientes-table tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // limpa antes de renderizar

    pacientes.forEach(({ nome, email, telefone }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${telefone}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert("Erro ao carregar pacientes. Verifique sua conexão.");
    console.error(err);
  }
}

// Inicialização ao abrir a página
document.addEventListener("DOMContentLoaded", carregarPacientes);

// Listener para criar paciente
const form = document.querySelector(".paciente-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      nome: e.target.nome.value.trim(),
      email: e.target.email.value.trim(),
      telefone: e.target.telefone.value.trim(),
    };

    if (!dados.nome || !dados.email || !dados.telefone) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await pacienteService.criar(dados);
      alert("Paciente cadastrado com sucesso!");
      carregarPacientes(); // recarrega lista depois de cadastrar
      form.reset(); // limpa o formulário
    } catch (err) {
      alert("Erro ao cadastrar paciente. Tente novamente.");
      console.error(err);
    }
  });
}
