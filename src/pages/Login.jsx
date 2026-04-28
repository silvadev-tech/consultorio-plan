import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState(""); // Mudamos para email
  const [senha, setSenha] = useState(""); // Mudamos para senha (igual ao Java)
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverLoading, setServerLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }

    if (localStorage.getItem("sessionExpired")) {
      setErrorMessage("Sua sessão expirou. Faça login novamente.");
      localStorage.removeItem("sessionExpired");
    }

    // Acorda o servidor no Railway
    api.get("/planos") // Usando uma rota que sabemos que existe
      .then(() => setServerLoading(false))
      .catch(() => setServerLoading(false));
  }, [navigate]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!email || !senha) {
      setErrorMessage("Preencha e-mail e senha.");
      setLoading(false);
      return;
    }

    try {
      // O objeto enviado deve bater com o seu LoginDTO no Java
      const response = await api.post("/auth/login", {
        email, // Enviando como email
        senha  // Enviando como senha (importante!)
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Limpa dados temporários do plano após o login com sucesso
      localStorage.removeItem("planoEscolhidoId");
      localStorage.removeItem("planoEscolhidoNome");

      navigate("/agenda");
    } catch (error) {
      console.error("Erro no login:", error.response?.data);
      if (error.response && error.response.status === 403) {
        setErrorMessage("E-mail ou senha incorretos.");
      } else {
        setErrorMessage("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login OdontoPlan</h2>

      {serverLoading && (
        <p className="info-message">Conectando ao servidor... aguarde.</p>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
          autoComplete="current-password"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
