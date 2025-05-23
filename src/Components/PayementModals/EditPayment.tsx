import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import { UserSelect } from "../InputFields/UserSelect";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { InputField } from "../InputFields/InputField";

type PAYMENTMETHODT = {
  id: number;
  customerName: string;
  amount: string;
  paymentType: string;
  description: string;
  date: string;
};

type AddAttendanceProps = {
  setModal: () => void;
  seletePayment: PAYMENTMETHODT | null;
};

export const EditPayment = ({
  setModal,
  seletePayment,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [updatePayment, setUpdateProgress] = useState(seletePayment);

  console.log(updatePayment);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdateProgress({ ...updatePayment, [name]: value } as PAYMENTMETHODT);
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
            <Title setModal={() => setModal()}>Update Payment</Title>

            <div className="mx-3  pt-3 flex lg:flex-row flex-col items-center text-gray-800  ">
              <h1 className="text-lg font-semibold underline ">
                Account Type*
              </h1>
              <div className=" ml-5 lg:space-x-5 space-x-5">
                <input
                  type="radio"
                  name="accountType"
                  className="radio border-gray-500 text-indigo-500"
                  value={"cash"}
                  checked={updatePayment?.paymentType === "cash"}
                  onChange={handlerChange}
                />
                <label>Cash</label>
                <input
                  type="radio"
                  name="accountType"
                  className="radio border-gray-500 text-indigo-500"
                  value={"bankTransfer"}
                  checked={updatePayment?.paymentType === "bankTransfer"}
                  onChange={handlerChange}
                />
                <label>Bank Transfer</label>
              </div>
            </div>
            <div className="mx-2 flex-wrap gap-3  ">
              <UserSelect
                labelName="Customers*"
                name="customerName"
                value={updatePayment?.customerName ?? ""}
                handlerChange={handlerChange}
                optionData={allUsers}
              />

              <InputField
                labelName="Description*"
                name="description"
                handlerChange={handlerChange}
                inputVal={updatePayment?.description ?? ""}
              />

              <InputField
                labelName="Amount*"
                name="amount"
                handlerChange={handlerChange}
                inputVal={updatePayment?.amount ?? ""}
              />

              <InputField
                labelName="Date*"
                name="date"
                handlerChange={handlerChange}
                inputVal={updatePayment?.date}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Payment"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
