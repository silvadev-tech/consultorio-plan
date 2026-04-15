import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get("/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Dashboard</h2>
      <p>Bem-vindo ao sistema odontológico!</p>
      <button onClick={handleLogout}>Sair</button>

      <h3>Lista de Pacientes</h3>
      <ul>
        {pacientes.map((p) => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
  );
}
