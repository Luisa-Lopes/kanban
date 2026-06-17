import React from "react";
import { useNavigate } from "react-router-dom";
import { IDashboardResume } from "../../types";
interface ICard {
  project: IDashboardResume;
}

const statusColors: Record<string, string> = {
  "Em andamento": "bg-blue-100 text-blue-700",
  Concluído: "bg-green-100 text-green-700",
  Pausado: "bg-yellow-100 text-yellow-700",
  Cancelado: "bg-red-100 text-red-700",
};

const Card = ({ project }: ICard) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <section
      onClick={handleCardClick}
      className="
          bg-white
          rounded-xl
          overflow-hidden
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          cursor-pointer
          border
          border-slate-200
          flex
          flex-col
        "
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="
              w-full
              h-full
              object-cover
              hover:scale-105
              transition-transform
              duration-300
            "
        />
      </div>

      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-semibold text-lg line-clamp-2">
            {project.title}
          </h2>

          <span
            className={`
                text-xs
                px-2
                py-1
                rounded-full
                whitespace-nowrap
                ${statusColors[project.status] ?? "bg-slate-100 text-slate-700"}
              `}
          >
            {project.status}
          </span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-auto pt-2 border-t">
          <p className="text-xs text-slate-500">
            Criado em {new Date(project.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Card;
