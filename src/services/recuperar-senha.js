import authService from "../services/authService";

document.querySelector(".recover-container form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  try {
    await authService.recoverPassword(email);
    alert("Instruções de recuperação enviadas para seu e-mail!");
  } catch (err) {
    alert("Erro ao recuperar senha: " + err.message);
  }
});
