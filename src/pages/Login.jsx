import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState(""); // 🔹 novo campo
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

    api.get("/health")
      .then(() => {
        console.log("Servidor acordado");
        setServerLoading(false);
      })
      .catch(() => {
        console.log("Servidor ainda iniciando...");
        setServerLoading(false);
      });
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    if (!username || !password || !tenantId) {
      setErrorMessage("Preencha usuário, senha e tenant.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
        tenantId, // 🔹 agora enviado junto
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

      {serverLoading && (
        <p className="info-message">Conectando ao servidor... pode levar alguns segundos.</p>
      )}

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
      <input
        type="text"
        placeholder="Tenant"
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
        disabled={loading}
      />
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Entrar"}
      </button>

      {loading && <p>Conectando ao servidor... pode levar alguns segundos.</p>}
    </div>
  );
}
