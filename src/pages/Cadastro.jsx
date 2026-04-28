import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // 1. Mudei de 'password' para 'senha'
  const [clinica, setClinica] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const planoId = localStorage.getItem("planoEscolhidoId");

    // REGRAS DA SUA VALIDAÇÃO JAVA:
    // - Senha deve ter exatamente 6 números.
    if (senha.length !== 6 || !/^\d+$/.test(senha)) {
      setErrorMessage("A senha deve ter exatamente 6 números.");
      return;
    }

    if (!name || !email || !senha || !clinica) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    try {
      // 2. O objeto enviado agora bate 100% com o RegisterDTO.java
      await api.post("/auth/register", {
        name,
        email,
        senha,     // Enviando como 'senha' (igual ao Java)
        clinica,   // Enviando como 'clinica' (igual ao Java)
        planoId: planoId ? Number(planoId) : null
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro do servidor:", error.response?.data);
      setErrorMessage("Erro ao cadastrar. Verifique os dados ou se o e-mail já existe.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro OdontoPlan</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input
        type="text"
        placeholder="Nome Completo"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha (6 números)"
        name="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        maxLength={6}
        autoComplete="new-password"
      />
      <input
        type="text"
        placeholder="Nome da clínica"
        name="clinica"
        value={clinica}
        onChange={(e) => setClinica(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
