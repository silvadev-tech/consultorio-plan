import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nomeClinica, setNomeClinica] = useState("");

  // Estado para os indicadores (Iniciam com os valores da sua imagem)
  const [dados, setDados] = useState({ orcamentos: 120, fechados: 85, taxa: 70.8 });

  useEffect(() => {
    // Busca dados do usuário que salvamos no login
    setNomeUsuario(localStorage.getItem("nomeUsuario") || "Usuário");
    setNomeClinica(localStorage.getItem("nomeClinica") || "Minha Clínica");

    // Aqui você poderá fazer um api.get("/dashboard/stats") no futuro para atualizar os cards
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Configuração dos Gráficos (Baseados na sua imagem de referência)
  const dataPie = {
    labels: ['Fechados', 'Não Fechados'],
    datasets: [{
      data: [85, 35],
      backgroundColor: ['#28a745', '#dc3545'],
      hoverOffset: 4
    }]
  };

  const dataBar = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [{
      label: 'Conversões Mensais',
      data: [50, 60, 70, 55, 50, 85, 45, 55, 30, 55, 78, 88],
      backgroundColor: '#6c63ff',
    }]
  };

  return (
    <div className="dashboard-wrapper">
      {/* 1. NAVBAR SUPERIOR (Estilo SaaS) */}
      <nav className="navbar">
        <ul>
          <li><button onClick={() => navigate("/dashboard")} className="active">📊 Dashboard</button></li>
          <li><button onClick={() => navigate("/agenda")}>📅 Agenda</button></li>
          <li><button onClick={() => navigate("/pacientes")}>👥 Pacientes</button></li>
          <li><button onClick={() => navigate("/financeiro")}>💰 Financeiro</button></li>
          <li><button className="premium" style={{color: '#ffd700'}}>👑 Suporte Premium</button></li>
          <li className="user-section" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#fff' }}>🏪 {nomeClinica} | 👤 {nomeUsuario}</span>
            <button onClick={handleLogout} className="btn-sair" style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Sair</button>
          </li>
        </ul>
      </nav>

      {/* 2. CONTEÚDO PRINCIPAL (Cards e Gráficos) */}
      <div className="dashboard-container">
        <h2>Taxa de Conversão de Orçamentos</h2>

        {/* CARDS DE RESUMO (KPIs) */}
        <div className="cards-row">
          <div className="card">
            <h3>Total de Orçamentos</h3>
            <div className="card-value">{dados.orcamentos}</div>
          </div>
          <div className="card card-success">
            <h3>Tratamentos Fechados</h3>
            <div className="card-value">{dados.fechados}</div>
          </div>
          <div className="card">
            <h3>Taxa de Conversão</h3>
            <div className="card-value">{dados.taxa}%</div>
          </div>
        </div>

        {/* ÁREA DE GRÁFICOS */}
        <div className="charts-row">
          <div className="chart chart-pie">
            <h3>Distribuição de Fechamentos</h3>
            <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
              <Pie data={dataPie} />
            </div>
          </div>
          <div className="chart chart-bar">
            <h3>Conversões Mensais</h3>
            <Bar data={dataBar} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
