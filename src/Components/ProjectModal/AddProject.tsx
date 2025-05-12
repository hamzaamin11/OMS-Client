import React, { FormEvent, useEffect, useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
import { TextareaField } from "../InputFields/TextareaField";
import axios from "axios";
import { useAppSelector } from "../../redux/Hooks";
import { BASE_URL } from "../../Content/URL";
import { toast } from "react-toastify";

type AddAttendanceProps = {
  setModal: () => void;
  handleGetAllProjects: () => void;
};
const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

type AllCategoryT = {
  id: number;
  categoryName: string;
};

const initialState = {
  projectName: "",
  selectCategory: "",
  projectDescription: "",
  startDate: currentDate,
  endDate: currentDate,
};
export const AddProject = ({
  setModal,
  handleGetAllProjects,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addProject, setAddProject] = useState(initialState);

  const [categories, setCategories] = useState<AllCategoryT[] | null>(null);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddProject({ ...addProject, [name]: value });
  };

  const handleGetAllCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getCategory`, {
        headers: {
          Authorization: token,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("submitted", addProject);
  const handlerSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/addProject`, addProject, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      handleGetAllProjects();
      setModal();
      toast.success("Project is submit successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllCategories();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] min-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Project</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Project Name*"
                placeHolder="Enter the Project Name"
                type="text"
                name="projectName"
                inputVal={addProject.projectName}
                handlerChange={handlerChange}
              />
              <OptionField
                labelName="Project Category*"
                name="selectCategory"
                value={addProject.selectCategory}
                handlerChange={handlerChange}
                optionData={categories?.map((category) => ({
                  id: category.id,
                  label: category.categoryName,
                  value: category.categoryName,
                }))}
                inital="Select Project Category"
              />

              <TextareaField
                labelName="Project Desciption"
                name="projectDescription"
                placeHolder="Enter Project Description..."
                handlerChange={handlerChange}
                inputVal={addProject.projectDescription}
              />
              <InputField
                labelName="Start Date*"
                placeHolder="Enter the Start Date"
                type="Date"
                name="startDate"
                inputVal={addProject.startDate}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="End Date*"
                placeHolder="Enter the End Date"
                type="date"
                name="endDate"
                inputVal={addProject.endDate}
                handlerChange={handlerChange}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Project"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
