import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";


import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { InputField } from "../InputFields/InputField";
import { OptionField } from "../InputFields/OptionField";
import { toast } from "react-toastify";

type AddAttendanceProps = {
  setModal: () => void;
  handleGetPayments: () => void;
};

type CustomerT = {
  id: number;
  customerName: string;
};

const initialState = {
  paymentMethod: "cash",
  customerId: "",
  description: "",
  amount: "",
  date: "",
};
export const AddPayment = ({
  setModal,
  handleGetPayments,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addProgress, setAddProgress] = useState(initialState);

  console.log(addProgress);

  const [allCustomers, setAllCustomers] = useState<CustomerT[] | null>(null);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddProgress({ ...addProgress, [name]: value });
  };

  const getAllCustomers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllCustomers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllCustomers(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addPayment`,
        addProgress,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      handleGetPayments();
      toast.success("Payment added successfully");
      setModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Payment</Title>

            <div className="mx-3  pt-3 flex lg:flex-row flex-col items-center text-gray-800  ">
              <h1 className="text-lg font-semibold underline ">
                Account Type*
              </h1>
              <div className=" ml-5 lg:space-x-5 space-x-5">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio border-gray-500 text-indigo-500"
                  value={"cash"}
                  checked={addProgress?.paymentMethod === "cash"}
                  onChange={handlerChange}
                />
                <label>Cash</label>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio border-gray-500 text-indigo-500"
                  value={"bankTransfer"}
                  checked={addProgress?.paymentMethod === "bankTransfer"}
                  onChange={handlerChange}
                />
                <label>Bank Transfer</label>
              </div>
            </div>
            <div className="mx-2 flex-wrap gap-3  ">
              <OptionField
                labelName="Select Customer"
                name="customerId"
                handlerChange={handlerChange}
                value={addProgress.customerId}
                optionData={allCustomers?.map((customer) => ({
                  id: customer.id,
                  label: customer.customerName,
                  value: customer.id,
                }))}
                inital="Please Select Customer"
              />

              <InputField
                labelName="Description*"
                name="description"
                handlerChange={handlerChange}
                inputVal={addProgress.description}
              />

              <InputField
                labelName="Amount*"
                name="amount"
                handlerChange={handlerChange}
                inputVal={addProgress.amount}
              />

              <InputField
                labelName="Date*"
                name="date"
                type="date"
                handlerChange={handlerChange}
                inputVal={addProgress.date}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Payment"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
