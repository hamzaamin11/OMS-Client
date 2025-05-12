import { ShowDataNumber } from "../Components/Pagination/ShowDataNumber";
import { Pagination } from "../Components/Pagination/Pagination";
import { TableInputField } from "../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../Components/TableLayoutComponents/TableTitle";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { useEffect, useState } from "react";
import { navigationStart, navigationSuccess } from "../redux/NavigationSlice";
import { Loader } from "../Components/LoaderComponent/Loader";
import { AddProjectCategory } from "../Components/ProjectCategoryModal/AddProjectCategory";
import { EditCategory } from "../Components/ProjectCategoryModal/EditCategory";
import { ConfirmationModal } from "../Components/Modal/ComfirmationModal";
import { EditButton } from "../Components/CustomButtons/EditButton";
import { DeleteButton } from "../Components/CustomButtons/DeleteButton";
import axios from "axios";
import { BASE_URL } from "../Content/URL";
import { toast } from "react-toastify";

const numbers = [10, 25, 50, 10];

type TPROJECTCATEGORY = "ADDCATEGORY" | "EDITCATEGORY" | "DELETECATEGORY" | "";

type CATEGORYT = {
  id: number;
  categoryName: string;
};

export const ProjectsCatogries = () => {
  const { loader } = useAppSelector((state) => state?.NavigateSate);

  const { currentUser } = useAppSelector((state) => state.officeState);

  const token = currentUser?.token;

  const dispatch = useAppDispatch();

  const [allCategories, setAllCategories] = useState<CATEGORYT[] | null>(null);

  const [isOpenModal, setIsOpenModal] = useState<TPROJECTCATEGORY>("");

  const [selectCategory, setSelectCategory] = useState<CATEGORYT | null>(null);

  const [catchId, setCatchId] = useState<number>();

  const handleToggleViewModal = (active: TPROJECTCATEGORY) => {
    setIsOpenModal((prev) => (prev === active ? "" : "ADDCATEGORY"));
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getCategory`, {
        headers: { Authorization: token },
      });
      console.log(res.data);
      setAllCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCategory = (data: CATEGORYT) => {
    setIsOpenModal("EDITCATEGORY");
    setSelectCategory(data);
  };

  const clickDeleteButton = (id: number) => {
    setIsOpenModal("DELETECATEGORY");
    setCatchId(id);
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteCategory/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      getAllCategories();
      toast.success("Category has been deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "(OMS)ALL PROJECTS";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Project Category"));
    }, 1000);
    getAllCategories();
  }, []);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle
        tileName="Project Category"
        activeFile="Project Categorylist"
      />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total Number of Project Categories :
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Category"
            handleToggle={() => handleToggleViewModal("ADDCATEGORY")}
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
          <div className="grid grid-cols-2 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[150px]">Name</span>
            <span className="p-2 text-left min-w-[150px] ">Action</span>
          </div>
          {allCategories?.map((category) => (
            <div
              className="grid grid-cols-2 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={category.id}
            >
              <span className=" p-2 text-left ">{category?.categoryName}</span>

              <span className="p-2 flex items-center  gap-2">
                <EditButton
                  handleUpdate={() => handleSelectCategory(category)}
                />
                <DeleteButton
                  handleDelete={() => clickDeleteButton(category.id)}
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
      {isOpenModal === "ADDCATEGORY" && (
        <AddProjectCategory
          setModal={() => setIsOpenModal("")}
          getAllCategories={getAllCategories}
        />
      )}

      {isOpenModal === "EDITCATEGORY" && (
        <EditCategory
          setModal={() => setIsOpenModal("")}
          selectCategory={selectCategory}
          getAllCategories={getAllCategories}
        />
      )}
      {isOpenModal === "DELETECATEGORY" && (
        <ConfirmationModal
          isOpen={() => setIsOpenModal("DELETECATEGORY")}
          onClose={() => setIsOpenModal("")}
          message="Are you sure you want to delete this category"
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
};
