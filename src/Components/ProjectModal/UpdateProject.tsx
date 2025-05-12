import React, { useEffect, useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
import { TextareaField } from "../InputFields/TextareaField";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";

type AllProjectT = {
  id: number;
  projectName: string;
  projectCategory: string;
  description: string;
  startDate: string;
  endDate: string;
};

type AllCategoryT = {
  id: number;
  categoryName: string;
};

type AddAttendanceProps = {
  setModal: () => void;
  selectProject: AllProjectT | null;
};

export const UpdateProject = ({
  setModal,
  selectProject,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [updateProject, setUpdateProject] = useState(selectProject);

  const [categories, setCategories] = useState<AllCategoryT[] | null>(null);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateProject({ ...updateProject, [name]: value } as AllProjectT);
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
  console.log("submitted", updateProject);
  const handlerSubmitted = async () => {};
  useEffect(() => {
    handleGetAllCategories();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] min-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Project</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Project Name*"
                placeHolder="Enter the Project Name"
                type="text"
                name="projectName"
                inputVal={updateProject?.projectName}
                handlerChange={handlerChange}
              />
              <OptionField
                labelName="Project Category*"
                name="selectCategory"
                value={updateProject?.projectCategory ?? ""}
                handlerChange={handlerChange}
                optionData={categories?.map((category) => ({
                  id: category.id,
                  label: category?.categoryName,
                  value: category?.categoryName,
                }))}
                inital={"Please Select Project Category"}
              />

              <TextareaField
                labelName="Project Desciption"
                name="projectDescription"
                placeHolder="Enter Project Description..."
                handlerChange={handlerChange}
                inputVal={updateProject?.description ?? ""}
              />
              <InputField
                labelName="Start Date*"
                placeHolder="Enter the Start Date"
                type="Date"
                name="startDate"
                inputVal={updateProject?.startDate.slice(0, 10) ?? ""}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="End Date*"
                placeHolder="Enter the End Date"
                type="date"
                name="endDate"
                inputVal={updateProject?.endDate.slice(0, 10) ?? ""}
                handlerChange={handlerChange}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Project"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
