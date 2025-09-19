import { Link } from "react-router-dom";
import NavbarLayout from "../components/Navbar";
import GraficoGeral from "../components/GraficoGeral";
import GraficoGeralPercentual from "../components/GraficoGeralPercentual";
import { Shield, TrendingUp, Users } from "lucide-react"; // 👈 imports dos ícones

// === Configuração do endereço para o mapa ===
const ENDERECO = "St. de Habitações Individuais Sul QI 19 casa 19 - Lago Sul, Brasília - DF, 71655-040";

function MapEmbed({ lat, lng, address }) {
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  const query = hasCoords ? `${lat},${lng}` : encodeURIComponent(address || "");

  if (!query) return null;

  const iframeSrc = `https://www.google.com/maps?q=${query}&z=15&output=embed`;
  const directionsHref = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="space-y-2">
      <div className="w-full h-64 rounded-lg overflow-hidden border border-[#CBD5E1]">
        <iframe
          title="Localização"
          src={iframeSrc}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={directionsHref}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-sm underline text-[#2B6CB0] hover:text-[#1A4E86]"
      >
        Ver rota no Google Maps
      </a>
    </div>
  );
}

export default function Home() {
  const falarComEquipe = () => {
    const numeroEmpresa = "5561996204646";
    const mensagem = encodeURIComponent(
      "Olá, gostaria de falar com a equipe da Midlej Capital para saber mais sobre as oportunidades de crédito."
    );
    const link = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;
    window.open(link, "_blank");
  };

  return (
    <NavbarLayout>
      <h1 className="sr-only">Midlej Capital — Plataforma de Créditos Judiciais</h1>

      {/* HERO */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="rounded-xl bg-white border px-6 py-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide select-none cursor-default">
                Soluções em créditos judiciais
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mt-1">
                Investimento seguro, acompanhamento transparente
              </h2>
              <p className="text-[#4A5568] mt-3 select-none cursor-default">
                Conectamos oportunidades de créditos judiciais a investidores,
                com curadoria, informações claras e um painel simples para
                acompanhar cada etapa até o recebimento.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/creditos"
                  className="inline-block bg-[#2B6CB0] text-white font-semibold rounded-lg px-5 py-2 hover:opacity-90 transition"
                >
                  Ver créditos disponíveis
                </a>
                <button
                  onClick={falarComEquipe}
                  className="inline-block bg-white text-[#2B6CB0] border border-[#CBD5E1] font-semibold rounded-lg px-5 py-2 hover:bg-[#F7FAFC] transition"
                >
                  Fale com a equipe
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src="/buss.jpg"
                alt="Reunião de negócios"
                className="w-48 md:w-72 lg:w-96 rounded-lg object-cover select-none"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="max-w-6xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-center mb-4 select-none cursor-default">
          Por que escolher a Midlej Capital?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardHome
            titulo="Curadoria técnica"
            texto="Analisamos origem, fase processual, riscos e documentação para listar somente créditos com informações claras e objetivas."
            icon={<Shield className="w-8 h-8 text-[#2B6CB0]" />} // 👈 Ícone
          />
          <CardHome
            titulo="Transparência total"
            texto="Acompanhe status, deságio, prazos estimados e histórico — tudo em um só lugar, com linguagem direta."
            icon={<TrendingUp className="w-8 h-8 text-[#2B6CB0]" />} // 👈 Ícone
          />
          <CardHome
            titulo="Atendimento próximo"
            texto="Suporte humano e consultivo para tirar dúvidas, simular cenários e apoiar sua decisão de investimento."
            icon={<Users className="w-8 h-8 text-[#2B6CB0]" />} // 👈 Ícone
          />
        </div>
      </section>

      {/* resto do código segue igual */}
    </NavbarLayout>
  );
}

function CardHome({ titulo, texto, icon }) {
  return (
    <div className="bg-white border border-[#CBD5E1] rounded-xl px-6 py-6 shadow-md">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-[#EBF4FF] flex items-center justify-center rounded-lg mr-3">
          {icon}
        </div>
        <h4 className="text-lg font-bold text-[#1A202C]">{titulo}</h4>
      </div>
      <p className="text-sm text-gray-600">{texto}</p>
    </div>
  );
}
