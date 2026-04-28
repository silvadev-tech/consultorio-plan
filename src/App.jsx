import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Plano from "./pages/Plano";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard"; // Removi o .jsx do final, o Vite resolve sozinho

// Componente para proteger rotas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  // Se não tiver token, manda para o login usando 'replace' para não sujar o histórico
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial: Planos */}
        <Route path="/" element={<Plano />} />

        {/* Rota de Login: ESSENCIAL para não dar tela branca no redirecionamento */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota de Cadastro */}
        <Route path="/login" element={<Login />} />

        {/* Rota Protegida: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rota "Coringa": Se o usuário digitar qualquer coisa errada ou der F5
            em rota inexistente, ele volta para a Home com segurança */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
