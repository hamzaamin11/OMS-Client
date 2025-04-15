import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { Title } from "../Title";
import { TextareaField } from "../InputFields/TextareaField";
import { OptionField } from "../InputFields/OptionField";

type AddAttendanceProps = {
  setModal: () => void;
};

const optionData = [
  { label: "Please Select Employee", value: "" },
  { label: "Hamza", value: "hamza" },
  { label: "Danish", value: "danish" },
  { label: "Awais", value: "awais" },
  { label: "Hadeed", value: "hadeed" },
  { label: "Adan", value: "adan" },
];

const initialState = {
  employeeName: "",
  reason: "",
};

export const AddWithdraw = ({ setModal }: AddAttendanceProps) => {
  const [addWithdraw, setAddWithdraw] = useState(initialState);

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddWithdraw({ ...addWithdraw, [name]: value.trim() });
  };

  console.log("submitted", addWithdraw);

  const handlerSubmitted = async () => {};

  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Employee Withdraw</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <OptionField
                labelName="Select Employee*"
                name="employeeName"
                handlerChange={handlerChange}
                optionData={optionData}
                value={addWithdraw.employeeName}
              />
              <TextareaField
                labelName="Reason*"
                name="reason"
                inputVal={addWithdraw.reason}
                handlerChange={handlerChange}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Withdraw"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
