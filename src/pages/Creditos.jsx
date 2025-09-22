// Aplicacoes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import NavbarLayout from "../components/Navbar";
import { ShieldCheck, Zap, TrendingUp } from "lucide-react";

export default function Aplicacoes() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/produtos`)
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const iconMap = {
    "Renda Plus": <ShieldCheck className="w-6 h-6 text-[#2B6CB0]" />,
    "Renda Fast": <Zap className="w-6 h-6 text-[#2B6CB0]" />,
    "Renda Max": <TrendingUp className="w-6 h-6 text-[#2B6CB0]" />,
  };

  return (
    <NavbarLayout>
      <h2 className="text-2xl font-bold text-center mb-6 select-none cursor-default">
        Aplicações Disponíveis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto select-none cursor-default">
        {produtos.map((p) => {
          const fator = Math.pow(1 + p.taxaMensal, p.prazoMeses);
          const rentabilidade = p.taxaMensal * p.prazoMeses * 100;

          return (
            <a
              href={`/aplicacoes/${p.id}`}
              key={p.id}
              className="block bg-[#EBF4FF] border border-[#CBD5E1] rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-5 text-[#2D3748]"
            >
              <div className="flex items-center gap-2 mb-3">
                {iconMap[p.nome] || <ShieldCheck className="w-6 h-6 text-[#2B6CB0]" />}
                <h3 className="text-xl font-bold text-[#1A202C]">{p.nome}</h3>
              </div>

              {p.descricao && (
                <p className="text-sm text-[#4A5568] mb-4">{p.descricao}</p>
              )}

              <div className="grid grid-cols-2 gap-6 text-sm text-[#4A5568]">
                <div>
                  <p>
                    <span className="font-semibold">Prazo:</span>{" "}
                    {p.prazoMeses} meses
                  </p>
                  <p>
                    <span className="font-semibold">Taxa mensal:</span>{" "}
                    {(p.taxaMensal * 100).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#2B6CB0]">
                    Rentabilidade total:
                  </p>
                  <p className="text-[#2B6CB0] font-bold">
                    {rentabilidade.toFixed(2)}%
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </NavbarLayout>
  );
}

