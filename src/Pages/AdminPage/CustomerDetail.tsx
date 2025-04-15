import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";

import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { useEffect, useState } from "react";

import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";
import { AddCustomer } from "../../Components/CustomerComponents/AddCustomerForm";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../Content/URL";
import { toast } from "react-toastify";
import { CustomerViewModal } from "../../Components/CustomerComponents/CustomerViewModal";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import { UpdateCustomer } from "../../Components/CustomerComponents/UpdateCustomer";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { ViewButton } from "../../Components/CustomButtons/ViewButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
const numbers = [10, 25, 50, 100];
type ModalT = "ADD" | "UPDATE" | "VIEW" | "DELETE";
type AllcustomerT = {
  id: number;
  customerStatus: string;
  customerName: string;
  customerAddress: string;
  customerContact: string;
  companyName: string;
  companyAddress: string;
};
export const CustomerDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState<ModalT | "">("");

  const [allCustomers, setAllCustomers] = useState<AllcustomerT[]>([]);

  const [customerDetail, setCustomerDetail] = useState<AllcustomerT | null>(
    null
  );

  const [catchId, setCatchId] = useState<number | null>(null);

  const { currentUser } = useAppSelector((state) => state?.officeState);

  const token = currentUser?.token;

  const { loader } = useAppSelector((state) => state?.NavigateSate);

  const dispatch = useAppDispatch();

  const handleToggleModal = (active: ModalT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleGetAllCustomers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllCustomers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllCustomers(res.data);
      console.log(res.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError.message);
      toast.error("No customers available yet!");
    }
  };

  const handleDeleteCustomer = async (id: number | null) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteCustomer/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      console.log(res.data);
      handleGetAllCustomers();
      setAllCustomers(allCustomers.filter((prev) => prev.id !== id));
      toast.info("Customer Delete Successfylly");
    } catch (error) {
      console.log(error);
      toast.error("Cant Delete");
    }
  };

  const handleViewButton = (customer: AllcustomerT) => {
    setIsOpenModal("VIEW");
    setCustomerDetail(customer);
  };

  const handleCatchId = (id: number) => {
    setCatchId(id);
    setIsOpenModal("DELETE");
  };
  const handleUpdateCustomer = (customer: AllcustomerT) => {
    setIsOpenModal("UPDATE");
    setCustomerDetail(customer);
  };

  useEffect(() => {
    document.title = "(OMS)Customer Detail ";
    dispatch(navigationStart());
    setTimeout(() => dispatch(navigationSuccess("Customer")), 1000);

    handleGetAllCustomers();
  }, []);

  if (loader) return <Loader />;
  const totalNum = allCustomers.length;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Customer" activeFile="Customers list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex items-center justify-between mx-2 text-gray-800">
          <span>
            Total Numbers of Customer :
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [{allCustomers.length}]
            </span>
          </span>
          <CustomButton
            label="Add Customer"
            handleToggle={() => handleToggleModal("ADD")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select>
                {numbers.map((num) => (
                  <option>{num}</option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          {/* Header Row */}

          <div className="grid grid-cols-7 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-600">
            <span className=" p-2  min-w-[50px]">Sr#</span>
            <span className=" p-2 text-left min-w-[150px]">Customer</span>
            <span className=" p-2 text-left min-w-[150px]">
              Customer Address
            </span>
            <span className=" p-2 text-left min-w-[150px]">Contact#</span>
            <span className=" p-2 text-left min-w-[150px]">Company Name</span>
            <span className=" p-2 text-left min-w-[150px]">
              Company Address
            </span>
            <span className=" p-2 text-center min-w-[100px]">Action</span>
          </div>
          {allCustomers.length === 0 && (
            <div className="text-gray-800 text-lg text-center py-2">
              No records available at the moment!
            </div>
          )}
          {allCustomers.map((customer, index) => (
            <div
              className="grid grid-cols-7 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={customer.id}
            >
              <span className=" border-gray-600 p-2">{index + 1}</span>
              <span className=" p-2 text-left">{customer.customerName}</span>
              <span className=" p-2 text-left">{customer.customerAddress}</span>
              <span className=" p-2 text-left">{customer.customerContact}</span>
              <span className=" p-2 text-left">{customer.companyName}</span>
              <span className=" p-2 text-left">{customer.companyAddress}</span>
              <span className="p-2 flex items-center justify-center gap-1 ">
                <EditButton
                  handleUpdate={() => handleUpdateCustomer(customer)}
                />
                <ViewButton handleView={() => handleViewButton(customer)} />

                <DeleteButton
                  handleDelete={() => handleCatchId(customer?.id)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      {isOpenModal === "ADD" && (
        <AddCustomer
          setIsOpenModal={() => setIsOpenModal("")}
          handleGetAllCustomers={handleGetAllCustomers}
        />
      )}
      {isOpenModal === "VIEW" && (
        <CustomerViewModal
          setIsOpenModal={() => setIsOpenModal("")}
          customerDetail={customerDetail}
        />
      )}
      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => setIsOpenModal("DELETE")}
          onClose={() => setIsOpenModal("")}
          onConfirm={() => handleDeleteCustomer(catchId)}
          message="Are you sure you want to delete this Customer"
        />
      )}

      {isOpenModal === "UPDATE" && (
        <UpdateCustomer
          setIsOpenModal={() => setIsOpenModal("")}
          handleGetAllCustomers={() => handleGetAllCustomers()}
          customerDetail={customerDetail}
        />
      )}

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={totalNum} end={1 + 9} />
        <Pagination />
      </div>
    </div>
  );
};
