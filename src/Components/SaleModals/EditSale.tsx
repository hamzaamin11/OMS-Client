import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import { UserSelect } from "../InputFields/UserSelect";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";

type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  customers: "",
  projects: "",
};
export const EditSale = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addProgress, setAddProgress] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddProgress({ ...addProgress, [name]: value });
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
            <Title setModal={() => setModal()}>Update Sale</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <UserSelect
                labelName="Customers*"
                name="customers"
                value={addProgress.customers}
                handlerChange={handlerChange}
                optionData={allUsers}
              />

              <UserSelect
                labelName="Projects*"
                name="projects"
                value={addProgress.projects}
                handlerChange={handlerChange}
                optionData={allUsers}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Sale"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
