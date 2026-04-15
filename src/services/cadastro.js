import authService from "../services/authService";

document.querySelector(".signup-container form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = {
    nome: e.target.nome.value,
    email: e.target.email.value,
    senha: e.target.senha.value,
  };
  try {
    await authService.signup(dados);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/login.html";
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});
