import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { useEffect, useState } from "react";
import { AddConfigEmpSalary } from "../../Components/ConfigEmpSalaryModal/AddConfigEmpSalary";
import { EditConfigEmpSalary } from "../../Components/ConfigEmpSalaryModal/EditConfigEmpSalary";
import { ViewConfigEmpSalary } from "../../Components/ConfigEmpSalaryModal/ViewConfigEmpSalary";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

const numbers = [10, 25, 50, 10];

type CONFIGT = "ADD" | "EDIT" | "DELETE" | "VIEW" | "";

export const ConfigEmpSalary = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<CONFIGT>("");

  const handleToggleViewModal = (active: CONFIGT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  useEffect(() => {
    document.title = "(OMS) CONFIG SALARY";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("CONFIG SALARY"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Salaries" activeFile="Salaries list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Salaries :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Salaries"
            handleToggle={() => handleToggleViewModal("ADD")}
          />
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
          <div className="grid grid-cols-6 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2  min-w-[150px]">User Name</span>
            <span className="p-2 text-left min-w-[150px]">Salary of Month</span>
            <span className="p-2 text-left min-w-[150px]">Total Salary</span>
            <span className="p-2 text-left min-w-[150px]">Date</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          <div className="grid grid-cols-6 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">Hamza Amin</span>
            <span className=" p-2 text-left   ">50000</span>
            <span className=" p-2 text-left   ">3000000</span>
            <span className=" p-2 text-left   ">10-4-2025</span>
            <span className="p-2 flex items-center  gap-1">
              <EditButton handleUpdate={() => handleToggleViewModal("EDIT")} />
              <ViewButton handleView={() => handleToggleViewModal("VIEW")} />
              <DeleteButton
                handleDelete={() => handleToggleViewModal("DELETE")}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "ADD" && (
        <AddConfigEmpSalary setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "EDIT" && (
        <EditConfigEmpSalary setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "VIEW" && (
        <ViewConfigEmpSalary setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleToggleViewModal("")}
        />
      )}
    </div>
  );
};
