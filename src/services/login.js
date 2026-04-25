import authService from "../services/authService";

document.querySelector(".login-container form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const senha = e.target.senha.value.trim();
  const clinica = e.target.clinica ? e.target.clinica.value.trim() : localStorage.getItem("planoEscolhidoNome");

  if (!email || !senha || !clinica) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  try {
    const data = await authService.login(email, senha, clinica);

    // salva token e dados do usuário
    localStorage.setItem("token", data.token);
    localStorage.setItem("clinica", data.clinica);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);

    // redireciona para dashboard
    window.location.href = "/dashboard.html";
  } catch (err) {
    alert("Erro ao fazer login: " + err.message);
    console.error(err);
  }
});
