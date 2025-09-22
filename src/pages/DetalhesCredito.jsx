import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DetalhesAplicacao() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [aporte, setAporte] = useState(10000); // numérico interno
  const [aporteTexto, setAporteTexto] = useState("R$ 10.000,00"); // exibido no input

  const numeroEmpresa = "5561935058737"; // WhatsApp
  const taxaCDI = 0.0125; // 1,25% ao mês (15% ao ano)

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

  // === Gerar dados do gráfico ===
  const labels = Array.from({ length: produto.prazoMeses }, (_, i) => `${i + 1}º mês`);

  const rendimentosProduto = labels.map((_, i) => aporte * produto.taxaMensal * (i + 1));
  const rendimentosCDI = labels.map((_, i) => aporte * taxaCDI * (i + 1));

  const data = {
    labels,
    datasets: [
      {
        label: "Aplicação",
        data: rendimentosProduto,
        borderColor: "#0074D9",
        backgroundColor: "#0074D9",
        tension: 0.3,
      },
      {
        label: "CDI (15% a.a.)",
        data: rendimentosCDI,
        borderColor: "#FBBF24",
        backgroundColor: "#FBBF24",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.parsed.y.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            }),
        },
      },
    },
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
        <div className="bg-[#EBF4FF] border border-[#CBD5E1] text-[#2D3748] p-4 sm:p-8 rounded-xl shadow-md w-full max-w-none sm:max-w-2xl space-y-6">
          <h1 className="text-2xl font-bold text-center text-[#1A202C]">
            {produto.nome}
          </h1>

          <div className="space-y-1 text-sm">
            <p>
              <strong>Prazo:</strong> {produto.prazoMeses} meses
            </p>
            <p>
              <strong>Taxa mensal:</strong> {(produto.taxaMensal * 100).toFixed(2)}%
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

          {/* === GRÁFICO DE PROJEÇÃO === */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center text-[#1A202C] mb-3">
              Projeção de Rendimentos (mensal)
            </h2>
            <div className="bg-white rounded-lg p-3 border border-[#CBD5E1]">
              <Line data={data} options={options} height={300} />
            </div>
          </div>

          <hr className="my-4 border-t border-gray-300" />

          {/* Simulação */}
          <div className="space-y-2">
            <label className="font-medium block" htmlFor="aporte">
              Simular aporte (R$)
            </label>
            <input
              id="aporte"
              type="text"
              value={aporteTexto}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, "");
                let numero = parseFloat(valor) / 100;
                if (isNaN(numero)) numero = 0;

                setAporte(numero);
                setAporteTexto(
                  numero.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                );
              }}
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
