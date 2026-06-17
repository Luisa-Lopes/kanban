import { PencilIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface ITaskColumn {
  text: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleModal: () => void;
}

const TaskColumn = ({ text, handleModal }: ITaskColumn) => {
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

        <h6 className="font-medium text-sm break-words">{text}</h6>
      </div>
    </>
  );
};

export default TaskColumn;
