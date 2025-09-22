// Aplicacoes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import NavbarLayout from "../components/Navbar";

export default function Aplicacoes() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/produtos`)
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <NavbarLayout>
      <h2 className="text-2xl font-bold text-center mb-6 select-none cursor-default">
        Aplicações Disponíveis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto select-none cursor-default">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="block bg-[#D5DADD] border border-[#CBD5E1] rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-5 text-[#2D3748]"
          >
            {/* Nome do produto */}
            <h3 className="text-xl font-bold text-[#1A202C] mb-2">
              {p.nome}
            </h3>

            {/* Descrição */}
            {p.descricao && (
              <p className="text-sm text-[#4A5568] mb-4">{p.descricao}</p>
            )}

            {/* Informações principais */}
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
                <p className="font-semibold text-[#2B6CB0]">Rentabilidade total:</p>
                <p className="text-[#2B6CB0] font-bold">
                  {((1 + p.taxaMensal) ** p.prazoMeses - 1)
                    .toLocaleString("pt-BR", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NavbarLayout>
  );
}


