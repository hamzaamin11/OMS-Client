import { ChangeEvent, useEffect, useState } from "react";

import { InputField } from "../InputFields/InputField";

import { Title } from "../Title";

import { OptionField } from "../InputFields/OptionField";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";

import { toast } from "react-toastify";

export interface IAddUserValues {
  userId: number | string;
  name: string;
  email: string;
  contact: string;
  cnic: string;
  address: string;
  date: string;
  role: string;
  image: string;
  password: string;
}

export interface IAddUserProps extends React.ComponentPropsWithoutRef<"div"> {
  handlerGetUsers: () => void;
  setModal: () => void;
  initialValues?: IAddUserValues;
  viewType: "ADD" | "UPDATE" | "View";
  userId?: number;
  onSuccesAction: () => void;
}

const currentDate =
  new Date(new Date().toISOString()).toLocaleDateString("sv-SE") ?? "";

const initialState: IAddUserValues = {
  name: "",
  email: "",
  contact: "",
  cnic: "",
  address: "",
  date: currentDate,
  role: "",
  image: "",
  userId: "",
  password: "",
};

const optionData = [
  {
    id: 1,
    label: "Admin",
    value: "admin",
  },
  {
    id: 2,
    label: "Employee",
    value: "user",
  },
];

export const AddUser = ({
  handlerGetUsers,
  setModal,
  initialValues,
  viewType,
  userId,
  onSuccesAction,
}: IAddUserProps) => {
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAppSelector((state) => state?.officeState);

  const token = currentUser?.token;

  const [userData, setUserData] = useState(initialState);

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  console.log("image", image);

  console.log({ userData, initialState }, "initialValues");

  useEffect(() => {
    {
      if (initialValues) {
        console.log("iamhittttttt", initialValues);

        setUserData(initialValues);
      }
    }
  }, [initialValues]);

  // console.log("iddddddddddd",id)

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on form submission

    if (viewType === "ADD") handleAddUser();
    else handleUpdateUser(userId);
  };

  const handleUpdateUser = async (userId: string | number | undefined) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateUser/${userId}`,
        { userData },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      onSuccesAction();
      console.log(res.data);
      handlerGetUsers();
      toast.success("User Updated Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    const data = new FormData();

    data.append("name", userData.name);
    data.append("email", userData.email);
    data.append("contact", userData.contact);
    data.append("cnic", userData.cnic);
    data.append("address", userData.address);
    data.append("date", userData.date);
    data.append("role", userData.role);
    data.append("password", userData.password);
    if (image) {
      data.append("image", image);
    }

    console.log(data, "data");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/admin/addUser`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log("=>>>>>", res);
      setLoading(false);
      handlerGetUsers();
      setUserData(initialState);
      toast.success("Add User", { position: "bottom-right" });

      onSuccesAction();
    } catch (error) {
      console.log(error);
      toast.info("All input fields are required");
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg  bg-opacity-90 backdrop-blur-xs  flex items-center justify-center z-10">
      <div className="w-[42rem] max-h-[35rem] overflow-y-scroll  bg-white mx-auto rounded-xl border border-indigo-500 ">
        <form onSubmit={handlerSubmitted}>
          <Title setModal={setModal}>{viewType} USER</Title>
          <div className="mx-2  flex-wrap gap-3  ">
            <InputField
              labelName="Name*"
              placeHolder="Enter the Name"
              type="text"
              name="name"
              handlerChange={handlerChange}
              inputVal={userData.name}
            />
            <InputField
              labelName="Email*"
              placeHolder="abc123@gmail.com"
              type="email"
              name="email"
              handlerChange={handlerChange}
              inputVal={userData.email}
            />
            <InputField
              labelName="Phone Number*"
              placeHolder="Enter the Contact Number"
              type="number"
              name="contact"
              handlerChange={handlerChange}
              inputVal={userData.contact}
            />
            <InputField
              labelName="CNIC*"
              placeHolder="Enter the CNIC"
              type="number"
              name="cnic"
              handlerChange={handlerChange}
              inputVal={userData?.cnic}
            />
            <InputField
              labelName="Address*"
              placeHolder="Enter the Address"
              type="text"
              name="address"
              handlerChange={handlerChange}
              inputVal={userData.address}
            />
            <InputField
              labelName="Joining Date*"
              placeHolder="Enter the Date"
              type="date"
              name="date"
              inputVal={userData.date}
              handlerChange={handlerChange}
            />
            <InputField
              labelName="Password*"
              placeHolder="Enter the Password"
              type="password"
              name="password"
              handlerChange={handlerChange}
              // inputVal={userData.password}
            />
            <InputField
              labelName="Confirm Password*"
              placeHolder="Enter the Confirm Password"
              type="password"
              name="confirmPassword"
              handlerChange={handlerChange}
              // inputVal={userData.confirmPassword}
            />

            <div className=" flex flex-col  mt-3">
              <label className=" text-gray-900 text-xs font-semibold">
                Select Image*
              </label>
              <input
                type="file"
                className=" p-1 rounded bg-white text-gray-800  border border-gray-300 focus:indigo-400"
                onChange={handleFileChange}
                name="image"
                accept="image/*"
              />
            </div>

            <OptionField
              value={userData?.role}
              labelName="Role*"
              handlerChange={handlerChange}
              name="role"
              optionData={optionData}
              inital="Plese Select User"
            />
          </div>
          <div className="flex items-center  justify-center m-2 gap-2 text-xs ">
            <CancelBtn setModal={setModal} />
            {loading ? (
              <AddButton label={"Loading..."} loading={loading} />
            ) : (
              <AddButton
                loading={loading}
                label={viewType === "ADD" ? "Add User" : "Update User"}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
