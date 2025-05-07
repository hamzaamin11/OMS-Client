import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { Title } from "../Title";
import { OptionField } from "../InputFields/OptionField";
import { InputField } from "../InputFields/InputField";

type AddAttendanceProps = {
  setModal: () => void;
};

const optionData = [
  { label: "Please Select config type", value: "" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
];

const initialState = {
  configureType: "",
  configureTime: "",
};

export const EditConfigTime = ({ setModal }: AddAttendanceProps) => {
  const [addWithdraw, setAddWithdraw] = useState(initialState);

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
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
            <Title setModal={() => setModal()}>Update Config Time</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <OptionField
                labelName="Configure Type*"
                name="configureType"
                handlerChange={handlerChange}
                optionData={optionData}
                value={addWithdraw.configureType}
              />
              <InputField
                labelName="Configure Time*"
                name="onfigureTime"
                type="date"
                inputVal={addWithdraw.configureTime}
                handlerChange={handlerChange}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Configuration"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
