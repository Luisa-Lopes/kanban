import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { IProjectSprint } from "@/Interfaces/Projects";
import ModalAddSprint from "../../../ModalAddSprint";
import { formatDate, formatStringDateForInput } from "@/utils/DatesFunctions";

interface IMainTaskCard {
  sprint: IProjectSprint;
}

const MainTaskCard = ({ sprint }: IMainTaskCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="group mx-auto flex min-h-[250px] w-[220px] flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="h-1.5 bg-gradient-to-r from-sky-500 to-indigo-500" />
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-4 flex items-start justify-between gap-2">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Sprint
            </span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label={`Editar sprint ${sprint.title}`}
              title="Editar sprint"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>

          <h3 className="break-words text-base font-semibold leading-5 text-slate-800">
            {sprint.title || "Sprint sem título"}
          </h3>
          <p className="mt-2 flex-1 break-words text-xs leading-5 text-slate-500">
            {sprint.description || "Sem descrição para esta sprint."}
          </p>

          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Período
            </p>
            <p className="mt-1 text-xs font-medium text-slate-600">
              {sprint.startDate
                ? formatDate(sprint.startDate)
                : "Data não definida"}
              {sprint.endDate && ` – ${formatDate(sprint.endDate)}`}
            </p>
          </div>
        </div>
      </article>

      <ModalAddSprint
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        sprint={sprint}
        projectId={sprint.projectId}
      />
    </>
  );
};

export default MainTaskCard;
