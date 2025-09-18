import { Shield, TrendingUp, Users, CheckCircle } from "lucide-react";
import NavbarLayout from "../components/Navbar";

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
      {/* HERO */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="rounded-xl bg-[#EBF4FF] border border-[#CBD5E1] px-6 py-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Soluções em créditos judiciais
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mt-1">
                Investimento seguro, acompanhamento transparente
              </h2>
              <p className="text-[#4A5568] mt-3">
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
                className="w-48 md:w-72 lg:w-96 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-center mb-6">
          Por que escolher a Midlej Capital?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardHome
            icon={<Shield className="w-6 h-6" />}
            titulo="Curadoria técnica"
            texto="Analisamos origem, fase processual, riscos e documentação para listar somente créditos com informações claras e objetivas."
          />
          <CardHome
            icon={<TrendingUp className="w-6 h-6" />}
            titulo="Transparência total"
            texto="Acompanhe status, deságio, prazos estimados e histórico — tudo em um só lugar, com linguagem direta."
          />
          <CardHome
            icon={<Users className="w-6 h-6" />}
            titulo="Atendimento próximo"
            texto="Suporte humano e consultivo para tirar dúvidas, simular cenários e apoiar sua decisão de investimento."
          />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-center mb-6">Como funciona</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepHome
            numero="1"
            titulo="Seleção de oportunidades"
            texto="Publicamos créditos com informações fundamentais: valor estimado, deságio, fase e quantidade de cotas."
          />
          <StepHome
            numero="2"
            titulo="Análise e reserva"
            texto="Você avalia os detalhes e manifesta interesse. Nosso time auxilia com dúvidas e viabilidade."
          />
          <StepHome
            numero="3"
            titulo="Acompanhamento e recebimento"
            texto="Monitoramos o andamento e notificamos marcos importantes até a liquidação."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-center mb-6">Perguntas frequentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FaqHome
            q="O que é um crédito judicial?"
            a="É um direito de receber um valor decorrente de uma ação judicial. Na plataforma, exibimos informações essenciais para avaliação do investidor."
          />
          <FaqHome
            q="Posso acessar os créditos sem cadastro?"
            a="A listagem é pública, mas para reservar/seguir adiante será necessário cadastro e verificação."
          />
          <FaqHome
            q="Como é calculado o deságio?"
            a="O deságio é a relação entre o preço de aquisição e o valor do crédito. Exibimos isso claramente em cada card."
          />
          <FaqHome
            q="Existe suporte para dúvidas?"
            a="Sim. Nosso atendimento está disponível para orientar e esclarecer qualquer ponto antes da decisão."
          />
        </div>
      </section>
    </NavbarLayout>
  );
}

function CardHome({ icon, titulo, texto }) {
  return (
    <div className="bg-[#44505F] rounded-xl px-6 py-5 shadow-md text-white flex flex-col items-start gap-3">
      <div className="bg-white/10 p-2 rounded-lg">{icon}</div>
      <h4 className="text-lg font-bold">{titulo}</h4>
      <p className="text-sm text-gray-200">{texto}</p>
    </div>
  );
}

function StepHome({ numero, titulo, texto }) {
  return (
    <div className="bg-[#44505F] rounded-xl px-6 py-5 shadow-md text-white">
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#44505F] font-bold mb-2">
        {numero}
      </div>
      <h4 className="text-lg font-bold mb-1">{titulo}</h4>
      <p className="text-sm text-gray-200">{texto}</p>
    </div>
  );
}

function FaqHome({ q, a }) {
  return (
    <div className="bg-[#44505F] rounded-xl px-6 py-5 shadow-md text-white">
      <div className="flex items-start gap-2">
        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
        <div>
          <p className="font-semibold">{q}</p>
          <p className="text-sm text-gray-200 mt-1">{a}</p>
        </div>
      </div>
    </div>
  );
}
