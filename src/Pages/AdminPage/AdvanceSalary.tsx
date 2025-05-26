import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { useState } from "react";
import { AddQuotation } from "../../Components/QuotationModal/AddQuotation";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { EditQuotation } from "../../Components/QuotationModal/EditQuotation";

const numbers = [10, 25, 50, 100];

type AdvanceSalaryT = "ADD" | "VIEW" | "EDIT" | "";
export const AdvanceSalary = () => {
  const [isOpenModal, setIsOpenModal] = useState<AdvanceSalaryT>("");

  const [pageNo, setPageNo] = useState(1);

  const [selectedValue, setSelectedValue] = useState(10);

  const handleChangeShowData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(Number(event.target.value));
  };

  const handleIncrementPageButton = () => {
    setPageNo((prev) => prev + 1);
  };
  const handleDecrementPageButton = () => {
    setPageNo((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleToggleViewModal = (active: AdvanceSalaryT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Advance Salary" activeFile="All Quotation list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Addvance Salary Applications :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Advance Salry"
            handleToggle={() => handleToggleViewModal("ADD")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select value={selectedValue} onChange={handleChangeShowData}>
                {numbers.map((num, index) => (
                  <option key={index} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-5 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500  text-sm">
            <span className="p-2  min-w-[50px]">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Employee Name</span>
            <span className="p-2 text-left min-w-[150px] ">Date</span>
            <span className="p-2 text-left min-w-[150px] ">Amount</span>
            <span className="p-2 text-left min-w-[150px] ">Approval</span>
          </div>
          <div className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200 text-sm">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">Hamza amin</span>
            <span className=" p-2 text-left   ">23,oct,2025</span>
            <span className=" p-2 text-left  ">12000</span>
            <span className=" text-orange-500 ">
              <span className="bg-orange-100 p-2 rounded-full ">Pending</span>
            </span>
            <span className="p-2 flex items-center  gap-1">
              <EditButton handleUpdate={() => handleToggleViewModal("EDIT")} />

              <ViewButton handleView={() => handleToggleViewModal("VIEW")} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination
          handleIncrementPageButton={handleIncrementPageButton}
          handleDecrementPageButton={handleDecrementPageButton}
          pageNo={pageNo}
        />
      </div>

      {isOpenModal === "ADD" && (
        <AddQuotation setModal={() => handleToggleViewModal("")} />
      )}
      {isOpenModal === "EDIT" && (
        <EditQuotation setModal={() => handleToggleViewModal("")} />
      )}
    </div>
  );
};
