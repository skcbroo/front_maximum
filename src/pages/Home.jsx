import { Link } from "react-router-dom";
import NavbarLayout from "../components/Navbar";

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
      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow">
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
        className="inline-block text-sm underline text-teal-600 hover:text-teal-700"
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
      <section className="max-w-6xl mx-auto mb-16 px-6">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-gray-200 px-8 py-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-medium text-teal-700 uppercase tracking-wide select-none cursor-default mb-2">
                Soluções em Créditos Judiciais
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Investimento seguro,{" "}
                <span className="text-teal-600">acompanhamento transparente</span>
              </h2>
              <p className="text-gray-600 mt-4 select-none cursor-default text-lg">
                Conectamos oportunidades de créditos judiciais a investidores,
                com curadoria especializada, informações claras e um painel
                intuitivo para acompanhar cada etapa até o recebimento.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/creditos"
                  className="inline-block bg-teal-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-teal-700 transition"
                >
                  Ver Créditos Disponíveis
                </a>
                <button
                  onClick={falarComEquipe}
                  className="inline-block bg-white text-teal-600 border border-teal-200 font-semibold rounded-lg px-6 py-3 hover:bg-teal-50 transition"
                >
                  Fale com a Equipe
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src="/buss.jpg"
                alt="Reunião de negócios"
                className="w-64 md:w-80 lg:w-96 rounded-lg object-cover shadow-lg"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
          Por que escolher a Maximum Profits?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardHome
            titulo="Curadoria Técnica"
            texto="Analisamos origem, fase processual, riscos e documentação para listar somente créditos com informações claras e objetivas."
          />
          <CardHome
            titulo="Transparência Total"
            texto="Acompanhe status, deságio, prazos estimados e histórico — tudo em um só lugar, com linguagem direta."
          />
          <CardHome
            titulo="Atendimento Próximo"
            texto="Suporte humano e consultivo para tirar dúvidas, simular cenários e apoiar sua decisão de investimento."
          />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
          Como funciona
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepHome
            numero="1"
            titulo="Seleção de Oportunidades"
            texto="Publicamos créditos com informações fundamentais: valor estimado, deságio, fase e quantidade de cotas."
          />
          <StepHome
            numero="2"
            titulo="Análise e Reserva"
            texto="Você avalia os detalhes e manifesta interesse. Nosso time auxilia com dúvidas e viabilidade."
          />
          <StepHome
            numero="3"
            titulo="Acompanhamento e Recebimento"
            texto="Monitoramos o andamento e notificamos marcos importantes até a liquidação."
          />
        </div>
      </section>

      {/* CHAMADA PARA AÇÃO */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-700 px-10 py-12 shadow-lg text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold">
            Pronto para conhecer as oportunidades?
          </h3>
          <p className="mt-3 text-teal-100 text-lg">
            Explore a lista de créditos ou fale com nosso time para saber mais.
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <a
              href="/creditos"
              className="inline-block bg-white text-teal-700 font-semibold rounded-lg px-6 py-3 hover:bg-gray-100 transition"
            >
              Acessar Créditos
            </a>
            <button
              onClick={falarComEquipe}
              className="inline-block border border-white text-white font-semibold rounded-lg px-6 py-3 hover:bg-white hover:text-teal-700 transition"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
          Perguntas Frequentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
          Onde estamos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-gray-200 px-6 py-6 shadow text-gray-700">
            <p className="text-sm mb-3">
              <span className="font-semibold">Endereço: </span>
              {ENDERECO}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              contato@maximumprofits.com
            </p>
            <p>
              <span className="font-semibold">Telefone:</span> 61 99620-4646
            </p>
          </div>
          <MapEmbed lat={-15.860222} lng={-47.862396} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1117] text-sm mt-12 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-lg font-bold text-white">
                Maximum Profits
              </h4>
              <p className="mt-3">
                Plataforma especializada em créditos judiciais, conectando
                investidores a oportunidades seguras e transparentes no mercado
                brasileiro.
              </p>
              <p className="mt-3">© 2023 by Maximum Profits Technology.</p>
              <p>CNPJ: 35.340.252/0001-44</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">
                Informações Importantes
              </h4>
              <p>
                A Maximum Profits detém uma plataforma digital que atua como
                correspondente bancário para facilitar o processo de contratação
                de empréstimos. Não é instituição financeira e não fornece
                crédito ao mercado. Seguimos as diretrizes da Resolução CMN Nº
                4.935 do Banco Central do Brasil.
              </p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6">
            Todos os direitos reservados. Maximum Profits — Soluções em Créditos
            Judiciais
          </p>
        </div>
      </footer>
    </NavbarLayout>
  );
}

function CardHome({ titulo, texto }) {
  return (
    <div className="bg-white rounded-xl px-6 py-6 shadow-md hover:shadow-lg transition text-gray-700 text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 text-white mx-auto mb-4">
        {/* Aqui você pode inserir um ícone */}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{titulo}</h4>
      <p className="text-sm text-gray-600">{texto}</p>
    </div>
  );
}

function StepHome({ numero, titulo, texto }) {
  return (
    <div className="bg-white rounded-xl px-6 py-6 shadow-md hover:shadow-lg transition text-gray-700">
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold mb-3">
        {numero}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{titulo}</h4>
      <p className="text-sm text-gray-600">{texto}</p>
    </div>
  );
}

function FaqHome({ q, a }) {
  return (
    <div className="bg-white rounded-xl px-6 py-6 shadow-md hover:shadow-lg transition text-gray-700">
      <p className="font-semibold text-gray-900">{q}</p>
      <p className="text-sm text-gray-600 mt-2">{a}</p>
    </div>
  );
}
