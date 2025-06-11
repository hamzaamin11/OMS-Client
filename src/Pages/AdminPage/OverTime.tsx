import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { useEffect, useState } from "react";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";
import { AddOverTime } from "../../Components/OvertimeModals/AddOvertime";

const numbers = [10, 25, 50, 100];

type LoanT = "ADD" | "VIEW" | "EDIT" | "DELETE" | "";
export const OverTime = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<LoanT>("");

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
  const handleToggleViewModal = (active: LoanT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  useEffect(() => {
    document.title = "(OMS) OVER TIME";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("OVER TIME"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Over Time" activeFile="OverTime list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Overtime Work :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Time"
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
          <div className="grid grid-cols-[0.2fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 text-sm ">
            <span className="p-2  ">Sr</span>
            <span className="p-2  ">Employee Name</span>
            <span className="p-2">Date</span>
            <span className="p-2 ">Over Time</span>
            <span className="p-2 ">Approval</span>
            <span className="p-2 ">Actions</span>
          </div>
          <div className="grid grid-cols-[0.2fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] border border-gray-600 text-gray-800 hover:bg-gray-100 transition duration-200 text-sm items-center">
            <span className="p-2 ">1</span>
            <span className="p-2 ">Hamza Amin</span>
            <span className="p-2 ">23, May, 2025</span>
            <span className="p-2 ">32:10:20</span>

            <span className=" text-orange-500 ">
              <span className="bg-orange-100 p-2 rounded-full ">Pending</span>
            </span>
            <span className="p-2 flex items-center  gap-1">
              <DeleteButton
                handleDelete={() => handleToggleViewModal("DELETE")}
              />

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
        <AddOverTime setModal={() => handleToggleViewModal("")} />
      )}
      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleToggleViewModal("")}
          message="Are you sure you want to delete this overtime record?"
        />
      )}
    </div>
  );
};
