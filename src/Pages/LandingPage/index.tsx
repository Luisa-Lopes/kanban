import { useNavigate } from "react-router-dom";
import {
  FolderIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../Layout";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FolderIcon,
      title: "Gerencie Projetos",
      description:
        "Organize e acompanhe o progresso de todos os seus projetos em um único lugar.",
    },
    {
      icon: ClockIcon,
      title: "Controle de Tarefas",
      description:
        "Visualize atividades, prazos e prioridades de forma simples e intuitiva.",
    },
    {
      icon: UserGroupIcon,
      title: "Trabalho em Equipe",
      description:
        "Colabore com sua equipe e mantenha todos alinhados com os objetivos.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-sky-600">
            Gerenciador de Projetos
          </h1>

          <Button variant="primary" onClick={() => navigate("/signin")}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-5xl font-bold">
            Gerencie seus projetos com eficiência
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-sky-100">
            Organize tarefas, acompanhe equipes e visualize o progresso dos seus
            projetos em uma única plataforma.
          </p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Tudo o que você precisa
            </h2>

            <p className="mt-3 text-slate-600">
              Ferramentas para organizar projetos e aumentar a produtividade da
              equipe.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-sky-100 p-3 text-sky-600">
                    <Icon width={28} height={28} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <h3 className="text-4xl font-bold text-sky-600">100+</h3>
              <p className="mt-2 text-slate-600">Projetos Gerenciados</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <h3 className="text-4xl font-bold text-sky-600">50+</h3>
              <p className="mt-2 text-slate-600">Equipes Atendidas</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <h3 className="text-4xl font-bold text-sky-600">1000+</h3>
              <p className="mt-2 text-slate-600">Tarefas Concluídas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-sky-600 px-5 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold">
            Comece a organizar seus projetos hoje
          </h2>

          <p className="mb-8 text-sky-100">
            Crie sua conta e tenha controle total das suas tarefas e equipes.
          </p>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/signin")}
          >
            Entrar
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
