import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css"; // importa o CSS do spinner e estilos

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Se já houver token, redireciona direto para o dashboard
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }

    // Mensagem de sessão expirada
    if (localStorage.getItem("sessionExpired")) {
      setErrorMessage("Sua sessão expirou. Faça login novamente.");
      localStorage.removeItem("sessionExpired");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    // Validação simples antes de enviar
    if (!username || !password) {
      setErrorMessage("Preencha usuário e senha.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Usuário ou senha inválidos.");
      } else {
        setErrorMessage("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Entrar"}
      </button>
    </div>
  );
}
// vai vagabundo faz o commit