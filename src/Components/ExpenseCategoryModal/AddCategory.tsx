import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { Title } from "../Title";
import { InputField } from "../InputFields/InputField";

type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  expenseCategory: "",
};

export const AddCategory = ({ setModal }: AddAttendanceProps) => {
  const [addCategory, setAddCategory] = useState(initialState);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddCategory({ ...addCategory, [name]: value.trim() });
  };

  console.log("submitted", addCategory);

  const handlerSubmitted = async () => {};

  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Employee Category</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Expense Category*"
                name="expenseCategory"
                inputVal={addCategory.expenseCategory}
                handlerChange={handlerChange}
              />
            </div>
            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Category"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
