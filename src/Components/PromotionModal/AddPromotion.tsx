import { useEffect, useState } from "react";

import { InputField } from "../InputFields/InputField";

import { Title } from "../Title";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import axios, { AxiosError } from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";

import { toast } from "react-toastify";
import { UserSelect } from "../InputFields/UserSelect";
import { TextareaField } from "../InputFields/TextareaField";

const currentDate = new Date().toISOString().split("T")[0];

type AddPromotionProps = {
  setModal: () => void;
};

const initialState = {
  id: "",
  currentDesignation: "",
  requestDesignation: "",
  note: "",
  date: currentDate,
};

export const AddPromotion = ({ setModal }: AddPromotionProps) => {
  const [allUsers, setAllUsers] = useState([]);

  const [addPromotion, setAddPromotion] = useState(initialState);

  console.log("=>", addPromotion);

  const { currentUser } = useAppSelector((state) => state?.officeState);

  const token = currentUser?.token;

  // const [showTime, setShowTime] = useState("");
  // setInterval(() => {
  //   const getTime = new Date().toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: true,
  //   });
  //   setShowTime(getTime);
  // }, 1000);
  const handlerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddPromotion({ ...addPromotion, [name]: value });
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
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addCustomer`,
        addPromotion,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.message);
      setModal();
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
      <div className="w-[42rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
        <form onSubmit={handlerSubmitted}>
          <Title setModal={() => setModal()}>Add Employee Promotion</Title>
          <div className="mx-2  flex-wrap gap-3  ">
            <UserSelect
              labelName="Select Employee*"
              name="id"
              handlerChange={handlerChange}
              optionData={allUsers}
              value={addPromotion.id}
            />
            <InputField
              labelName="Current Designation*"
              placeHolder="Enter the Current Designation"
              type="text"
              name="currentDesignation"
              handlerChange={handlerChange}
              inputVal={addPromotion?.currentDesignation}
            />
            <InputField
              labelName="Requested Designation*"
              placeHolder="Enter the designation request"
              type="text"
              name="requestDesignation"
              handlerChange={handlerChange}
              inputVal={addPromotion.requestDesignation}
            />
            <TextareaField
              labelName="Note*"
              placeHolder="Write here your promotion description"
              handlerChange={handlerChange}
              name="note"
              inputVal={addPromotion.note}
            />

            <InputField
              labelName="Date*"
              placeHolder="Enter the Employee Position"
              type="date"
              name="date"
              handlerChange={handlerChange}
              inputVal={addPromotion.date}
            />
          </div>

          <div className="flex items-center justify-center m-2 gap-2 text-xs ">
            <CancelBtn setModal={() => setModal()} />
            <AddButton label={"Add Promotion"} />
          </div>
        </form>
      </div>
    </div>
  );
};
