import React, { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [clinica, setClinica] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Aqui você chama sua API de cadastro
    console.log({ nome, email, senha, clinica });
  };

  return (
    <form onSubmit={handleRegister}>
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
