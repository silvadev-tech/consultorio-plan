import React, { useState } from "react";
import "./Cadastro.css"; // importa o estilo

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui você pode integrar com sua API
    console.log("Dados enviados:", { nome, email, senha });
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
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
        <button type="submit" className="cadastro-button">
          Registrar
        </button>
      </form>
      <p>
        Já tem conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default Cadastro;
