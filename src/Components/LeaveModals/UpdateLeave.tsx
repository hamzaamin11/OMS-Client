import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";

import { Title } from "../Title";
import { TextareaField } from "../InputFields/TextareaField";
import { OptionField } from "../InputFields/OptionField";

type AddAttendanceProps = {
  setModal: () => void;
};
const optionData = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];
const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const initialState = {
  subjectLeave: "",
  date: currentDate,
  leaveReason: "",
  status: "",
};

export const UpdateLeave = ({ setModal }: AddAttendanceProps) => {
  const [updateLeave, setUpdateLeave] = useState(initialState);

  const handlerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateLeave({ ...updateLeave, [name]: value.trim() });
  };

  console.log("submitted", updateLeave);

  const handlerSubmitted = async () => {};

  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Leave</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Subject Leave*"
                placeHolder="Enter the Leave Subject"
                type="text"
                name="subjectLeave"
                inputVal={updateLeave.subjectLeave}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="Date*"
                placeHolder="Enter the Company Name"
                type="Date"
                name="date"
                inputVal={updateLeave.date}
                handlerChange={handlerChange}
              />

              <TextareaField
                labelName="Leave Reason*"
                placeHolder="Enter the Leave Reason"
                name="leaveReason"
                inputVal={updateLeave.leaveReason}
                handlerChange={handlerChange}
              />
              <OptionField
                labelName="Status"
                name="status"
                value={updateLeave.status}
                handlerChange={handlerChange}
                optionData={optionData}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Leave"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
