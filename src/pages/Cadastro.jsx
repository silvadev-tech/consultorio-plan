import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [clinica, setClinica] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !senha || !clinica) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        senha,
        tenantId: clinica, // 🔹 enviando como tenantId
      });

      // Depois de cadastrar, redireciona para login
      navigate("/login");
    } catch (error) {
      setErrorMessage("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input
        type="text"
        placeholder="Name"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome da clínica"
        value={clinica}
        onChange={(e) => setClinica(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
// adicionado botão clinica