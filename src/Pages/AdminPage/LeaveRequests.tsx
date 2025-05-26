import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";
import { AddLeave } from "../../Components/LeaveModals/AddLeave";
import { UpdateLeave } from "../../Components/LeaveModals/UpdateLeave";
import { ViewLeave } from "../../Components/LeaveModals/ViewLeave";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";

const numbers = [10, 25, 50, 100];

type ADDLEAVET = {
  id: number;
  attendanceStatus: string;
  date: string;
  leaveApprovalStatus: string;
  name: string;
};

type ISOPENMODALT = "ADDLEAVE" | "VIEW" | "UPDATE";
export const LeaveRequests = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const token = currentUser?.token;

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<ISOPENMODALT | "">("");

  const [EditLeave, setEditLeave] = useState<ADDLEAVET | null>(null);

  const [allLeaves, setAllLeaves] = useState<ADDLEAVET[] | null>(null);

  const [selectedValue, setSelectedValue] = useState(10);

  const [pageNo, setPageNo] = useState(1);

  const handleIncrementPageButton = () => {
    setPageNo((prev) => prev + 1);
  };

  const handleDecrementPageButton = () => {
    setPageNo((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleToggleViewModal = (active: ISOPENMODALT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleChangeShowData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(e.target.value));
  };

  const handleClickEditButton = (data: ADDLEAVET) => {
    handleToggleViewModal("UPDATE");
    setEditLeave(data);
  };

  const handleGetAllLeaves = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsersLeaves`, {
        headers: {
          Authorization: token,
        },
      });
      setAllLeaves(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "(OMS) USER LEAVE";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("leaveList"));
    }, 1000);
  }, [dispatch]);
  useEffect(() => {
    handleGetAllLeaves();
  }, []);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Leave" activeFile="Users Leaves list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex items-center justify-between mx-2 text-gray-800">
          <span>
            Total Number of Users on Leaves :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add User Leave"
            handleToggle={() => handleToggleViewModal("ADDLEAVE")}
          />
        </div>
        <div className="flex items-center justify-between mx-2 text-gray-800">
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
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-5 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2 text-left min-w-[150px] ">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Employee Name</span>
            <span className="p-2 text-left min-w-[150px]  ">Subject Leave</span>
            <span className="p-2 text-left min-w-[150px]  ">Status</span>
            <span className="p-2 text-left min-w-[150px]  ">Action</span>
          </div>

          {allLeaves?.map((leave, index) => (
            <div
              className="grid grid-cols-5 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={leave.id}
            >
              <span className="p-2 text-left    ">{index + 1}</span>
              <span className="p-2 text-left    ">{leave.name}</span>
              <span className="p-2 text-left   ">{leave.attendanceStatus}</span>
              <span className="p-2 text-left  ">pending</span>

              <span className="p-2 text-left flex items-center gap-1  ">
                <EditButton handleUpdate={() => handleClickEditButton(leave)} />
                <ViewButton handleView={() => handleToggleViewModal("VIEW")} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination
          handleIncrementPageButton={handleIncrementPageButton}
          handleDecrementPageButton={handleDecrementPageButton}
          pageNo={pageNo}
        />
      </div>
      {isOpenModal === "ADDLEAVE" && (
        <AddLeave setModal={() => setIsOpenModal("")} />
      )}
      {isOpenModal === "UPDATE" && (
        <UpdateLeave
          setModal={() => setIsOpenModal("")}
          EditLeave={EditLeave}
        />
      )}
      {isOpenModal === "VIEW" && (
        <ViewLeave setIsOpenModal={() => setIsOpenModal("")} />
      )}
    </div>
  );
};
