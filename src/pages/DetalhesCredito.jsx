import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import axios from "axios";

export default function DetalhesAplicacao() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [aporte, setAporte] = useState(1000); // numérico interno
  const [aporteTexto, setAporteTexto] = useState("1.000,00"); // exibido formatado

  const numeroEmpresa = "5561935058737"; // WhatsApp

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/produtos/${id}`)
      .then((res) => setProduto(res.data))
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

  // juros simples
  const rentabilidadeTotal = produto.taxaMensal * produto.prazoMeses * 100;
  const valorFinal = aporte + aporte * produto.taxaMensal * produto.prazoMeses;

  // formatador BRL
  const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const formatadorNumero = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAporteChange = (e) => {
    let valor = e.target.value.replace(/\./g, "").replace(",", ".");
    let numero = parseFloat(valor);

    if (isNaN(numero)) {
      setAporte(0);
      setAporteTexto("");
    } else {
      setAporte(numero);
      setAporteTexto(formatadorNumero.format(numero).replace(".", ","));
    }
  };

  const confirmarSimulacao = () => {
    const mensagem = encodeURIComponent(
      `Olá, gostaria de informações sobre a aplicação:\n\n` +
        `Produto: ${produto.nome}\n` +
        `Prazo: ${produto.prazoMeses} meses\n` +
        `Taxa mensal: ${(produto.taxaMensal * 100).toFixed(2)}%\n\n` +
        `Simulação de aporte: ${formatador.format(aporte)}\n` +
        `Valor final projetado: ${formatador.format(valorFinal)}\n\n` +
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
              type="text"
              value={aporteTexto}
              onChange={handleAporteChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-800">
              Valor final projetado:{" "}
              <strong>{formatador.format(valorFinal)}</strong>
            </p>
          </div>

          <button
            onClick={confirmarSimulacao}
            className="w-full px-6 py-2 rounded-lg bg-[#0AAFC0] text-white hover:brightness-110 transition font-medium"
          >
            Aplicar agora
          </button>
        </div>
      </div>
    </NavbarLayout>
  );
}


