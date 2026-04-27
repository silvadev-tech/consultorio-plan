import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Plano from "./pages/plano";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";   // importa o cadastro
import Dashboard from "./pages/Dashboard.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rota inicial aponta para Planos */}
        <Route path="/" element={<Plano />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
