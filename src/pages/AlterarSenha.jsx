import { useState } from "react";
import axios from "axios";
import NavbarLayout from "../components/Navbar";

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

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
    <NavbarLayout>
      <div className="min-h-screen flex">
        {/* Coluna esquerda com gradiente */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2F4755] to-[#0AAFC0] items-center justify-center">
          <div className="text-center px-10 text-white">
            <img src="/logo2.png" alt="Logo" className="h-20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Segurança em primeiro lugar</h2>
            <p className="text-lg opacity-90">
              Altere sua senha com facilidade e continue aproveitando a plataforma
              da <strong>Maximum Profits</strong> com tranquilidade.
            </p>
          </div>
        </div>

        {/* Coluna direita com formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10"
            aria-labelledby="titulo-alterar-senha"
          >
            <h2
              id="titulo-alterar-senha"
              className="text-2xl font-semibold text-center mb-6 text-[#222B3B]"
            >
              Alterar Senha
            </h2>

            {/* Senha atual */}
            <label className="block mb-1 font-medium">Senha atual</label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />

            {/* Nova senha */}
            <label className="block mt-4 mb-1 font-medium">Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />

            {/* Confirmar nova senha */}
            <label className="block mt-4 mb-1 font-medium">Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0AAFC0]"
              required
            />

            {/* Mensagens */}
            {mensagem && (
              <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                {mensagem}
              </div>
            )}
            {erro && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {erro}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 p-3 rounded-lg text-white text-sm font-medium transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#0AAFC0] hover:bg-[#0992a1]"
              }`}
            >
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>

            <p className="text-center text-xs mt-6 text-gray-500">
              © 2025 Maximum Profits. Todos os direitos reservados.
            </p>
          </form>
        </div>
      </div>
    </NavbarLayout>
  );
}
