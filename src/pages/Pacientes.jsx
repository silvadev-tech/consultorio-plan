import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [novoPaciente, setNovoPaciente] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    cpf: ""
  });
  const navigate = useNavigate();

  // 1. Carrega a lista de pacientes
  const carregarPacientes = async () => {
    try {
      const resp = await api.get("/pacientes");
      setPacientes(resp.data);
    } catch (err) {
      console.error("Erro ao carregar pacientes", err);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  // 2. Cadastra novo paciente
  const handleCadastro = async (e) => {
    e.preventDefault();

    // Pegamos a clínica do usuário logado para o Multi-tenancy
    const minhaClinica = localStorage.getItem("nomeClinica");

    const dadosParaEnviar = {
      ...novoPaciente,
      tenantId: minhaClinica // Vincula o paciente à clínica logada
    };

    try {
      await api.post("/pacientes", dadosParaEnviar);
      alert("Paciente cadastrado com sucesso!");
      setNovoPaciente({ nome: "", telefone: "", endereco: "", cpf: "" }); // Limpa tudo
      carregarPacientes(); // Atualiza a tabela
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar: verifique se o CPF já existe ou se faltam dados.");
    }
  };

  // 3. Filtra a lista conforme a busca
  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <ul>
          <li><button onClick={() => navigate("/dashboard")}>📊 Dashboard</button></li>
          <li><button onClick={() => navigate("/agenda")}>📅 Agenda</button></li>
          <li><button onClick={() => navigate("/pacientes")} className="active">👥 Pacientes</button></li>
          <li style={{ marginLeft: 'auto', color: '#fff' }}>👤 {localStorage.getItem("nomeUsuario")}</li>
        </ul>
      </nav>

      <div className="dashboard-container">
        <h2>👥 Gestão de Pacientes</h2>

        {/* FORMULÁRIO DE CADASTRO */}
        <div className="chart" style={{ marginBottom: '20px', padding: '20px' }}>
          <h3>Novo Cadastro</h3>
          <form onSubmit={handleCadastro} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text" placeholder="Nome Completo" required
              value={novoPaciente.nome} onChange={e => setNovoPaciente({...novoPaciente, nome: e.target.value})}
            />
            <input
              type="text" placeholder="CPF (apenas números)" required
              value={novoPaciente.cpf} onChange={e => setNovoPaciente({...novoPaciente, cpf: e.target.value})}
            />
            <input
              type="text" placeholder="Telefone" required
              value={novoPaciente.telefone} onChange={e => setNovoPaciente({...novoPaciente, telefone: e.target.value})}
            />
            <input
              type="text" placeholder="Endereço" required
              value={novoPaciente.endereco} onChange={e => setNovoPaciente({...novoPaciente, endereco: e.target.value})}
            />
            <button type="submit" className="btn-assinar">Cadastrar Paciente</button>
          </form>
        </div>

        {/* BUSCA */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar paciente pelo nome..."
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        {/* LISTA DE PACIENTES */}
        <div className="chart">
          <table id="planos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.length > 0 ? (
                pacientesFiltrados.map(p => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.telefone}</td>
                    <td>
                      <button onClick={() => navigate(`/pacientes/${p.id}`)} className="btn-assinar">📂 Ver Histórico</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum paciente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
