import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import axios from "axios";

export default function DetalhesAplicacao() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [aporte, setAporte] = useState(1000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const numeroEmpresa = "5561996204646"; // WhatsApp

  useEffect(() => {
    try {
      setIsLoggedIn(!!localStorage.getItem("token"));
    } catch (_) {
      setIsLoggedIn(false);
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/produtos`)
      .then((res) => {
        const encontrado = res.data.find((p) => p.id === parseInt(id));
        setProduto(encontrado || null);
      })
      .catch(() => setProduto(null));
  }, [id]);

  if (!produto) {
    return (
      <NavbarLayout>
        <p className="text-center mt-10 text-gray-800 select-none cursor-default">
          Carregando...
        </p>
      </NavbarLayout>
    );
  }

  // cálculo da rentabilidade
  const fator = Math.pow(1 + produto.taxaMensal, produto.prazoMeses);
  const rentabilidadeTotal = (fator - 1) * 100;
  const valorFinal = aporte * fator;

  const confirmarSimulacao = () => {
    const mensagem = encodeURIComponent(
      `Olá, gostaria de informações sobre a aplicação:\n\n` +
        `Produto: ${produto.nome}\n` +
        `Prazo: ${produto.prazoMeses} meses\n` +
        `Taxa mensal: ${(produto.taxaMensal * 100).toFixed(2)}%\n\n` +
        `Simulação de aporte: R$ ${aporte.toLocaleString("pt-BR")}\n` +
        `Valor final projetado: R$ ${valorFinal.toLocaleString("pt-BR")}\n\n` +
        `Aguardo o retorno. Obrigado!`
    );

    const link = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;
    window.open(link, "_blank");
  };

  return (
    <NavbarLayout>
      <div className="flex justify-center items-center min-h-[80vh] px-0">
        <div className="bg-[#EBF4FF] border border-[#CBD5E1] text-[#2D3748] p-4 sm:p-8 rounded-xl shadow-md w-full max-w-none sm:max-w-2xl space-y-4">
          <h1 className="text-2xl font-bold text-center text-[#1A202C]">
            {produto.nome}
          </h1>

          <div className="space-y-1 text-sm">
            <p>
              <strong>Prazo:</strong> {produto.prazoMeses} meses
            </p>
            <p>
              <strong>Taxa mensal:</strong>{" "}
              {(produto.taxaMensal * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Rentabilidade total:</strong>{" "}
              <span className="text-green-700 font-semibold">
                {rentabilidadeTotal.toFixed(2)}%
              </span>
            </p>
          </div>

          <hr className="my-4 border-t border-gray-300" />

          <h2 className="text-lg font-semibold text-center text-[#1A202C]">
            Descrição
          </h2>
          <p className="text-justify">{produto.descricao || "—"}</p>

          <hr className="my-4 border-t border-gray-300" />

          <div className="space-y-2">
            <label className="font-medium block" htmlFor="aporte">
              Simular aporte (R$)
            </label>
            <input
              id="aporte"
              type="number"
              min={100}
              step={100}
              value={aporte}
              onChange={(e) => setAporte(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-800">
              Valor final projetado:{" "}
              <strong>
                {valorFinal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </p>
          </div>

          {isLoggedIn ? (
            <button
              onClick={confirmarSimulacao}
              className="w-full px-6 py-2 rounded-lg bg-[#1D2533] text-white hover:brightness-110 transition font-medium"
            >
              Aplicar agora
            </button>
          ) : (
            <div className="text-sm text-[#1A202C] bg-white/70 border border-[#CBD5E1] rounded-lg p-3 text-center">
              Para aplicar nesta oportunidade, entre em contato{" "}
              <a
                href={`https://wa.me/${numeroEmpresa}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-[#2B6CB0] hover:text-[#1A4E86] font-semibold"
              >
                pelo WhatsApp
              </a>
              .
            </div>
          )}
        </div>
      </div>
    </NavbarLayout>
  );
}
