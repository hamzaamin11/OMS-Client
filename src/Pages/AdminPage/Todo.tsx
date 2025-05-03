import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useState } from "react";
import { AddTodo } from "../../Components/TodoModals/AddTodo";
import { UpdateTodo } from "../../Components/TodoModals/UpdateTodo";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";

const numbers = [10, 25, 50, 100];
type TODOT = "Add" | "Edit" | "Delete" | "";

export const Todo = () => {
  const [isOpenModal, setIsOpenModal] = useState<TODOT>("");

  const handleToggleViewModal = (active: TODOT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Todo's" activeFile="All Todo,s list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Todo"
            handleToggle={() => handleToggleViewModal("Add")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
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
          <div className="grid grid-cols-6 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Date</span>
            <span className="p-2 text-left min-w-[150px] ">Users</span>
            <span className="p-2 text-left min-w-[150px] ">Clock In</span>
            <span className="p-2 text-left min-w-[150px] ">Clock Out</span>
            <span className="p-2 text-left min-w-[150px] ">Day</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          <div className="grid grid-cols-6 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">Hamza amin</span>
            <span className=" p-2 text-left  ">03210000000</span>
            <span className=" p-2 text-left ">frontend developer</span>
            <span className=" p-2 text-left ">22/2/2025</span>
            <span className="p-2 flex items-center  gap-2">
              <EditButton handleUpdate={() => handleToggleViewModal("Edit")} />

              <DeleteButton
                handleDelete={() => handleToggleViewModal("Delete")}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "Add" && (
        <AddTodo setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "Edit" && (
        <UpdateTodo setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "Delete" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("Delete")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleToggleViewModal("")}
        />
      )}
    </div>
  );
};
