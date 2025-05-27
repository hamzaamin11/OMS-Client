import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddCategory } from "../../Components/ExpenseCategoryModal/AddCategory";
import { EditCategory } from "../../Components/ProjectCategoryModal/EditCategory";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { toast } from "react-toastify";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

const numbers = [10, 25, 50, 10];

type EXPENSECATEGORYT = "ADD" | "EDIT" | "DELETE" | "";

type AllExpenseCategoryT = {
  id: number;
  categoryName: string;
};

export const ExpensesCatogries = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const token = currentUser?.token;

  const [isOpenModal, setIsOpenModal] = useState<EXPENSECATEGORYT>("");

  const [catchId, setCatchId] = useState<number>();

  const [allExpenseCategory, setAllExpenseCategory] = useState<
    AllExpenseCategoryT[] | null
  >(null);

  const [selectCategory, setSelectCategory] =
    useState<AllExpenseCategoryT | null>(null);

  const handleToggleViewModal = (active: EXPENSECATEGORYT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handlegetExpenseCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getExpenseCategory`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      setAllExpenseCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditButton = (data: AllExpenseCategoryT) => {
    handleToggleViewModal("EDIT");
    setSelectCategory(data);
  };

  const handleClickDeleteButton = (id: number) => {
    handleToggleViewModal("DELETE");
    setCatchId(id);
  };
  const handleDeleteCategory = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteExpenseCategory/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.info("Category has been deleted successfully");
      console.log(res.data);
      handlegetExpenseCategory();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlegetExpenseCategory();
    document.title = "(OMS)EXPENSE CATEGORY";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("EXPENSE CATEGORY"));
    }, 1000);
  }, []);
  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle
        tileName="Expense Category List"
        activeFile="Expense Category list"
      />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Expense Category"
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
          <div className="grid grid-cols-3 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2  min-w-[150px]">Category Name</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allExpenseCategory?.map((category, index) => (
            <div
              className="grid grid-cols-3 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={category.id}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">{category.categoryName}</span>
              <span className="p-2 flex items-center  gap-1">
                <EditButton
                  handleUpdate={() => handleClickEditButton(category)}
                />

                <DeleteButton
                  handleDelete={() => handleClickDeleteButton(category.id)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "ADD" && (
        <AddCategory setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "EDIT" && (
        <EditCategory
          setModal={() => handleToggleViewModal("")}
          selectCategory={selectCategory}
          getAllCategories={handlegetExpenseCategory}
        />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleDeleteCategory()}
          message="Are you sure to want delete this category?"
        />
      )}
    </div>
  );
};
