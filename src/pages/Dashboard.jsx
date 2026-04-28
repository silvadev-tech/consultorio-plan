
import React, { useEffect, useState } from "react";
import api from "../services/api"; // Importe sua instância do Axios para usar o Token
import dashboardService from "../services/dashboardService";

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [erro, setErro] = useState(null);

  const pacientesMock = [
    { id: 1, nome: "Maria Silva (Mock)", idade: 32 },
    { id: 2, nome: "João Souza (Mock)", idade: 45 }
  ];

  useEffect(() => {
    async function carregarPacientes() {
      try {
        // Chamada usando sua URL do Railway via Axios
        const resp = await api.get("/pacientes");
        setPacientes(resp.data);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
        setErro("Conectado ao Railway, mas sem dados reais ainda. Usando mock.");
        setPacientes(pacientesMock);
      }
    }
    carregarPacientes();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard OdontoPlan</h1>
      {erro && <p style={{ color: "orange" }}>{erro}</p>}

      <section>
        <h2>Lista de Pacientes</h2>
        <ul>
          {pacientes.map((p) => (
            <li key={p.id}>
              {p.nome} — {p.idade} anos
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
