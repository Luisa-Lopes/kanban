import { IResponsible } from "@/Pages/ProjectDetails/types";
import { PencilIcon } from "@heroicons/react/24/outline";

interface ITaskColumn {
  task: {
    id: string;
    title: string;
    responsible?: IResponsible[];
    description?: string;
  };
  handleModal: () => void;
}

const TaskColumn = ({ task, handleModal }: ITaskColumn) => {
  return (
    <article className="group my-2 mx-auto w-[calc(100%-1rem)] rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="rounded-md bg-sky-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
          Tarefa #{task.id}
        </span>
        <button
          type="button"
          onClick={handleModal}
          aria-label={`Editar tarefa ${task.title}`}
          title="Editar tarefa"
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>

      <h6 className="break-words text-sm font-semibold leading-5 text-slate-800">
        {task.title || "Tarefa sem título"}
      </h6>
      {task.description && (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {task.description}
        </p>
      )}

      {task.responsible && task.responsible.length > 0 && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">
            Responsáveis
          </span>
          <div className="flex -space-x-2">
            {task.responsible.slice(0, 4).map((person) => (
              <div
                key={person.id}
                title={`${person.name}${person.role ? ` · ${person.role}` : ""}`}
                className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-sky-100 text-[10px] font-semibold text-sky-800"
              >
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  person.name.charAt(0).toUpperCase()
                )}
              </div>
            ))}
            {task.responsible.length > 4 && (
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-semibold text-slate-600">
                +{task.responsible.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default TaskColumn;
