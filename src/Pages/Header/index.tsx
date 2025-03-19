import { Bars3Icon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

interface IHeader {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setSidebarOpen }: IHeader) => {
    return (
        <header className="grid grid-rows-1 grid-cols-9 w-screen px-5 bg-[#B4D4FF] h-10 items-center shadow-[#86B6F6] shadow-md">
            <div className="flex col-start-1 col-end-3 justify-between items-center">
                <div>
                    <Bars3Icon
                        className="cursor-pointer"
                        width={30}
                        height={30}
                        onClick={() => {
                            setSidebarOpen(true);
                        }}
                    />
                </div>

                <label className=" ">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-no-repeat bg-right bg-[#EEF5FF] rounded-2xl px-2"
                    ></input>
                </label>
            </div>

            <div className="col-start-4 col-end-7 flex justify-center">
                <h1 className=" text-center">Kanban</h1>
            </div>

            <div className="col-start-7 col-end-9 flex justify-end">
                <img
                    className="rounded-full h-8 w-8 object-cover"
                    src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt="Placeholder"
                />
            </div>
        </header>
    );
};

Header.propTypes = {
    image: PropTypes.string,
    setImage: PropTypes.func,
};
