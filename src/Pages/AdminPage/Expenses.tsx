import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { useEffect, useState } from "react";
import { AddExpense } from "../../Components/ManageExpense/AddExpense";
import { EditExpense } from "../../Components/ManageExpense/EditExpense";
import { ViewExpense } from "../../Components/ManageExpense/ViewExpense";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";

const numbers = [10, 25, 50, 10];

type EXPENSET = "ADD" | "EDIT" | "DELETE" | "VIEW" | "";

export const Expenses = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [isOpenModal, setIsOpenModal] = useState<EXPENSET>("");

  const handleToggleViewModal = (active: EXPENSET) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const token = currentUser?.token;

  const getAllExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getExpense`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Expenses" activeFile="Expenses list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Expense :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Expense"
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
            <span className="p-2 text-left min-w-[150px] ">Expense Name</span>
            <span className="p-2 text-left min-w-[150px] ">
              Expense Category
            </span>
            <span className="p-2 text-left min-w-[150px] ">Amount</span>
            <span className="p-2 text-left min-w-[150px] ">Add By</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          <div className="grid grid-cols-6 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200">
            <span className=" p-2 text-left ">1</span>
            <span className=" p-2 text-left   ">Hamza amin</span>
            <span className=" p-2 text-left  ">03210000000</span>
            <span className=" p-2 text-left ">frontend developer</span>
            <span className=" p-2 text-left ">22/2/2025</span>
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
        <AddExpense setModal={() => handleToggleViewModal("")} />
      )}
      {isOpenModal === "EDIT" && (
        <EditExpense setModal={() => handleToggleViewModal("")} />
      )}
      {isOpenModal === "VIEW" && (
        <ViewExpense setIsOpenModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          onClose={() => handleToggleViewModal("")}
          isOpen={() => handleToggleViewModal("DELETE")}
          onConfirm={() => handleToggleViewModal("")}
        />
      )}
    </div>
  );
};
