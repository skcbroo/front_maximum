import { useState } from "react";
import axios from "axios";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // não renderiza nada se estiver fechado

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, senha }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (lembrar) localStorage.setItem("login_email", email);
      else localStorage.removeItem("login_email");

      onClose(); // fecha modal depois do login
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-6 text-center">
          <img src="/logo2.png" alt="Maximum Profits" className="mx-auto h-14 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Acesso à Plataforma</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type={mostrarSenha ? "text" : "password"}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              className="text-xs mt-1 text-[#0AAFC0] hover:underline"
              onClick={() => setMostrarSenha((v) => !v)}
            >
              {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="mr-2"
              />
              Lembrar-me
            </label>
            <a href="/esqueci-senha" className="text-[#0AAFC0] hover:underline">
              Esqueci a senha
            </a>
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-[#0AAFC0] hover:bg-[#0990a5]"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
