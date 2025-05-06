import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import { UserSelect } from "../InputFields/UserSelect";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { InputField } from "../InputFields/InputField";

type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  employeeName: "",
  expenseName: "",
  account: "",
  addBy: "",
  date: "",
};
export const EditExpense = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addExpense, setAddExpense] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddExpense({ ...addExpense, [name]: value });
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

  const handlerSubmitted = async () => {};

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Expense</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <UserSelect
                labelName="Employees*"
                name="employeeName"
                value={addExpense.employeeName}
                handlerChange={handlerChange}
                optionData={allUsers}
              />

              <InputField
                labelName="Expense Category*"
                name="expenseExpense"
                handlerChange={handlerChange}
                inputVal={addExpense.expenseName}
              />

              <InputField
                labelName="Account*"
                name="account"
                handlerChange={handlerChange}
                inputVal={addExpense.account}
              />

              <InputField
                labelName="Add By*"
                name="addBy"
                handlerChange={handlerChange}
                inputVal={addExpense.addBy}
              />

              <InputField
                labelName="Date*"
                name="date"
                handlerChange={handlerChange}
                inputVal={addExpense.date}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Expense"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
