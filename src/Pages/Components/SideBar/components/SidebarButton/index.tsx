import { Link } from "react-router-dom";

interface ISideBarButton {
    link: string;
    title: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SidebarButton = ({ link, title, Icon }: ISideBarButton) => {
    return (
        <div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:border-2 hover:shadow-md">
            <Link to={link} className="flex gap-2">
                <Icon width={30} height={30} color="#ffffff" />
                <h1
                    className="font-semibold mt-auto"
                    style={{ color: "#ffffff" }}
                >
                    {title}
                </h1>
            </Link>
        </div>
    );
};

export default SidebarButton;
