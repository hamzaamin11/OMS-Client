import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { InputField } from "../InputFields/InputField";
import { Title } from "../Title";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";

type AddAttendanceProps = {
  setModal: () => void;
};

const initialState = {
  oldPassword: "",
  newPassword: "",
};

export const ProfileChangePassword = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);
  const id = currentUser?.userId;
  const token = currentUser?.token;

  const [changePassword, setChangePassword] = useState(initialState);

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value.trim() });
  };

  console.log("submitted", changePassword);

  const handlerSubmitted = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => {
    e.preventDefault();
    try {
      if (id === null) {
        console.error("ID is null");
        return;
      }
      const res = await axios.post(
        `${BASE_URL}/user/forgetPassword/${id}`,
        {
          changePassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={(e) => handlerSubmitted(e, id)}>
            <Title setModal={() => setModal()}>Change Password</Title>
            <div className="mx-2   flex-wrap gap-3  ">
              <InputField
                labelName="Old Password*"
                placeHolder="Enter the old password"
                type="password"
                name="oldPassword"
                inputVal={changePassword.oldPassword}
                handlerChange={handlerChange}
              />

              <InputField
                labelName="New Password*"
                placeHolder="Enter the new password"
                type="password"
                name="newPassword"
                inputVal={changePassword.newPassword}
                handlerChange={handlerChange}
              />

              {/* <InputField
                labelName="Comfirm Password*"
                placeHolder="Enter the Comfirm password"
                type="password"
                name="confirmPassword"
                // inputVal={changePassword.confirmPassword}
                handlerChange={handlerChange}
              /> */}
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save password"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
