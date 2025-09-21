import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";
import LoginModal from "./LoginModal";
import AlterarSenhaModal from "./AlterarSenhaModal";

export default function NavbarLayout({ children }) {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.nome?.split(" ")[0] || "";
  const navigate = useNavigate();
  const [loginAberto, setLoginAberto] = useState(false);
  const [alterarSenhaAberto, setAlterarSenhaAberto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Navbar */}
      <nav className="bg-[#2F4755] text-white shadow-md px-6 py-3 flex items-center justify-between select-none">
        {/* Logo */}
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
              {/* Link padrão visível para todos os logados */}
              <Link
                to="/aplicacoes-disponiveis"
                className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
              >
                Aplicações Disponíveis
              </Link>

              {role === "cliente" && (
                <Link
                  to="/minhas-aplicacoes"
                  className="hover:text-[#E0F2F1] transition cursor-pointer select-none"
                >
                  Minhas Aplicações
                </Link>
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
                </>
              )}

              {/* Dropdown do usuário */}
<div className="relative group">
  <button className="flex items-center gap-2 hover:text-[#E0F2F1]">
    <User className="w-6 h-6" />
  </button>

  {/* Painel ao passar o mouse */}
  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
    {/* Header com nome do usuário */}
    <div className="px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700">
      {user?.nome || "Usuário"}
    </div>

    <button
      onClick={() => setAlterarSenhaAberto(true)}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Alterar Senha
    </button>
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      Sair
    </button>
  </div>
</div>

            </>
          ) : (
            <button
              onClick={() => setLoginAberto(true)}
              className="flex flex-col items-center hover:text-[#E0F2F1] transition cursor-pointer select-none"
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Entrar</span>
            </button>
          )}
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="p-10 min-h-[calc(100vh-80px)]">{children}</div>

      {/* Modais */}
      <LoginModal isOpen={loginAberto} onClose={() => setLoginAberto(false)} />
      <AlterarSenhaModal
        isOpen={alterarSenhaAberto}
        onClose={() => setAlterarSenhaAberto(false)}
      />
    </div>
  );
}

