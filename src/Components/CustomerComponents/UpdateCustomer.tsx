import { useState } from "react";
import { InputField } from "../InputFields/InputField";
import { Title } from "../Title";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";
import { toast } from "react-toastify";
// const currentDate = new Date().toISOString().split("T")[0];
type CustomerT = {
  id: number;
  customerStatus: string;
  customerName: string;
  customerAddress: string;
  customerContact: string;
  companyName: string;
  companyAddress: string;
};
type AddCustomerProps = {
  setIsOpenModal: () => void;
  handleGetAllCustomers: () => void;
  customerDetail: CustomerT | null;
};

export const UpdateCustomer = ({
  setIsOpenModal,
  handleGetAllCustomers,
  customerDetail,
}: AddCustomerProps) => {
  const [customerData, setCustomerData] = useState(customerDetail);
  const { currentUser } = useAppSelector((state) => state?.officeState);
  const token = currentUser?.token;

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value } as CustomerT);
  };

  const handlerSubmitted = async (
    e: React.FormEvent<HTMLFormElement>,
    customerId: number | null
  ) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateCustomer/${customerId}`,
        customerData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.message);
      setIsOpenModal();
      toast.success(res.data.message);
      handleGetAllCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
      <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
        <form onSubmit={(e) => handlerSubmitted(e, customerData?.id ?? null)}>
          <Title setModal={() => setIsOpenModal()}>Update Customer</Title>
          <div className="mx-2  flex-wrap gap-3  ">
            <InputField
              labelName=" Customer Name*"
              placeHolder="Enter the Customer Name"
              type="text"
              name="customerName"
              handlerChange={handlerChange}
              inputVal={customerData?.customerName}
            />
            <InputField
              labelName="Customer Address*"
              placeHolder="Enter the Customer Address"
              type="text"
              name="customerAddress"
              handlerChange={handlerChange}
              inputVal={customerData?.customerAddress}
            />

            <InputField
              labelName="Customer Contact*"
              placeHolder="Enter the Contact Number"
              type="number"
              name="customerContact"
              handlerChange={handlerChange}
              inputVal={customerData?.customerContact}
            />
            <InputField
              labelName="Company Name*"
              placeHolder="Enter the Company Name"
              type="text"
              name="companyName"
              handlerChange={handlerChange}
              inputVal={customerData?.companyName}
            />
          </div>
          <div className="px-2">
            <InputField
              labelName="Company Address*"
              placeHolder="Enter the Company Address"
              type="text"
              name="companyAddress"
              inputVal={customerData?.companyAddress}
              handlerChange={handlerChange}
            />
          </div>
          <div className="flex items-center justify-center m-2 gap-2 text-xs ">
            <CancelBtn setModal={() => setIsOpenModal()} />
            <AddButton label={"Update Customer"} />
          </div>
        </form>
      </div>
    </div>
  );
};
