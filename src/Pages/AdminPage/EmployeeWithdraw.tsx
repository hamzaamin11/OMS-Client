import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { BsCheck2 } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { TbFileCertificate } from "react-icons/tb";
import { useEffect, useState } from "react";
import { AddWithdraw } from "../../Components/WithdrawModal/AddWithdraw";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { Loader } from "../../Components/LoaderComponent/Loader";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../Content/URL";
import { ViewReasonWithDraw } from "../../Components/WithdrawModal/ViewReasonWithDraw";
import { toast } from "react-toastify";

const numbers = [10, 25, 50, 10];

type WithdrawEmployeeT = {
  id: number;
  employeeId: number;
  name: string;
  withdrawDate: string;
  withdrawReason: string;
};

type TEMPLOYEEWITHDRAW = "ADDWITHDRAW" | "REASONWITHDRAW" | "";

export const EmployeeWithdraw = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const [allWithdrawEmployees, setAllWithdrawEmployees] = useState<
    WithdrawEmployeeT[] | null
  >(null);

  const dispatch = useAppDispatch();

  const token = currentUser?.token;

  const [isOpenModal, setIsOpenModal] = useState<TEMPLOYEEWITHDRAW>("");

  const [viewReason, setViewReason] = useState<WithdrawEmployeeT | null>(null);

  const handleToggleViewModal = (active: TEMPLOYEEWITHDRAW) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };
  const handlegetwithDrawEmployeess = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getWithdrawnEmployees`, {
        headers: {
          Authorization: token,
        },
      });
      setAllWithdrawEmployees(res.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const handleClickReason = (reasonData: WithdrawEmployeeT) => {
    handleToggleViewModal("REASONWITHDRAW");
    setViewReason(reasonData);
  };

  const handleReactiveEmployee = async (id: number) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/reActiveEmployee/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Employee Reactive Successfully");
      console.log(res.data);
      handlegetwithDrawEmployeess()
      
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  };

  useEffect(() => {
    document.title = "(OMS)WITHDRAW EMPLOYEE";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("withdraw Employee"));
    }, 1000);
    handlegetwithDrawEmployeess();
  }, []);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle
        tileName="Employee Withdraw"
        activeFile="Employees Withdraw list"
      />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Employees Withdraw :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Withdraw"
            handleToggle={() => handleToggleViewModal("ADDWITHDRAW")}
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
          <div className="grid grid-cols-4 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2 text-left min-w-[150px] ">Employee Name</span>
            <span className="p-2 text-left min-w-[150px] ">Status</span>
            <span className="p-2 text-left min-w-[150px] ">Action</span>
          </div>
          {allWithdrawEmployees?.map((withdraw, index) => (
            <div
              className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={withdraw.id}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">{withdraw.name}</span>
              <span className="withdraw-button">
                <IoIosClose size={20} className="" title="Withdraw" />
                Withdraw
              </span>
              <div className=" flex gap-2">
                <span
                  onClick={() => handleClickReason(withdraw)}
                  className="reason-button "
                >
                  <TbFileCertificate size={20} title="Reason" />
                  Reason
                </span>
                <span
                  className="active-button"
                  onClick={() => handleReactiveEmployee(withdraw.employeeId)}
                >
                  <BsCheck2 size={20} title="Active" />
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>
      {isOpenModal === "ADDWITHDRAW" && (
        <AddWithdraw setModal={() => setIsOpenModal("")} />
      )}
      {isOpenModal === "REASONWITHDRAW" && (
        <ViewReasonWithDraw
          setIsOpenModal={() => handleToggleViewModal("")}
          viewReason={viewReason}
        />
      )}
    </div>
  );
};
