import { Pagination } from "../../Components/Pagination/Pagination";

import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";

import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";

import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";

import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { AddSalaryCycle } from "../../Components/SalaryCycleModal/AddSalaryCycle";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

const numbers = [10, 25, 50, 10];

type SALARYCYCLET = "ADD" | "EDIT" | "DELETE" | "";

export const SalaryCycle = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<SALARYCYCLET>("");

  const handleToggleViewModal = (active: SALARYCYCLET) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  useEffect(() => {
    document.title = "(OMS) SALARY CYCLE";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("SALARY CYCLE"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Salary Cycle List" activeFile="All Todo,s list" />

      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Run Cycle"
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
          <div className="grid grid-cols-4 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2 text-left min-w-[150px] ">Year</span>
            <span className="p-2 text-left min-w-[150px] ">Month</span>
            <span className="p-2 text-left min-w-[150px] ">Status</span>
          </div>
          <div className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">2025</span>
            <span className=" p-2 text-left  ">Apirl</span>
            <span className="withdraw-button">
              <IoIosClose size={20} title="notaction" />
              Not Active
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>
      {isOpenModal === "ADD" && (
        <AddSalaryCycle setModal={() => handleToggleViewModal("")} />
      )}
    </div>
  );
};
