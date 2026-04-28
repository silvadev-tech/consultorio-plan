import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import planoService from "../services/planoService";
import "./Planos.css"; // Lembre-se de criar este arquivo CSS!

function Plano() {
  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await planoService.listar();
        setPlanos(dados);
      } catch (err) {
        console.error("Erro ao carregar planos:", err);
      }
    }
    carregar();
  }, []);

  const selecionarPlano = (id, nome) => {
    localStorage.setItem("planoEscolhidoId", id);
    localStorage.setItem("planoEscolhidoNome", nome);
    navigate("/cadastro");
  };

  return (
    <div className="planos-grid">
      {planos.length === 0 && <p>Carregando planos...</p>}

      {planos.map((plano) => (
        <div key={plano.id} className={`plano-card ${plano.nome.toLowerCase()}`}>

          {plano.nome === 'Premium' && <span className="badge-mais-completo">MAIS COMPLETO!</span>}

          <div className={`card-header ${
            plano.nome === 'Premium' ? 'bg-gold' :
            plano.nome === 'Básico' ? 'bg-blue' : 'bg-green'
          }`}>
            Plano {plano.nome}
          </div>

          <div className="price">
            R$ {plano.valor?.toFixed(0)}<span>/mês</span>
          </div>

          <ul className="beneficios">
            <li>Até {plano.limitePacientes} pacientes cadastrados</li>
            <li>Alerta na tela da agenda do dia</li>

            {/* Lógica para mostrar benefícios extras baseados no plano */}
            {plano.nome !== 'Básico' && <li>Lembrete no WhatsApp para o paciente</li>}
            {plano.nome === 'Premium' && <li>Lembrete no WhatsApp para o dentista</li>}

            <li>{plano.nome === 'Premium' ? 'Dashboards avançados' : 'Dashboards básicos'}</li>
          </ul>

          <div className="aviso-excedente">
             ⚠️ R$ 2 por paciente excedente {plano.nome === 'Premium' ? '(sem migração)' : 'até atingir o próximo plano'}
          </div>

          <button
            className="btn-escolher"
            onClick={() => selecionarPlano(plano.id, plano.nome)}
          >
            Escolher Plano
          </button>
        </div>
      ))}
    </div>
  );
}

export default Plano;
