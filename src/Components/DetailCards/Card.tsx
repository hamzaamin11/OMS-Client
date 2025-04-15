import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  titleName: string;
  totalUser: string;
  totalNumber: number;
  icon: ReactNode;
  style: string; // Style ko string kar diya taki Tailwind classes pass ho sakein
};

const Card = ({ titleName, totalNumber, icon, style }: CardProps) => {
  return (
    <div
      className={`w-full mx-2 h-[120px] rounded-lg shadow-lg p-4 flex flex-col justify-between ${style} text-white relative overflow-hidden`}
    >
      {/* Background Circles */}
      <div className="absolute top-[-30px] right-[-20px] w-[120px] h-[120px] bg-white opacity-20 rounded-full"></div>
      <div className="absolute bottom-[-30px] left-[-20px] w-[100px] h-[100px] bg-white opacity-20 rounded-full"></div>

      {/* Icon & Title */}
      <div className="relative flex items-center justify-between">
        <span className=" ">{titleName}</span>
        <div className="text-3xl">{icon}</div>
      </div>

      {/* Number */}
      <p className="relative text-3xl font-bold">{totalNumber}</p>
      <div className="text-center shadow ">
        <Link className="shadow-2xl" to={""}>
          More info
        </Link>
      </div>
    </div>
  );
};

export default Card;
