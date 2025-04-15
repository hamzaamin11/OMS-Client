import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
import { TextareaField } from "../InputFields/TextareaField";

type AddAttendanceProps = {
  setModal: () => void;
};
const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const optionData = [
  { label: "Select Project Category", value: "" },
  { label: "Web Application", value: "webApplicaton" },
  {
    label: "Blog",
    value: "blog",
  },
  {
    label: "Graphic Designing",
    value: "graphicDesign",
  },
];

const initialState = {
  projectName: "",
  selectCategory: "",
  projectDescription: "",
  startDate: currentDate,
  endDate: currentDate,
};
export const UpdateProject = ({ setModal }: AddAttendanceProps) => {
  const [updateProject, setUpdateProject] = useState(initialState);

  const handlerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateProject({ ...updateProject, [name]: value.trim() });
  };

  console.log("submitted", updateProject);
  const handlerSubmitted = async () => {};
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
                inputVal={updateProject.projectName}
                handlerChange={handlerChange}
              />
              <OptionField
                labelName="Project Category*"
                name="selectCategory"
                value={updateProject.selectCategory}
                handlerChange={handlerChange}
                optionData={optionData}
              />

              <TextareaField
                labelName="Project Desciption"
                name="projectDescription"
                placeHolder="Enter Project Description..."
                handlerChange={handlerChange}
                inputVal={updateProject.projectDescription}
              />
              <InputField
                labelName="Start Date*"
                placeHolder="Enter the Start Date"
                type="Date"
                name="startDate"
                inputVal={updateProject.startDate}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="End Date*"
                placeHolder="Enter the End Date"
                type="date"
                name="endDate"
                inputVal={updateProject.endDate}
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
