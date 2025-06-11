import { useState } from "react";
import { InputField } from "../InputFields/InputField";
import { Title } from "../Title";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";
import { toast } from "react-toastify";
import { TextareaField } from "../InputFields/TextareaField";

type AddCustomerProps = {
  setModal: () => void;
  // handleGetAllCustomers: () => void;
};
const initialState = {
  supplierName: "",
  supplierAddress: "",
  supplierContact: "",
  supplierEmail: "",
};

export const AddSupplier = ({
  setModal,
}: // handleGetAllCustomers,
AddCustomerProps) => {
  const [supplierData, setSupplierData] = useState(initialState);

  console.log(supplierData);

  const { currentUser } = useAppSelector((state) => state?.officeState);

  const [loading, setLoading] = useState(false);

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addCustomer`,
        supplierData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.message);
      toast.success(res.data.message);

      setLoading(false);
      setModal();
      setSupplierData(initialState);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
      <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border  border-indigo-500 ">
        <form onSubmit={handlerSubmitted}>
          <Title setModal={() => setModal()}>Add Supplier</Title>
          <div className="mx-2  flex-wrap gap-3  ">
            <InputField
              labelName="Supplier Name*"
              placeHolder="Enter the Supplier Name"
              type="text"
              name="supplierName"
              handlerChange={handlerChange}
              inputVal={supplierData.supplierName}
            />
            <InputField
              labelName="Supplier Email*"
              placeHolder="Enter the Supplier Email"
              type="email"
              name="supplierEmail"
              handlerChange={handlerChange}
              inputVal={supplierData.supplierEmail}
            />

            <InputField
              labelName="Supplier Contact*"
              placeHolder="Enter the Supplier Contact Number"
              type="number"
              name="supplierContact"
              handlerChange={handlerChange}
              inputVal={supplierData.supplierContact}
            />
            <TextareaField
              labelName="Supplier Address*"
              placeHolder="Enter the Supplier Address"
              name="supplierAddress"
              handlerChange={handlerChange}
              inputVal={supplierData.supplierAddress}
            />
          </div>

          <div className="flex items-center justify-center m-2 gap-2 text-xs ">
            <CancelBtn setModal={() => setModal()} />
            <AddButton label={"Add Supplier"} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};
