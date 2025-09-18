import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import NavbarLayout from "../components/Navbar";

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
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-20 rounded-xl shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                Soluções em Créditos Judiciais
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Investimento seguro,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  {" "}acompanhamento transparente
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Conectamos oportunidades de créditos judiciais a investidores, com curadoria especializada, 
                informações claras e um painel intuitivo para acompanhar cada etapa até o recebimento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/creditos"
                  className="group bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Ver Créditos Disponíveis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={falarComEquipe}
                  className="bg-white text-teal-600 border-2 border-teal-200 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Fale com a Equipe
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Reunião de negócios"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-teal-200 to-cyan-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a Maximum Profits?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa expertise e tecnologia garantem transparência total e segurança em cada investimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Curadoria Técnica"
              description="Analisamos origem, fase processual, riscos e documentação para listar somente créditos com informações claras e objetivas."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Transparência Total"
              description="Acompanhe status, deságio, prazos estimados e histórico — tudo em um só lugar, com linguagem direta."
            />
            <FeatureCard
              icon={Users}
              title="Atendimento Próximo"
              description="Suporte humano e consultivo para tirar dúvidas, simular cenários e apoiar sua decisão de investimento."
            />
          </div>
        </div>
      </section>
    </NavbarLayout>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
