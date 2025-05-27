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
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

type EXPENSET = "ADD" | "EDIT" | "DELETE" | "VIEW" | "";

type allExpenseT = {
  expenseName: string;
  expenseCategoryId: number;
  categoryName: string;
  addedBy: string;
  date: string;
  expenseStatus: string;
  amount: number | string;
};

export const Expenses = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<EXPENSET>("");

  const [allExpenses, setAllExpenses] = useState<allExpenseT[] | null>(null);

  const [editExpense, setEditExpense] = useState<allExpenseT | null>(null);

  const [viewExpense, setViewExpense] = useState<allExpenseT | null>(null);

  const [pageNo, setPageNo] = useState(1);

  const handleToggleViewModal = (active: EXPENSET) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const token = currentUser?.token;

  const getAllExpenses = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getExpense?page=${pageNo}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrementPageButton = () => {
    setPageNo(pageNo + 1);
  };

  const handleDecrementPageButton = () => {
    setPageNo(pageNo > 1 ? pageNo - 1 : 1);
  };

  const handleClickEditButton = (data: allExpenseT) => {
    handleToggleViewModal("EDIT");
    setEditExpense(data);
  };

  const handleClcickDeleteButton = (data: allExpenseT) => {
    handleToggleViewModal("VIEW");
    setViewExpense(data);
  };

  useEffect(() => {
    getAllExpenses();
  }, [pageNo]);

  useEffect(() => {
    document.title = "(OMS) EXPENSE";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("EXPENSE"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Expenses" activeFile="Expenses list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Expense :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              {[allExpenses?.length]}
            </span>
          </span>
          <CustomButton
            label="Add Expense"
            handleToggle={() => handleToggleViewModal("ADD")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div></div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-6 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Expense Name</span>
            <span className="p-2 text-left min-w-[150px] ">
              Expense Category
            </span>
            <span className="p-2 text-left min-w-[150px] ">Amount</span>
            <span className="p-2 text-left min-w-[150px] ">Add By</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allExpenses?.map((expense, index) => (
            <div
              className="grid grid-cols-6 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={expense.expenseCategoryId}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">{expense.expenseName}</span>
              <span className=" p-2 text-left  ">{expense.categoryName}</span>
              <span className=" p-2 text-left ">{expense.amount}</span>
              <span className=" p-2 text-left ">{expense.addedBy}</span>
              <span className="p-2 flex items-center  gap-1">
                <EditButton
                  handleUpdate={() => handleClickEditButton(expense)}
                />

                <ViewButton
                  handleView={() => handleClcickDeleteButton(expense)}
                />
                <DeleteButton
                  handleDelete={() => handleToggleViewModal("DELETE")}
                />
              </span>
            </div>
          ))}
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
        <AddExpense setModal={() => handleToggleViewModal("")} />
      )}
      {isOpenModal === "EDIT" && (
        <EditExpense
          setModal={() => handleToggleViewModal("")}
          editExpense={editExpense}
        />
      )}
      {isOpenModal === "VIEW" && (
        <ViewExpense
          setIsOpenModal={() => handleToggleViewModal("")}
          viewExpense={viewExpense}
        />
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
