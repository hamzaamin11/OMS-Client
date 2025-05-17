import React, { useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";

import { InputField } from "../InputFields/InputField";

import { toast } from "react-toastify";



type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  description: "",
  qty: "",
  unitPrice: "",
  total: "",
};
export const EditQuotation = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [updateQuotation, setUpdateQuotation] = useState(initialState);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdateQuotation({ ...updateQuotation, [name]: value });
  };

  // const getAllUsers = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     setAllUsers(res?.data?.users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/createTodo`,
        updateQuotation,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(res.data);
      setModal();

      toast.success("Todo submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[45rem] h-[40rem] overflow-y-auto bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <Title setModal={() => setModal()}>Update Quotation</Title>
          <form onSubmit={handlerSubmitted}>
            <div className="mx-2 flex-wrap gap-3  ">
              <InputField
                labelName="Description*"
                name="description"
                handlerChange={handlerChange}
                inputVal={updateQuotation.description}
              />

              <div className="flex items-center gap-6">
                <div className="flex-1 min-w-[150px]">
                  <InputField
                    labelName="QTY*"
                    type="number"
                    name="qty"
                    handlerChange={handlerChange}
                    inputVal={updateQuotation.qty}
                  />
                </div>

                <div className="flex-1 min-w-[150px]">
                  <InputField
                    labelName="Unit Price*"
                    type="number"
                    name="unitPrice"
                    handlerChange={handlerChange}
                    inputVal={updateQuotation.unitPrice}
                  />
                </div>

                <div className="flex-1 min-w-[150px]">
                  <InputField
                    labelName="Total*"
                    type="number"
                    name="total"
                    handlerChange={handlerChange}
                    inputVal={updateQuotation.unitPrice}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end m-2 gap-2 text-xs ">
              <AddButton label={"Add to cart"} />
            </div>
            <hr className="m-2 text-gray-500" />
          </form>

          <div className=" max-h-[28.6rem] overflow-hidden  mx-2">
            <div className="grid grid-cols-4 bg-gray-100 text-gray-900 font-semibold text-xs rounded-t-lg border border-gray-500 ">
              <span className="p-2  ">Description</span>
              <span className="p-2 text-left ">QTY</span>
              <span className="p-2 text-left  ">Unit Price</span>
              <span className="p-2 text-left  ">Actions</span>
            </div>
            <div className="grid grid-cols-4 border border-gray-600 text-gray-800 text-xs  hover:bg-gray-100 transition duration-200">
              <span className=" p-2 text-left ">1</span>
              <span className=" p-2 text-left   ">Hamza amin</span>
              <span className=" p-2 text-left  ">03210000000</span>
              <span className="p-2 flex items-center  gap-1">
                {/* <EditButton handleUpdate={} />

                <DeleteButton /> */}
              </span>
            </div>
          </div>
          <hr className="text-gray-500 m-2" />
          <span className="text-gray-700 font-semibold m-2">
            Customer Detail's:
          </span>
          <div className="space-y-4 px-4">
            {/* First Row */}
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex-1 ">
                {/* <OptionField
                  labelName="Customer*"
                  inital="please select customer"
                /> */}
              </div>
            </div>

            {/* Second Row */}

            <div className="flex flex-row flex-wrap gap-4 ">
              <div className="flex-1 min-w-[200px]">
                <InputField labelName="Date*" />
              </div>
              <div className="min-w-[200px]">
                <InputField labelName="Sub Total*" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <InputField labelName="Tax Rate*" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <InputField labelName="Total Tax*" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <InputField labelName="Shipping Handling*" />
              </div>

              <div className="flex-1 min-w-[200px]">
                <InputField labelName="Total Bill*" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs mb-2">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Updated Quotation"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
