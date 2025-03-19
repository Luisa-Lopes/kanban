import { useState } from "react";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const response = await fetch(
    `https://api.unsplash.com/topics/wallpapers/photos?orientation=landscape&client_id=${apiKey}`
);
const photographs = await response.json();

export const Dropdown = (props) => {
    const { image, setImage } = props;
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    let timeoutId;

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setDropdownOpen(false);
        }, 300); // 300 milissegundos de atraso (ajuste conforme necessário)
    };

    const handleMouseEnterDropdown = () => {
        clearTimeout(timeoutId);
    };

    return (
        <div className="relative inline-block">
            <img
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                src={image}
                alt="Image 1"
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
            />

            {isDropdownOpen && (
                <div
                    className="dropdown-content z-20  mt-1 bg-[#B4D4FF] rounded-xl left-[50%] right-[50%] gap-2 absolute grid grid-cols-3 w-[200px] p-2"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeave}
                >
                    {photographs.map((photo) => (
                        <button
                            key={photo.id}
                            onClick={() => setImage(photo.urls.full)}
                        >
                            <img
                                className={`w-10 h-10 object-cover rounded-full m-auto ${
                                    photo.urls.full === image &&
                                    "border-solid border-2 border-[#176B87]"
                                }`}
                                src={photo.urls.full}
                                alt={`Photo ${photo.id}`}
                                value={photo.urls.full}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    image: PropTypes.string,
    setImage: PropTypes.func,
};
