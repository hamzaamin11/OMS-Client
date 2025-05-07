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

const data = [
  {
    label: "Select One Method",
    value: "",
  },
  {
    label: "EasyPaisy",
    value: "easyPaisy",
  },
  {
    label: "Bank Transfer",
    value: "bankTransfer",
  },
  {
    label: "Cash",
    value: "cash",
  },
];
const initialState = {
  selectEmployee: "",
  employeeName: "",
  employeeContact: "",
  employeeEmail: "",
  payableSalary: "",
  withdrawAccount: "",
  paymentMethod: "",
  paymentDate: "",
  balance: "",
  paidBy: "",
};
export const AddEmployeePayment = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addConfigEmployee, setAddConfigEmployee] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddConfigEmployee({ ...addConfigEmployee, [name]: value });
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
        <div className="w-[42rem] max-h-[39rem] overflow-y-auto mt-6  bg-white mx-auto rounded-xl border  border-indigo-500  ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Payment Withdraw</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <UserSelect
                labelName="Select Employee*"
                name=""
                value={addConfigEmployee.selectEmployee}
                handlerChange={handlerChange}
                optionData={allUsers}
              />

              <InputField
                labelName="Employee Name*"
                name="employeeName"
                type="text"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.employeeName}
              />

              <InputField
                labelName="Employee Contact*"
                name="employeeContact"
                type="number"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.employeeContact}
              />

              <InputField
                labelName="Employee Email*"
                name="employeeEmail"
                type="email"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.employeeEmail}
              />

              <InputField
                labelName="Payable Salary*"
                name="payableSalary"
                type="number"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.payableSalary}
              />

              <InputField
                labelName=" Withdraw Account*"
                name=" withdrawAccount"
                type="number"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.withdrawAccount}
              />

              <UserSelect
                labelName="Payment Method*"
                name="paymentMethod"
                value={addConfigEmployee.paymentMethod}
                handlerChange={handlerChange}
                optionData={data}
              />

              <InputField
                labelName="Payment Date*"
                name="paymentDate"
                type="text"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.paymentDate}
              />

              <InputField
                labelName="Balance*"
                name="balance"
                type="number"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.balance}
              />

              <InputField
                labelName="Paid By*"
                name="paidBy"
                type="number"
                handlerChange={handlerChange}
                inputVal={addConfigEmployee.paidBy}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Payment Withdraw "} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
