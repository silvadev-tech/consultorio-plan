import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import planoService from "../services/planoService";

function Plano() {
  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await planoService.listar();
        setPlanos(dados);
      } catch (err) {
        alert("Erro ao carregar planos.");
        console.error(err);
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
    <div className="planos-container">
      <h1>Escolha seu Plano</h1>
      <table id="planos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
         {/* O ?. evita que o site trave enquanto a API do Railway responde */}
         {planos?.map((plano) => (
           <tr key={plano.id}>
             <td>{plano.nome}</td>
             <td>R$ {plano.preco?.toFixed(2) || "0.00"}</td>
             <td>
               <button onClick={() => selecionarPlano(plano.id, plano.nome)}>
                 Selecionar
               </button>
             </td>
           </tr>
         ))}
        </tbody>
      </table>
    </div>
  );
}

export default Plano;
