import { AccordionItem } from "./Accordion/AccordionItem";
import { SideBarButton } from "./SideBarComponent/SideBarButton";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { PiFingerprintDuotone } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { CiCalculator2 } from "react-icons/ci";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { BsChatDots } from "react-icons/bs";
import { RiRecycleLine } from "react-icons/ri";
import { AiOutlineFieldTime } from "react-icons/ai";
import { CgCalculator } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
type SideBarProps = {
  isOpen: boolean;
};
type TActivButton =
  | "Dashboard"
  | "People"
  | "Attendance"
  | "Employee"
  | "AssignProjects"
  | "Todo"
  | "Sale"
  | "manageExpense"
  | "Chat"
  | "monthlyAccount"
  | "configureTime"
  | "Accounts"
  | "Reports";
export const SideBar = ({ isOpen }: SideBarProps) => {
  
  const [activeBtns, setActiveBtns] = useState<TActivButton | "">("");

  const navigate = useNavigate();

  console.log(activeBtns);

  const toggleButtonActive = (activeBtn: TActivButton) => {
    setActiveBtns((prev) => (prev === activeBtn ? "" : activeBtn));
  };

  useEffect(() => {
    if (!isOpen) setActiveBtns("");
    setActiveBtns("Dashboard");
    navigate("/admin/dashboard");
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "w-16" : "w-52"
      } bg-white overflow-y-auto transition-all duration-300 ease-in-out flex flex-col items-center py-4 shadow-lg 
     `}
    >
      {!isOpen ? (
        <Link
          to={"/admin/dashBoard"}
          onClick={() => setActiveBtns("Dashboard")}
          className={`flex items-center ${
            isOpen && "justify-between "
          } gap-2 p-2  rounded cursor-pointer text-gray-900  hover:bg-indigo-500 hover:text-white transition border-b m-1  w-40 ${
            activeBtns === "Dashboard" && "bg-indigo-500 text-white"
          } `}
        >
          <MdOutlineDashboard size={20} />
          <p className="text-xs">Dashboard</p>
        </Link>
      ) : (
        <div
          className={`flex items-center ${
            isOpen && "justify-between "
          } gap-2 p-2  rounded cursor-pointer hover:bg-indigo-500 border-b  transition m-1  text-gray-900  `}
        >
          <MdOutlineDashboard size={20} />
        </div>
      )}
      <SideBarButton
        isOpen={isOpen}
        icon={<FaUserFriends size={20} />}
        title={"People"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("People")}
        activeBtns={activeBtns}
        activeBtn="People"
      />
      <div className="">
        {activeBtns === "People" && (
          <AccordionItem isOpen={isOpen}>
            <div className="flex flex-col items-start justify-start">
              <Link className="my-button" to={"/users"}>
                User
              </Link>
              <Link className="my-button" to={"/customers"}>
                Customer
              </Link>
            </div>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<PiFingerprintDuotone size={20} />}
        title={"Attendance"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Attendance")}
        activeBtns={activeBtns}
        activeBtn="Attendance"
      />
      <div>
        {activeBtns === "Attendance" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/markAttendance"}>
                Mark Attendance
              </Link>
              <Link className="my-button" to={"/usersAttendance"}>
                User Attendance
              </Link>
              <Link className="my-button" to={"/leaveRequests"}>
                Leave Request
              </Link>
              <Link className="my-button" to={"/holidays"}>
                Configure Holidays
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<FaUser size={20} />}
        title={"Employee"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Employee")}
        activeBtns={activeBtns}
        activeBtn="Employee"
      />
      <div>
        {activeBtns === "Employee" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/employeeWithdraw"}>
                Employee Withdraw
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<GoProjectRoadmap size={20} />}
        title={"Assign Project"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("AssignProjects")}
        activeBtns={activeBtns}
        activeBtn="AssignProjects"
      />
      <div>
        {activeBtns === "AssignProjects" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/projects"}>
                Projects
              </Link>
              <Link className="my-button" to={"/projectCatogries"}>
                Project Categories
              </Link>
              <Link className="my-button" to={"/assignprojects"}>
                Assign Project
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<LuListTodo size={20} />}
        title={"Todo's"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Todo")}
        activeBtns={activeBtns}
        activeBtn="Todo"
      />
      <div>
        {activeBtns === "Todo" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/todo"}>
                Todo
              </Link>
              <Link className="my-button" to={"/progress"}>
                Progress
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<CiCalculator2 size={20} />}
        title={"Sales"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Sale")}
        activeBtns={activeBtns}
        activeBtn="Sale"
      />
      <div>
        {activeBtns === "Sale" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/sales"}>
                Sales
              </Link>
              <Link className="my-button" to={"/quotations"}>
                Quotation
              </Link>
              <Link className="my-button" to={"/payments"}>
                Payment
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<LiaProjectDiagramSolid size={20} />}
        title={"Manage Expense"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("manageExpense")}
        activeBtns={activeBtns}
        activeBtn="manageExpense"
      />
      <div className="">
        {activeBtns === "manageExpense" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/expenses"}>
                Expense
              </Link>
              <Link className="my-button" to={"/expensesCatogries"}>
                Expense Category
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<BsChatDots size={20} />}
        title={"Chat"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Chat")}
        activeBtns={activeBtns}
        activeBtn="Chat"
      />
      <div>
        {activeBtns === "Chat" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/communication"}>
                Communication
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<RiRecycleLine size={20} />}
        title={"Monthly Cycle Account"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("monthlyAccount")}
        activeBtns={activeBtns}
        activeBtn="monthlyAccount"
      />
      <div>
        {activeBtns === "monthlyAccount" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/calendar"}>
                Calendar
              </Link>
              <Link className="my-button" to={"/salaryCycle"}>
                Salary Cycle
              </Link>
              <Link className="my-button" to={"/configEmployeeSalaries"}>
                Config Employee Salaries
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<AiOutlineFieldTime size={20} />}
        title={"Configure Time"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("configureTime")}
        activeBtns={activeBtns}
        activeBtn="configure"
      />
      <div>
        {activeBtns === "configureTime" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/configTime"}>
                Config Time
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
      <SideBarButton
        isOpen={isOpen}
        icon={<CgCalculator size={20} />}
        title={"Accounts"}
        arrowIcon={<BiArrowBack />}
        handlerClick={() => toggleButtonActive("Accounts")}
        activeBtns={activeBtns}
        activeBtn="Accounts"
      />
      <div>
        {activeBtns === "Accounts" && (
          <AccordionItem isOpen={isOpen}>
            <ul className="flex flex-col ">
              <Link className="my-button" to={"/employeeAccount"}>
                Employee Account
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
        activeBtns={activeBtns}
        activeBtn="Reports"
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
              <Link className="my-button" to={"/salesReports"}>
                Sale Reports
              </Link>
              <Link className="my-button" to={"/progressReport"}>
                Progress Reports
              </Link>
              <Link className="my-button" to={"/attendanceReports"}>
                Attendance Reports
              </Link>
              <Link className="my-button" to={"/processReports"}>
                Process Reports
              </Link>
              <Link className="my-button" to={"/paymentReports"}>
                Payment Reports
              </Link>
              <Link className="my-button" to={"/expenseReports"}>
                Expense Reports
              </Link>
            </ul>
          </AccordionItem>
        )}
      </div>
    </div>
  );
};
