import { IResponsible } from "@/Pages/ProjectDetails/types";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface ITaskColumn {
  task: {
    id: string;
    title: string;
    responsible?: IResponsible[];
    description?: string;
  };
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleModal: () => void;
}

const TaskColumn = ({ task, handleModal }: ITaskColumn) => {
  return (
    <>
      <div
        className="bg-gray-100 rounded-lg shadow-md my-2 mx-auto p-4 hover:shadow-lg transition-shadow"
        style={{
          minHeight: 130,
        }}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={handleModal}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>

        <h6 className="font-medium text-sm break-words">{task.title}</h6>

        <div>
          {task?.responsible?.map((resp) => {
            return (
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                {resp.name.charAt(0)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
