type UserType = {
  id: number;
  name: string;
  email: string;
  contact: string;
  cnic: string;
  address: string;
  date: string;
  password: string;
  confirmPassword: string;
  role: string;
  image: string;
  loginStatus: string;
};

import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";

import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";

import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";

import { useEffect, useState } from "react";

import { AddUser } from "../../Components/UserComponent/AddUser";

import axios, { AxiosError } from "axios";

import { BASE_URL } from "../../Content/URL";

import { RiLockPasswordFill } from "react-icons/ri";

import { useAppDispatch, useAppSelector } from "../../redux/Hooks";

import { toast } from "react-toastify";

import { ComfirmPasswordModal } from "../../Components/ComfirmPasswordModal";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";

import { Loader } from "../../Components/LoaderComponent/Loader";

import { ViewUserDetailModal } from "../../Components/ViewUserDetailModal";

import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";

import { Pagination } from "../../Components/Pagination/Pagination";

import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";

import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";

import { ViewButton } from "../../Components/CustomButtons/ViewButton";

import { EditButton } from "../../Components/CustomButtons/EditButton";

const numbers = [10, 25, 50, 100];

export const UsersDetails = () => {
  const [catchId, setCatchId] = useState<number | null>(null);

  const { currentUser } = useAppSelector((state) => state?.officeState);

  const token = currentUser?.token;

  const { loader } = useAppSelector((state) => state?.NavigateSate);

  const dispatch = useAppDispatch();

  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  const [selectedValue, setSelectedValue] = useState(10);

  const handleChangeShowData = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(Number(event.target.value));
  };
  const [viewUserDetail, setViewUserDetail] = useState<UserType>(
    {} as UserType
  );

  const [modalTypeTooPen, setModalTypeTooPen] = useState<
    "ADD" | "UPDATE" | "VIEW" | "CONFIRM PASSWORD" | "DELETE" | ""
  >("");

  const [editUser, setEditUser] = useState<UserType | null>(null);

  const handlerGetUsers = async () => {
    dispatch(navigationStart());

    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllUsers(res?.data?.users);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  const handleDeleteUser = async (id: number | null) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteUser/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(res);
      setAllUsers((prev) => prev.filter((user) => user.id !== id));
      handlerGetUsers();
      toast.info("User deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  const handleUpdateSingleUser = (user: UserType) => {
    setModalTypeTooPen("UPDATE");
    setEditUser(user);
  };

  const handleViewUserDetail = (user: UserType) => {
    setModalTypeTooPen("VIEW");
    setViewUserDetail(user);
  };

  const handleCatchId = (id: number) => {
    setModalTypeTooPen("CONFIRM PASSWORD");
    setCatchId(id);
  };

  const handleDeleteModal = (id: number) => {
    setCatchId(id);
    setModalTypeTooPen("DELETE");
  };

  useEffect(() => {
    handlerGetUsers();
    document.title = "(OMS)ALL USERS";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Users"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  const totalNum = allUsers.filter((user) => user.loginStatus === "Y").length;
  return (
    <div className="w-full  mx-2">
      <TableTitle tileName="User" activeFile="User list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total Number of Users :
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [{allUsers.filter((user) => user.loginStatus === "Y").length}]
            </span>
          </span>
          <CustomButton
            handleToggle={() => setModalTypeTooPen("ADD")}
            label="Add User"
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select value={selectedValue} onChange={handleChangeShowData}>
                {numbers.map((num, index) => (
                  <option key={index} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[29.5rem] overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-8 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 text-sm">
            <span className=" p-2  min-w-[50px]">Sr#</span>
            <span className=" p-2 text-left min-w-[150px]">Users</span>
            <span className=" p-2 text-left min-w-[150px]">Email</span>
            <span className=" p-2 text-left min-w-[150px]">Contact No</span>
            <span className=" p-2 text-left min-w-[150px]">Position</span>
            <span className=" p-2 text-left min-w-[150px]">Joining Date</span>
            <span className=" p-2 text-center min-w-[100px]">Action</span>
          </div>

          {/* Data Rows */}

          {(allUsers.filter((user) => user.loginStatus === "Y")?.length ??
            0) === 0 ? (
            <div className="text-gray-800 text-lg text-center py-2 ">
              No records available at the moment!
            </div>
          ) : (
            allUsers
              .filter((user) => user.loginStatus === "Y")
              .slice(0, selectedValue)
              .map((user, index) => (
                <div
                  className="grid grid-cols-8 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200 text-sm"
                  key={user.id}
                >
                  <span className=" border-gray-600 p-2  ">{index + 1}</span>
                  <span className=" p-2 text-left">{user.name}</span>
                  <span className=" p-2 text-left">
                    {user.email.slice(0, 15)}...
                  </span>
                  <span className=" p-2 text-left">{user.contact}</span>
                  <span className=" p-2 text-left">{user.role}</span>
                  <span className=" p-2 text-left">
                    {user.date.slice(0, 10)}
                  </span>
                  <span className="p-2 flex items-center justify-center gap-1 min-w-full">
                    <EditButton
                      handleUpdate={() => handleUpdateSingleUser(user)}
                    />

                    <ViewButton handleView={() => handleViewUserDetail(user)} />

                    <DeleteButton
                      handleDelete={() => handleDeleteModal(user.id)}
                    />

                    <div
                      onClick={() => handleCatchId(user.id)}
                      className="flex items-center gap-0.5 bg-gray-500 rounded-2xl py-0.5 px-2 text-white hover:cursor-pointer"
                    >
                      <span className="text-[10px]">Password</span>
                      <RiLockPasswordFill
                        size={20}
                        className=" rounded text-white cursor-pointer hover:scale-105 p-0.5"
                        title="Update Password"
                      />
                    </div>
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
      {(modalTypeTooPen === "UPDATE" || modalTypeTooPen === "ADD") && (
        <AddUser
          viewType={modalTypeTooPen}
          handlerGetUsers={handlerGetUsers}
          userId={editUser?.id}
          setModal={() => {
            setEditUser(null);

            setModalTypeTooPen("");
          }}
          onSuccesAction={() => {
            setEditUser(null);

            setModalTypeTooPen("");
          }}
          {...(editUser
            ? {
                initialValues: {
                  userId: editUser?.id ?? "",
                  name: editUser?.name ?? "",
                  address: editUser?.address ?? "",
                  cnic: editUser?.cnic ?? "",

                  contact: editUser?.contact ?? "",
                  date:
                    new Date(editUser?.date ?? "").toLocaleDateString(
                      "sv-SE"
                    ) ?? "",
                  email: editUser?.email ?? "",
                  image: editUser?.image ?? "",
                  password: editUser?.confirmPassword ?? "",

                  role: editUser?.role ?? "",
                },
              }
            : {})}
        />
      )}

      {modalTypeTooPen === "VIEW" && (
        <ViewUserDetailModal
          setModal={() => setModalTypeTooPen("")}
          viewUserDetail={viewUserDetail}
        />
      )}
      {modalTypeTooPen === "CONFIRM PASSWORD" && (
        <div className=" max-w-[40rem] mx-auto">
          <ComfirmPasswordModal
            setModal={() => setModalTypeTooPen("")}
            catchId={catchId}
          />
        </div>
      )}
      {modalTypeTooPen === "DELETE" && (
        <ConfirmationModal
          isOpen={() => setModalTypeTooPen("UPDATE")}
          onClose={() => setModalTypeTooPen("")}
          onConfirm={() => handleDeleteUser(catchId)}
        />
      )}
      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={totalNum} end={1 + 9} />

        <Pagination />
      </div>
    </div>
  );
};
