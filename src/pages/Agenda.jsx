import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Reaproveita sua Navbar

export default function Agenda() {
  const navigate = useNavigate();

  const handleDateClick = (arg) => {
    alert("Data selecionada: " + arg.dateStr + "\nAqui você abrirá o formulário de novo agendamento!");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Reutilizando sua Navbar para manter o padrão SaaS */}
      <nav className="navbar">
        <ul>
          <li><button onClick={() => navigate("/dashboard")}>📊 Dashboard</button></li>
          <li><button onClick={() => navigate("/agenda")} className="active">📅 Agenda</button></li>
          <li><button onClick={() => navigate("/pacientes")}>👥 Pacientes</button></li>
          <li style={{ marginLeft: 'auto', color: '#fff' }}>
            👤 {localStorage.getItem("nomeUsuario")}
          </li>
        </ul>
      </nav>

      <div className="dashboard-container">
        <h2>📅 Agenda de Consultas</h2>
        <div className="chart" style={{ background: '#fff', padding: '20px' }}>
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale="pt-br"
            buttonText={{ today: 'Hoje' }}
            dateClick={handleDateClick}
            events={[
              { title: 'Exemplo: Consulta João', date: '2026-04-29' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
