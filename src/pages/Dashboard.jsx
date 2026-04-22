import React, { useEffect, useState } from "react";

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [erro, setErro] = useState(null);

  // Mock de pacientes
  const pacientesMock = [
    { id: 1, nome: "Maria Silva", idade: 32 },
    { id: 2, nome: "João Souza", idade: 45 },
    { id: 3, nome: "Ana Costa", idade: 28 },
  ];

  useEffect(() => {
    async function carregarPacientes() {
      try {
        // Exemplo de chamada ao backend
        const resp = await fetch("http://localhost:3000/pacientes");
        if (!resp.ok) throw new Error("Erro na API");
        const dados = await resp.json();
        setPacientes(dados);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
        setErro("Usando dados mockados");
        setPacientes(pacientesMock);
      }
    }
    carregarPacientes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <h2>Lista de Pacientes</h2>
      <ul>
        {pacientes.map((p) => (
          <li key={p.id}>
            {p.nome} — {p.idade} anos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
