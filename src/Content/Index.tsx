import { ReactNode } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { LiaUserClockSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";
import { MdAssessment } from "react-icons/md";
import { CiCalculator1 } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdPieChart } from "react-icons/md";

export type IconType = {
  id: number;
  icon: ReactNode;
  btnName: string;
};

export const sideBarIcon: IconType[] = [
  {
    id: 1,
    icon: <RxDashboard />,
    btnName: "Dashboard",
  },
  {
    id: 2,
    icon: <FaUsers />,
    btnName: "User",
  },
  {
    id: 3,
    icon: <LiaUserClockSolid />,
    btnName: "Attendance",
  },
  {
    id: 4,
    icon: <GiTakeMyMoney />,
    btnName: "PayRoll",
  },
  {
    id: 5,
    icon: <TfiWrite />,
    btnName: "Request",
  },

  {
    id: 6,
    icon: <MdAssessment />,
    btnName: "Assessment",
  },
  {
    id: 7,
    icon: <HiOutlineDocumentReport />,
    btnName: "Project Assign",
  },
  {
    id: 8,
    icon: <CiCalculator1 />,
    btnName: "Sale",
  },
  {
    id: 8,
    icon: <MdPieChart />,
    btnName: "Report & Analysis",
  },
];
