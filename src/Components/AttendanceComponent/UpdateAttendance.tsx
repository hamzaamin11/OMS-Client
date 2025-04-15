import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
type UpdateAttendanceT = {
  [key: string]: string;
};
type AddAttendanceProps = {
  setModal: () => void;
  updatedAttendance: UpdateAttendanceT;
  selectUser: string;
  date: string;
  clockIn: string;
  clockOut: string;
  attendanceStatus: string;
};
const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const optionData = [
  { label: "Select Please User", value: "" },
  { label: "Hamza", value: "hamza" },
  {
    label: "Danish",
    value: "danish",
  },
  {
    label: "Hadeed",
    value: "hadeed",
  },
];

const reasonLeaveOption = [
  {
    label: "Present",
    value: "present",
  },
  {
    label: "Absent",
    value: "absent",
  },
  {
    label: "Leave",
    value: "leave",
  },
];

export const UpdateAttendance = ({
  setModal,
  updatedAttendance,
}: AddAttendanceProps) => {
  const [addUserAttendance, setAddUserAttendance] =
    useState<UpdateAttendanceT | null>(updatedAttendance);

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddUserAttendance({ ...addUserAttendance, [name]: value.trim() });
  };

  console.log("submitted", addUserAttendance);
  const handlerSubmitted = async () => {};
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Attendance</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <OptionField
                labelName="Select User*"
                name="selectUser"
                value={addUserAttendance?.name ?? ""}
                handlerChange={handlerChange}
                optionData={optionData}
              />
              <InputField
                labelName="Date*"
                placeHolder="Enter the Company Name"
                type="Date"
                name="date"
                inputVal={addUserAttendance?.date?.slice(0, 10) ?? ""}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="Clock In*"
                placeHolder="Enter the Company Name"
                type="text"
                name="clockIn"
                inputVal={addUserAttendance?.clockIn ?? ""}
                handlerChange={handlerChange}
              />
              <InputField
                labelName="Clock Out*"
                placeHolder="Enter the Company Name"
                type="time"
                name="clockOut"
                inputVal={addUserAttendance?.clockOut ?? ""}
                handlerChange={handlerChange}
              />
            </div>
            <div className="px-2">
              <OptionField
                labelName="Attendance Status*"
                name="attendanceStatus"
                value={addUserAttendance?.attendanceStatus ?? ""}
                handlerChange={handlerChange}
                optionData={reasonLeaveOption}
              />
            </div>
            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Attendance"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
