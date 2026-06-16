import React from "react";
import { useNavigate } from "react-router-dom";

interface ICard {
    image: string;
}

const Card = ({ image }: ICard) => {
    const navigate = useNavigate();

    const handleCardClick = (id: string) => {
        navigate(`/projects/${id}`);
    };

    return (
        <section
            className="w-full h-full p-4 bg-gray-200 rounded-lg shadow-md flex cursor-pointer"
            onClick={() => handleCardClick("gestao")}
        >
            <div
                style={{
                    width: 80,
                    height: "100%",
                }}
                className="flex"
            >
                <img src={image} className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-grow justify-center items-center">
                <h2 className="font-semibold">Projeto Gestão</h2>
            </div>
        </section>
    );
};

export default Card;
