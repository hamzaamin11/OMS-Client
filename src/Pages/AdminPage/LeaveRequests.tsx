import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";
import { AddLeave } from "../../Components/LeaveModals/AddLeave";
import { UpdateLeave } from "../../Components/LeaveModals/UpdateLeave";
import { ViewLeave } from "../../Components/LeaveModals/ViewLeave";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";

const numbers = [10, 25, 50, 10];

type ISOPENMODALT = "ADDLEAVE" | "VIEW" | "UPDATE";
export const LeaveRequests = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<ISOPENMODALT | "">("");

  console.log("isOpen =>", isOpenModal);
  const handleToggleViewModal = (active: ISOPENMODALT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };
  useEffect(() => {
    document.title = "(OMS) USER LEAVE";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("leaveList"));
    }, 1000);
  }, [dispatch]);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Leave" activeFile="Users Leaves list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex items-center justify-between mx-2 text-gray-800">
          <span>
            Total Number of Users on Leaves :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add User Leave"
            handleToggle={() => handleToggleViewModal("ADDLEAVE")}
          />
        </div>
        <div className="flex items-center justify-between mx-2 text-gray-800">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select>
                {numbers.map((num, index) => (
                  <option key={index}>{num}</option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-4 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2 text-left min-w-[150px] ">Employee Name</span>
            <span className="p-2 text-left min-w-[150px]  ">Subject Leave</span>
            <span className="p-2 text-left min-w-[150px]  ">Status</span>
            <span className="p-2 text-left min-w-[150px]  ">Action</span>
          </div>
          <div className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className="p-2 text-left    ">Hamza amin</span>
            <span className="p-2 text-left   ">stick</span>
            <span className="p-2 text-left  ">pending</span>

            <span className="p-2 text-left flex items-center gap-1  ">
              <EditButton
                handleUpdate={() => handleToggleViewModal("UPDATE")}
              />
              <ViewButton handleView={() => handleToggleViewModal("VIEW")} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>
      {isOpenModal === "ADDLEAVE" && (
        <AddLeave setModal={() => setIsOpenModal("")} />
      )}
      {isOpenModal === "UPDATE" && (
        <UpdateLeave setModal={() => setIsOpenModal("")} />
      )}
      {isOpenModal === "VIEW" && (
        <ViewLeave setIsOpenModal={() => setIsOpenModal("")} />
      )}
    </div>
  );
};
