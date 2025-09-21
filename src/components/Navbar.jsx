import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react"; // 👈 ícone de usuário
import LoginModal from "./LoginModal";
import AlterarSenhaModal from "./AlterarSenhaModal";

export default function NavbarLayout({ children }) {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // 👈 pegando dados do usuário
  const firstName = user?.nome?.split(" ")[0] || ""; // 👈 primeiro nome
  const navigate = useNavigate();
  const [loginAberto, setLoginAberto] = useState(false);
  const [alterarSenhaAberto, setAlterarSenhaAberto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 👈 limpando user também
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Navbar */}
      <nav className="bg-[#2F4755] text-white shadow-md px-6 py-3 flex items-center justify-between select-none">
        {/* Logo clicável */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/logo2.png"
              alt="Logo"
              className="h-12 cursor-pointer"
              draggable="false"
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="flex gap-6 text-sm font-medium items-center">
          {role ? (
            <>
              {role === "cliente" && (
                <>
                  <Link
                    to="/minhas-aplicacoes"
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                  >
                    Minhas Aplicações
                  </Link>
                  <button
                    onClick={() => setAlterarSenhaAberto(true)}
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none bg-transparent border-none text-white"
                  >
                    Alterar Senha
                  </button>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/creditos"
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                  >
                    Gerenciar Créditos
                  </Link>
                  <Link
                    to="/admin/cotas"
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                  >
                    Gerenciar Cotas
                  </Link>
                  <Link
                    to="/admin/usuarios"
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                  >
                    Usuários
                  </Link>
                  <button
                    onClick={() => setAlterarSenhaAberto(true)}
                    className="hover:text-[#E0F2F1] transition cursor-pointer select-none bg-transparent border-none text-white"
                  >
                    Alterar Senha
                  </button>
                </>
              )}

              {/* Ícone de usuário + nome */}
              <div className="flex flex-col items-center">
                <User className="w-6 h-6" />
                <span className="text-xs">{firstName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="hover:text-[#E0F2F1] transition cursor-pointer select-none bg-transparent border-none text-white"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginAberto(true)}
              className="flex flex-col items-center hover:text-[#E0F2F1] transition cursor-pointer select-none"
            >
              <User className="w-6 h-6" /> {/* Ícone */}
              <span className="text-xs">Entrar</span> {/* Texto abaixo */}
            </button>
          )}
        </div>
      </nav>

      {/* Conteúdo da página */}
      <div className="p-10 min-h-[calc(100vh-80px)]">{children}</div>

      {/* Modal de Login */}
      <LoginModal isOpen={loginAberto} onClose={() => setLoginAberto(false)} />

      {/* Modal de Alterar Senha */}
      <AlterarSenhaModal
        isOpen={alterarSenhaAberto}
        onClose={() => setAlterarSenhaAberto(false)}
      />
    </div>
  );
}
