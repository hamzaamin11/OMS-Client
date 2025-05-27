import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddPayment } from "../../Components/PayementModals/AddPayment";
import { EditPayment } from "../../Components/PayementModals/EditPayment";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { toast } from "react-toastify";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

const numbers = [10, 25, 50, 100];

type PATMENTT = "ADD" | "EDIT" | "DELETE" | "";

type PAYMENTMETHODT = {
  id: number;
  customerName: string;
  amount: string;
  paymentType: string;
  description: string;
  date: string;
};

export const Payments = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<PATMENTT>("");

  const [allPayment, setAllPayment] = useState<PAYMENTMETHODT[] | null>(null);

  const [seletePayment, setSeletePayment] = useState<PAYMENTMETHODT | null>(
    null
  );

  const [catchId, setCatchId] = useState<number>();

  const token = currentUser?.token;

  const handleToggleViewModal = (active: PATMENTT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleGetPayments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getPayments`, {
        headers: {
          Authorization: token,
        },
      });

      setAllPayment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditButton = (data: PAYMENTMETHODT) => {
    handleToggleViewModal("EDIT");
    setSeletePayment(data);
  };

  const handleClickDeleteButton = (id: number) => {
    handleToggleViewModal("DELETE");
    setCatchId(id);
  };

  const handleDeletePayment = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deletePayment/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      handleGetPayments();
      toast.success("Payment has been deleted succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPayments();
    document.title = "(OMS) PAYMENT";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("PAYMENT"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Payment" activeFile="All Payment list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Payment"
            handleToggle={() => handleToggleViewModal("ADD")}
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
          <div className="grid grid-cols-6 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr</span>
            <span className="p-2 text-left min-w-[150px] ">Customers</span>
            <span className="p-2 text-left min-w-[150px] ">Amount</span>
            <span className="p-2 text-left min-w-[150px] ">Payment Type</span>
            <span className="p-2 text-left min-w-[150px] ">Date</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allPayment?.length === 0 ? (
            <div>No data found yet</div>
          ) : (
            allPayment?.map((payment, index) => (
              <div
                className="grid grid-cols-6 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
                key={payment.id}
              >
                <span className=" p-2 text-left ">{index + 1}</span>
                <span className=" p-2 text-left   ">
                  {payment.customerName}
                </span>
                <span className=" p-2 text-left  ">{payment.amount}</span>
                <span className=" p-2 text-left ">{payment.paymentType}</span>
                <span className=" p-2 text-left ">
                  {payment.date.slice(0, 10)}
                </span>
                <span className="p-2 flex items-center  gap-2">
                  <EditButton
                    handleUpdate={() => handleClickEditButton(payment)}
                  />

                  <DeleteButton
                    handleDelete={() => handleClickDeleteButton(payment.id)}
                  />
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "ADD" && (
        <AddPayment
          setModal={() => handleToggleViewModal("")}
          handleGetPayments={handleGetPayments}
        />
      )}

      {isOpenModal === "EDIT" && (
        <EditPayment
          setModal={() => handleToggleViewModal("")}
          seletePayment={seletePayment}
        />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleDeletePayment()}
          message="Are you sure to want delete this payment"
        />
      )}
    </div>
  );
};
