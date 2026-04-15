import authService from "../services/authService";

document.querySelector(".login-container form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const senha = e.target.senha.value;

  try {
    await authService.login(email, senha);
    window.location.href = "/dashboard.html";
  } catch (err) {
    alert("Erro ao fazer login: " + err.message);
  }
});
