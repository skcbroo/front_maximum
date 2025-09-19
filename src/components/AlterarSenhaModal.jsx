import { useState } from "react";
import axios from "axios";

export default function AlterarSenhaModal({ isOpen, onClose }) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  if (!isOpen) return null; // só renderiza quando aberto

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (novaSenha !== confirmarSenha) {
      setErro("A nova senha e a confirmação não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/alterar-senha`,
        { senhaAtual, novaSenha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem("Senha alterada com sucesso.");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch {
      setErro("Erro ao alterar senha. Verifique a senha atual.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/logo2.png" alt="Maximum Profits" className="h-12 mx-auto" />
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-center mb-6 text-[#222B3B]">
          Alterar Senha
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Senha atual</label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />
          </div>

          {/* Mensagens */}
          {mensagem && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
              {mensagem}
            </div>
          )}
          {erro && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {erro}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0AAFC0] hover:bg-[#0992a1]"
            }`}
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
