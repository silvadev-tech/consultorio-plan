import authService from "../services/authService";

document.querySelector(".signup-container form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const planoId = localStorage.getItem("planoEscolhidoId");
  const planoNome = localStorage.getItem("planoEscolhidoNome");

  const dados = {
    nome: e.target.nome.value,
    email: e.target.email.value,
    senha: e.target.senha.value,
    clinica: planoNome, // continua existindo
    role: "USER",       // padrão
    planoId: planoId,   // envia o ID do plano
  };

  try {
    await authService.signup(dados);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/login.html";
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});
