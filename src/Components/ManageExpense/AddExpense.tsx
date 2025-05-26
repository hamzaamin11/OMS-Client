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
};

const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

type CategoryT = { id: number; categoryName: string };

const initialState = {
  expenseName: "",
  expenseCategoryId: "",
  amount: "",
  addedBy: "",
  date: currentDate,
};
export const AddExpense = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addExpense, setAddExpense] = useState(initialState);

  const [allExpenseCategory, setAllExpenseCategory] = useState<
    CategoryT[] | null
  >(null);

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
      const res = await axios.get(`${BASE_URL}/admin/getExpenseCategory`, {
        headers: {
          Authorization: token,
        },
      });
      setAllExpenseCategory(res?.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/addExpense`, addExpense, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      setModal();
      toast.success("Expense added successfully");
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
            <Title setModal={() => setModal()}>Add Expense</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <InputField
                labelName="Expense Name*"
                name="expenseName"
                handlerChange={handlerChange}
                inputVal={addExpense.expenseName}
              />
              <OptionField
                labelName="Expense Category"
                name="expenseCategoryId"
                value={addExpense.expenseCategoryId}
                handlerChange={handlerChange}
                optionData={allExpenseCategory?.map((category) => ({
                  id: category.id,
                  label: category.categoryName,
                  value: category.id,
                }))}
                inital="Please Select Category"
              />

              <InputField
                labelName="Amount*"
                name="amount"
                type="number"
                handlerChange={handlerChange}
                inputVal={addExpense.amount}
              />

              <InputField
                labelName="Added By*"
                name="addedBy"
                handlerChange={handlerChange}
                inputVal={addExpense.addedBy}
              />

              <InputField
                labelName="Date*"
                name="date"
                type="date"
                handlerChange={handlerChange}
                inputVal={addExpense.date}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Expense"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
