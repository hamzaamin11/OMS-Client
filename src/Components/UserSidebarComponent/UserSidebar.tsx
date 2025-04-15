import { AccordionItem } from "../Accordion/AccordionItem";
import { SideBarButton } from "../SideBarComponent/SideBarButton";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiFingerprintDuotone } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { CiCalculator2 } from "react-icons/ci";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";

import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { UserSideBarButton } from "./UserSidebarButton";

type SideBarProps = {
  isOpen: boolean;
};
type TActivButton =
  | "Dashboard"
  | "People"
  | "Attendance"
  | "Employee"
  | "Assign Projects"
  | "Todo"
  | "Sale"
  | "manageExpense"
  | "Chat"
  | "monthlyAccount"
  | "configureTime"
  | "Accounts"
  | "Reports"
  | "Progress";
export const UserSidebar = ({ isOpen }: SideBarProps) => {
  const [activeBtns, setActiveBtns] = useState<TActivButton | "">("");
  const toggleButtonActive = (activeBtn: TActivButton) => {
    setActiveBtns((prev) => (prev === activeBtn ? "" : activeBtn));
  };
  return (
    <div
      className={`${
        isOpen ? "w-16" : "w-56"
      } bg-indigo-500  overflow-y-auto transition-all duration-300 ease-in-out flex flex-col items-center py-4 shadow-lg 
     `}
    >
      <UserSideBarButton
        isOpen={isOpen}
        icon={<MdOutlineDashboard size={20} />}
        title={"Dashboard"}
        handlerClick={() => toggleButtonActive("Dashboard")}
        destinationLink={"/user"}
      />
      <SideBarButton
        isOpen={isOpen}
        icon={<MdOutlineDashboard size={20} />}
        title={"Dashboard"}
        handlerClick={() => toggleButtonActive("Dashboard")}
        destinationLink={"/user"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<PiFingerprintDuotone size={20} />}
        title={"Attendance"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Attendance")}
        destinationLink={"/userAttendance"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<GoProjectRoadmap size={20} />}
        title={"Assign Project"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Assign Projects")}
        destinationLink={"/assignProject"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<LuListTodo size={20} />}
        title={"Todo's"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Todo")}
        destinationLink={"/userTodo"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<CiCalculator2 size={20} />}
        title={"Progress"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Progress")}
        destinationLink={"/"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<LiaProjectDiagramSolid size={20} />}
        title={"Apply Leave"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("manageExpense")}
        destinationLink="/userApplyLeave"
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<BsChatDots size={20} />}
        title={"Conversation"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Chat")}
        destinationLink={"/conversation"}
      />

      <SideBarButton
        isOpen={isOpen}
        icon={<AiOutlineFieldTime size={20} />}
        title={"Configure Time"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("configureTime")}
      />
      <div>
        {activeBtns === "configureTime" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/"}>
                Config Time
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>

      <SideBarButton
        isOpen={isOpen}
        icon={<HiOutlineDocumentReport size={20} />}
        title={"Reports"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Reports")}
      />
      <div
        className={`${
          activeBtns === "Reports" && "transition-all duration-300 ease-in-out"
        }`}
      >
        {activeBtns === "Reports" && (
          <AccordionItem isOpen={isOpen}>
            <ul
              className={`flex flex-col list-disc  ${
                activeBtns === "Reports"
              } && "transition-all duration-300  ease-in-out"`}
            >
              <Link className="my-button" to={"/"}>
                Progress Reports
              </Link>
              <Link className="my-button" to={"/"}>
                Attendance Reports
              </Link>
              <Link className="my-button" to={"/"}>
                Tasks Reports
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
    </div>
  );
};
