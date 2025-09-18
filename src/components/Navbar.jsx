import { Link, useNavigate } from "react-router-dom";

export default function NavbarLayout({ children }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-3 flex items-center justify-between select-none">
        
        {/* Logo + Nome */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo2.png"
              alt="Maximum Profits Logo"
              className="h-8 w-auto cursor-pointer"
              draggable="false"
            />
            <span className="font-bold text-lg text-gray-900">
              Maximum Profits
            </span>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/creditos"
            className="text-gray-700 hover:text-teal-600 transition"
          >
            Créditos
          </Link>

          <Link
            to="/como-funciona"
            className="text-gray-700 hover:text-teal-600 transition"
          >
            Como Funciona
          </Link>

          <Link
            to="/contato"
            className="text-gray-700 hover:text-teal-600 transition"
          >
            Contato
          </Link>

          {role ? (
            <>
              {role === "cliente" && (
                <>
                  <Link
                    to="/meus-ativos"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Meus Ativos
                  </Link>
                  <Link
                    to="/alterar-senha"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Alterar Senha
                  </Link>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/creditos"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Gerenciar Créditos
                  </Link>
                  <Link
                    to="/admin/cotas"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Gerenciar Cotas
                  </Link>
                  <Link
                    to="/admin/usuarios"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Usuários
                  </Link>
                  <Link
                    to="/alterar-senha"
                    className="text-gray-700 hover:text-teal-600 transition"
                  >
                    Alterar Senha
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition bg-transparent border-none"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-teal-600 transition"
            >
              Entrar
            </Link>
          )}

          {/* Botão CTA */}
          <a
            href="https://wa.me/5561996204646?text=Olá%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Maximum%20Profits."
            target="_blank"
            rel="noreferrer"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Falar com Equipe
          </a>
        </div>
      </nav>

      {/* Conteúdo da página */}
      <div className="p-10 min-h-[calc(100vh-80px)]">{children}</div>
    </div>
  );
}
