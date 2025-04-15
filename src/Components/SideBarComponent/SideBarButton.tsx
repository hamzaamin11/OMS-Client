import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type ButtonProps = {
  title: string;
  icon: React.ReactNode;
  arrowIcon?: React.ReactNode;
  isOpen: boolean;
  handlerClick: () => void;
  activeBtn: string;
  activeBtns: string;
};

export const SideBarButton = ({
  title,
  icon,
  arrowIcon,
  isOpen,
  handlerClick,
  activeBtns,
  activeBtn,
}: ButtonProps) => {
  return (
    <div
      onClick={handlerClick}
      className={`flex items-center ${
        isOpen && "justify-center "
      } gap-2 p-2  rounded cursor-pointer text-gray-900 hover:bg-indigo-500 hover:text-white transition border-b m-1 ${
        activeBtns === activeBtn && "bg-indigo-500 text-white"
      } `}
    >
      <span>{icon}</span>
      {isOpen ? "" : <span className="w-24 text-xs">{title}</span>}
      {!isOpen && arrowIcon && (
        <span className="">
          {activeBtns === activeBtn ? (
            <FaChevronUp size={10} />
          ) : (
            <FaChevronDown size={10} />
          )}
        </span>
      )}
    </div>
  );
};
