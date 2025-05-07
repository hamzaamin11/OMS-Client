import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { useState } from "react";
import { AddEmployeePayment } from "../../Components/EmployeeAccountModal/AddEmployeePayment";
import { AddEmployeeRefund } from "../../Components/EmployeeAccountModal/AddEmployeeRefund";
import { ViewEmployeeAccount } from "../../Components/EmployeeAccountModal/ViewEmployeeAccount";
const numbers = [10, 25, 50, 10];

type EMPLOYEEACOUNTT = "ADDPAYMENT" | "ADDREFUND" | "VIEW" | "";

export const EmployeeAccount = () => {
  const [isOpenModal, setIsOpenModal] = useState<EMPLOYEEACOUNTT>("");

  const handleToggleViewModal = (active: EMPLOYEEACOUNTT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  return (
    <div className="w-full mx-2">
      <TableTitle
        tileName="Employee Accounts List"
        activeFile="Employee Accounts List"
      />

      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total Number of Employee Account :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <div className="flex gap-2">
            <CustomButton
              label="Payment Withdraw"
              handleToggle={() => handleToggleViewModal("ADDPAYMENT")}
            />
            <CustomButton
              label="Payment Refund"
              handleToggle={() => handleToggleViewModal("ADDREFUND")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select>
                {numbers.map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-5 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2 text-left min-w-[150px] ">Name</span>
            <span className="p-2 text-left min-w-[150px] ">Email</span>
            <span className="p-2 text-left min-w-[150px] ">Phone No#</span>
            <span className="p-2 text-left min-w-[150px] ">Actions</span>
          </div>
          <div className="grid grid-cols-5 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">Hamza</span>
            <span className=" p-2 text-left  ">hamzaamin10@gmail.com</span>
            <span className=" p-2 text-left   ">+923215965061</span>
            <span className="p-2 flex items-center  gap-1">
              <ViewButton handleView={() => handleToggleViewModal("VIEW")} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "ADDPAYMENT" && (
        <AddEmployeePayment setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "ADDREFUND" && (
        <AddEmployeeRefund setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "VIEW" && (
        <ViewEmployeeAccount setModal={() => handleToggleViewModal("")} />
      )}
    </div>
  );
};
