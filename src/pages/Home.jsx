import NavbarLayout from "../components/Navbar";
import { Shield, TrendingUp, Users, CheckCircle } from "lucide-react";

// === Configuração do endereço para o mapa ===
const ENDERECO =
  "St. de Habitações Individuais Sul QI 19 casa 19 - Lago Sul, Brasília - DF, 71655-040";

function MapEmbed({ lat, lng, address }) {
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  const query = hasCoords ? `${lat},${lng}` : encodeURIComponent(address || "");
  if (!query) return null;

  const iframeSrc = `https://www.google.com/maps?q=${query}&z=15&output=embed`;
  const directionsHref = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
      )}`;

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
      "Olá, gostaria de falar com a equipe da Maximum Profits para saber mais sobre as oportunidades de crédito."
    );
    const link = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;
    window.open(link, "_blank");
  };

  return (
    <NavbarLayout>
      <h1 className="sr-only">
        Maximum Profits — Plataforma de Créditos Judiciais
      </h1>

      {/* HERO */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="rounded-xl bg-white border px-6 py-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide select-none">
                Soluções em créditos judiciais
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mt-1">
                Investimento seguro, acompanhamento transparente
              </h2>
              <p className="text-[#4A5568] mt-3 select-none">
                Conectamos oportunidades de créditos judiciais a investidores,
                com curadoria, informações claras e um painel simples para
                acompanhar cada etapa até o recebimento.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/creditos"
                  className="inline-block bg-[#0AAFC0] text-white font-semibold rounded-lg px-5 py-2 hover:opacity-90 transition"
                >
                  Ver créditos disponíveis
                </a>
                <button
                  onClick={falarComEquipe}
                  className="inline-block bg-white text-[#0AAFC0] border border-[#0AAFC0] font-semibold rounded-lg px-5 py-2 hover:bg-[#F7FAFC] transition"
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
        <h3 className="text-xl font-bold text-center mb-4 select-none">
          Por que escolher a Maximum Profits?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardHome
            titulo="Curadoria Técnica"
            texto="Analisamos origem, fase processual, riscos e documentação para listar somente créditos com informações claras e objetivas."
            icon={<Shield className="w-8 h-8 text-white" />}
          />
          <CardHome
            titulo="Transparência Total"
            texto="Acompanhe status, deságio, prazos estimados e histórico — tudo em um só lugar, com linguagem direta."
            icon={<TrendingUp className="w-8 h-8 text-white" />}
          />
          <CardHome
            titulo="Atendimento Próximo"
            texto="Suporte humano e consultivo para tirar dúvidas, simular cenários e apoiar sua decisão de investimento."
            icon={<Users className="w-8 h-8 text-white" />}
          />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-6xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-center mb-4 select-none">
          Como funciona
        </h3>

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

{/* CHAMADA PARA AÇÃO */}
<section className="-mx-10">
  <div className="w-full py-12 bg-[#0AAFC0] text-white">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h3 className="text-2xl md:text-3xl font-bold">
      Pronto para conhecer as oportunidades?
    </h3>
    <p className="mt-3 text-lg opacity-90">
      Explore nossa lista de créditos ou fale com nosso time especializado para saber mais.
    </p>

    <div className="mt-6 flex flex-wrap gap-4 justify-center">
      <a
        href="/creditos"
        className="bg-white text-[#0AAFC0] font-semibold rounded-lg px-6 py-3 shadow hover:opacity-90 transition"
      >
        Acessar Créditos
      </a>
      <button
        onClick={falarComEquipe}
        className="border border-white text-white font-semibold rounded-lg px-6 py-3 hover:bg-white hover:text-[#0AAFC0] transition"
      >
        Entrar em Contato
      </button>
    </div>
  </div>
</section>


      {/* FAQ */}
      <section className="max-w-6xl mx-auto mb-10">
        <h3 className="text-xl font-bold text-center mb-4 select-none">
          Perguntas frequentes
        </h3>
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

      {/* LOCALIZAÇÃO */}
      <section className="max-w-6xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-center mb-4 select-none">
          Onde estamos
        </h3>

        <div className="rounded-xl bg-[#EBF4FF] border border-[#CBD5E1] px-6 py-6 shadow-md text-[#2D3748]">
          <p className="text-sm mb-3">
            <span className="font-semibold">Endereço: </span>
            {ENDERECO}
          </p>
          <MapEmbed lat={-15.860222} lng={-47.862396} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-transparent text-sm mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6 text-sm text-[#1A202C]">
          <p>
            A Maximum Profits detém uma plataforma digital que atua como
            correspondente bancário para facilitar o processo de contratação de
            empréstimos. A Maximum Profits não é instituição financeira e não
            fornece crédito ao mercado. Atuamos como correspondente bancário
            conforme a Resolução CMN Nº 4.935 do Banco Central do Brasil.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-center">
              <h4 className="text-lg font-bold text-[#1A202C]">
                MAXIMUM PROFITS
              </h4>
              <p className="mt-2">© 2023 by Midlej Technology.</p>
              <p className="mt-2">CNPJ: 35.340.252/0001-44</p>
            </div>

            <div className="flex flex-col items-center md:items-center">
              <p>
                <span className="font-semibold">Endereço:</span> {ENDERECO}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                contato@midlejcapital.com.br
              </p>
              <p>
                <span className="font-semibold">Telefone:</span> 61 99620-4646
              </p>
            </div>
          </div>
        </div>
      </footer>
    </NavbarLayout>
  );
}

/* ====== Cards ====== */

/* ====== Cards ====== */
function CardHome({ titulo, texto, icon }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition transform">
      <div className="w-12 h-12 bg-[#0AAFC0] rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-[#111827] mb-2">{titulo}</h4>
      <p className="text-sm text-[#4B5563]">{texto}</p>
    </div>
  );
}

function StepHome({ numero, titulo, texto }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition transform">
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0AAFC0] text-white font-bold mb-2">
        {numero}
      </div>
      <h4 className="text-lg font-bold text-[#111827] mb-2">{titulo}</h4>
      <p className="text-sm text-[#4B5563]">{texto}</p>
    </div>
  );
}

function FaqHome({ q, a }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition transform">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-md bg-[#0AAFC0] flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-[#111827]">{q}</p>
          <p className="text-sm text-[#4B5563] mt-1">{a}</p>
        </div>
      </div>
    </div>
  );
}

