import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState(""); // Ajustado para 'name'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Mudei de 'senha' para 'password' para bater com o Java padrão
  const [clinica, setClinica] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const planoId = localStorage.getItem("planoEscolhidoId"); // Pega o plano da tela anterior

    if (!name || !email || !password || !clinica) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    try {
      // O objeto aqui deve ser IGUAL ao seu DTO no Java
      await api.post("/auth/register", {
        name,
        email,
        password, // enviando como password
        clinica,
        planoId: planoId ? Number(planoId) : null // Envia o ID do plano escolhido
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data);
      setErrorMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro OdontoPlan</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input
        type="text"
        placeholder="Nome Completo"
        name="name" // Adicionado para evitar o aviso do Chrome
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
        placeholder="Senha"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
