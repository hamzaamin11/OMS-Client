type ButtonProps = {
  title: string;
  icon: React.ReactNode;
  arrowIcon?: React.ReactNode;
  isOpen: boolean;
  handlerClick: () => void;
  destinationLink?: string;
};

export const UserSideBarButton = ({
  title,
  icon,
  arrowIcon,
  isOpen,
  handlerClick,
}: ButtonProps) => {
  return (
    <div
      onClick={handlerClick}
      className={`flex items-center ${
        isOpen && "justify-center "
      } gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition shadow-lg m-1 font-sans`}
    >
      <span>{icon}</span>
      {isOpen ? "" : <span className="w-24 text-xs">{title}</span>}
      {!isOpen && arrowIcon && <span className="ml-6">{arrowIcon}</span>}
    </div>
  );
};
