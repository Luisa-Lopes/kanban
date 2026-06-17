import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ModalMainTaskCard from "../ModalMainTaskCard";

interface IMainTaskCard {
  title: string;
  description: string;
}

const MainTaskCard = ({ title, description }: IMainTaskCard) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="bg-gray-300 rounded-lg shadow-md p-2 mx-auto"
        style={{ height: 130, width: 200 }}
      >
        <span className="flex items-start justify-start" style={{ height: 50 }}>
          <h6 className="font-medium text-sm">{title}</h6>
          <button className="" onClick={() => setIsModalOpen(true)}>
            <PencilIcon style={{ width: 15, height: 15 }} />
          </button>
        </span>

        <hr />
        <p className="text-xs">{description}</p>
      </div>
      <ModalMainTaskCard
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={title}
        description={description}
      />
    </>
  );
};

export default MainTaskCard;
