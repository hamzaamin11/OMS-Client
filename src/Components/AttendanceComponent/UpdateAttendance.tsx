import React, { useEffect, useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";
import { UserSelect } from "../InputFields/UserSelect";
type UpdateAttendanceT = {
  id: number;
  attendanceStatus: string; // e.g., "Present"
  clockIn: string; // e.g., "14:38:00"
  clockOut: string; // e.g., "14:49:12"
  date: string; // ISO date format string e.g., "2025-03-07T00:00:00.000Z"
  day: string; // e.g., "Friday"
  leaveApprovalStatus: string | null; // null if no leave
  leaveReason: string | null; // null if no leave reason
  name: string; // e.g., "Alice Johnson"
  role: string; // e.g., "admin"
  status: string; // e.g., "Y"
  userId: number; // e.g., 1 (number type)
  workingHours: string; // e.g., "11 Minutes"
};

type AddAttendanceProps = {
  setModal: () => void;
  updatedAttendance: UpdateAttendanceT | null;
};

const reasonLeaveOption = [
  {
    id: 1,
    label: "Present",
    value: "present",
  },
  {
    id: 2,
    label: "Absent",
    value: "absent",
  },
  {
    id: 3,
    label: "Leave",
    value: "leave",
  },
];

export const UpdateAttendance = ({
  setModal,
  updatedAttendance,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const token = currentUser?.token;

  const [addUserAttendance, setAddUserAttendance] =
    useState<UpdateAttendanceT | null>(updatedAttendance);

  const [allUsers, setAllUsers] = useState([]);

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddUserAttendance({
      ...addUserAttendance,
      [name]: value,
    } as UpdateAttendanceT);
  };

  const handlerGetUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllUsers(res?.data?.users);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  useEffect(() => {
    handlerGetUsers();
  }, []);

  const handlerSubmitted = async () => {};
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Attendance</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <UserSelect
                labelName="Select User*"
                name="selectUser"
                value={addUserAttendance?.name ?? ""}
                handlerChange={handlerChange}
                optionData={allUsers}
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
                inital="Please Select Reason"
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
