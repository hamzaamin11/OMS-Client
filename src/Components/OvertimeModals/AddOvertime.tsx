import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import { UserSelect } from "../InputFields/UserSelect";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { InputField } from "../InputFields/InputField";
import { toast } from "react-toastify";

type AddAttendanceProps = {
  setModal: () => void;
};

const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const initialState = {
  employeeId: "",
  task: "",
  note: "",
  startDate: currentDate,
  endDate: currentDate,
  deadline: currentDate,
};
export const AddOverTime = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addTodo, setAddTodo] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;

  const isAdmin = currentUser?.role;

  console.log("res", isAdmin);

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddTodo({ ...addTodo, [name]: value });
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllUsers(res?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/createTodo`, addTodo, {
        headers: {
          Authorization: token,
        },
      });

      console.log(res.data);
      setModal();

      toast.success("Todo submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Over Time</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              {currentUser?.role === "admin" && (
                <UserSelect
                  labelName="Employees*"
                  name="employeeId"
                  value={addTodo.employeeId}
                  handlerChange={handlerChange}
                  optionData={allUsers}
                />
              )}
              {currentUser?.role === "user" && (
                <InputField
                  labelName="Employee*"
                  name="employeeId"
                  handlerChange={handlerChange}
                  inputVal={
                    currentUser?.role === "user"
                      ? currentUser.name
                      : addTodo.employeeId
                  }
                />
              )}
              <InputField
                labelName="Task*"
                name="task"
                handlerChange={handlerChange}
                inputVal={addTodo.task}
              />

              <InputField
                labelName="Note*"
                name="note"
                handlerChange={handlerChange}
                inputVal={addTodo.note}
              />

              <div className="flex items-center justify-center gap-16">
                <InputField
                  labelName="Start Date*"
                  type="date"
                  name="startDate"
                  handlerChange={handlerChange}
                  inputVal={addTodo.startDate}
                />

                <InputField
                  labelName="End Date*"
                  type="date"
                  name="endDate"
                  handlerChange={handlerChange}
                  inputVal={addTodo.endDate}
                />

                <InputField
                  labelName="Deadline*"
                  type="date"
                  name="deadline"
                  handlerChange={handlerChange}
                  inputVal={addTodo.deadline}
                />
              </div>
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Todo"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
