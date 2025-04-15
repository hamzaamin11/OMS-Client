import React, { useEffect, useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { Title } from "../Title";
import { BASE_URL } from "../../Content/URL";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/Hooks";
import { UserSelect } from "../InputFields/UserSelect";

type AddAttendanceProps = {
  setModal: () => void;
  handleGetALLattendance: () => void;
};
const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const reasonLeaveOption = [
  {
    label: "Please Select Status",
    value: "",
  },
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
const initialState = {
  selectUser: "",
  date: currentDate,
  clockIn: "",
  clockOut: "",
  attendanceStatus: "",
};
export const AddAttendance = ({
  setModal,
  handleGetALLattendance,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addUserAttendance, setAddUserAttendance] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;
  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddUserAttendance({ ...addUserAttendance, [name]: value.trim() });
  };

  const handlerGetUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res?.data?.users, "<=>");
      setAllUsers(res?.data?.users);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addAttendance/${addUserAttendance?.selectUser}`,
        addUserAttendance,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(res.data);
      setModal();
      handleGetALLattendance();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlerGetUsers();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Attendance</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <UserSelect
                labelName="Select User*"
                name="selectUser"
                value={addUserAttendance.selectUser}
                handlerChange={handlerChange}
                optionData={allUsers}
              />
              <InputField
                labelName="Date*"
                placeHolder="Enter the Company Name"
                type="Date"
                name="date"
                inputVal={addUserAttendance.date ?? ""}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="Clock In*"
                placeHolder="Enter the Company Name"
                type="time"
                name="clockIn"
                inputVal={addUserAttendance.clockIn}
                handlerChange={handlerChange}
              />
              <InputField
                labelName="Clock Out*"
                placeHolder="Enter the Company Name"
                type="time"
                name="clockOut"
                inputVal={addUserAttendance.clockOut}
                handlerChange={handlerChange}
              />
            </div>
            <div className="px-2">
              <OptionField
                labelName="Attendance Status*"
                name="attendanceStatus"
                value={addUserAttendance.attendanceStatus}
                handlerChange={handlerChange}
                optionData={reasonLeaveOption}
              />
            </div>
            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Attendance"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
