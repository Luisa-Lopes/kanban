import { Link } from "react-router-dom";

interface ISideBarButton {
  link: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  className?: string;
  setOpenSidebar: (open: boolean) => void;
}

const SidebarButton = ({
  link,
  title,
  Icon,
  active = false,
  className = "",
  setOpenSidebar,
}: ISideBarButton) => {
  return (
    <Link
      onClick={() => {
        setOpenSidebar(false);
      }}
      to={link}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
        active ? "bg-white/20 shadow-sm" : "hover:bg-white/10"
      } ${className}`}
    >
      <Icon width={24} height={24} className="text-white" />
      <span className="text-white">{title}</span>
    </Link>
  );
};

export default SidebarButton;
