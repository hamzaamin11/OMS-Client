import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { AddAttendance } from "../../Components/AttendanceComponent/AddAttendance";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { UpdateAttendance } from "../../Components/AttendanceComponent/UpdateAttendance";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../Content/URL";
import { toast } from "react-toastify";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";

const numbers = [10, 25, 50, 100];

type ISOPENMODALT = "ADDATTENDANCE" | "EDITATTENDANCE" | "DELETE";

type AttendanceT = {
  id: number;
  attendanceStatus: string; // e.g., "Present"
  clockIn: string; // e.g., "14:38:00"
  clockOut: string; // e.g., "14:49:12"
  date: string; // ISO date format string e.g., "2025-03-07T00:00:00.000Z"
  day: string; // e.g., "Friday"
  leaveApprovalStatus: string | null; // null if no leave
  leaveReason: string | null; // null if no leave reason
  name: string; // e.g., "Alice Johnson"
  role: string; // e.g., "admin"
  status: string; // e.g., "Y"
  userId: number; // e.g., 1 (number type)
  workingHours: string; // e.g., "11 Minutes"
};

export const UserAttendance = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<ISOPENMODALT | "">("");

  const token = currentUser?.token;

  const handleToggleViewModal = (active: ISOPENMODALT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const [allAttendance, setAllAttendance] = useState<AttendanceT[] | null>(
    null
  );
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

  const [updatedAttendance, setUpdatedAttendance] =
    useState<AttendanceT | null>(null);

  console.log(allAttendance, "<=");
  const handleGetALLattendance = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllAttendances`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("", res.data);
      setAllAttendance(res.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  const userAttendanceRecord = (id: number) => {
    setIsOpenModal("DELETE");
    setRecordToDelete(id);
  };
  const userAttendanceUpdate = (attendance: AttendanceT) => {
    setIsOpenModal("EDITATTENDANCE");
    setUpdatedAttendance(attendance);
  };
  const handleDeleteAttendance = async (id: number) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteAttendance/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      handleGetALLattendance();
      toast.success("Attendance record deleted successfully.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  useEffect(() => {
    document.title = "(OMS) USER ATTENDANCE";
    handleGetALLattendance();
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Users"));
    }, 1000);
  }, [dispatch]);
  console.log("all Attendance", allAttendance);
  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Attendance" activeFile="Users Attendance list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [{allAttendance?.length}]
            </span>
          </span>
          <CustomButton
            label="Add Attendance"
            handleToggle={() => handleToggleViewModal("ADDATTENDANCE")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select>
                {numbers.map((num, index) => (
                  <option key={index}>{num}</option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-7 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Date</span>
            <span className="p-2 text-left min-w-[150px] ">Users</span>
            <span className="p-2 text-left min-w-[150px] ">Clock In</span>
            <span className="p-2 text-left min-w-[150px] ">Clock Out</span>
            <span className="p-2 text-left min-w-[150px] ">Working Hours</span>
            <span className="p-2 text-left min-w-[150px] ">Day</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allAttendance?.length === 0 ? (
            <div className="text-center text-gray-800 p-4 ">
              No attendance records available.
            </div>
          ) : (
            allAttendance?.map((attendance, index) => (
              <div
                key={`${attendance?.userId}${index}`}
                className="grid grid-cols-7 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              >
                <span className=" p-2 text-left ">
                  {attendance?.date?.slice(0, 10)}
                </span>
                <span className=" p-2 text-left   ">{attendance?.name}</span>
                <span className=" p-2 text-left  ">
                  {attendance?.clockIn === "00:00"
                    ? null
                    : attendance?.clockIn ?? "--"}
                </span>
                <span className=" p-2 text-left ">
                  {attendance?.clockOut ?? "NUll"}
                </span>
                <span className=" p-2 text-left ">
                  {attendance?.workingHours ?? "NUll"}
                </span>
                <span className=" p-2 text-left ">
                  {attendance?.day ?? "--"}
                </span>
                <span className="p-2 flex items-center  gap-1">
                  <EditButton
                    handleUpdate={() => userAttendanceUpdate(attendance)}
                  />
                  <DeleteButton
                    handleDelete={() => userAttendanceRecord(attendance?.id)}
                  />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      {isOpenModal === "ADDATTENDANCE" && (
        <div className={`${isOpenModal === "ADDATTENDANCE" ? "" : ""}`}>
          <AddAttendance
            setModal={() => setIsOpenModal("")}
            handleGetALLattendance={handleGetALLattendance}
          />
        </div>
      )}

      {isOpenModal === "EDITATTENDANCE" && (
        <UpdateAttendance
          setModal={() => setIsOpenModal("")}
          updatedAttendance={updatedAttendance}
        />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => setIsOpenModal("DELETE")}
          onClose={() => setIsOpenModal("")}
          message="Are you sure you want to delete this Attendance"
          onConfirm={() =>
            recordToDelete !== null && handleDeleteAttendance(recordToDelete)
          }
        />
      )}
      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={allAttendance?.length} end={1 + 9} />
        <Pagination />
      </div>
    </div>
  );
};
