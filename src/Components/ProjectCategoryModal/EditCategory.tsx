import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";

import { Title } from "../Title";

type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  categoryName: "",
};
export const EditCategory = ({ setModal }: AddAttendanceProps) => {
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
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Category</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Category Name*"
                placeHolder="Enter the Project Category"
                type="text"
                name="categoryName"
                inputVal={addCategory.categoryName}
                handlerChange={handlerChange}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Category"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
