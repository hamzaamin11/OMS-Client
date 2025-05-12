import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { OptionField } from "../InputFields/OptionField";

type ADDSALET = {
  id: number;
  projectId: number;
  projectName: string;
  customerId: number;
  customerName: string;
};

type CustomerT = {
  id: number;
  customerName: string;
};

type ProjectT = {
  id: number;
  projectName: string;
};

type AddAttendanceProps = {
  setModal: () => void;
  seleteSale: ADDSALET | null;
};

export const EditSale = ({ setModal, seleteSale }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [updateSale, setUpdateSale] = useState(seleteSale);

  const [allProjects, setAllProjects] = useState<ProjectT[] | null>(null);

  const [allCustomers, setAllCustomers] = useState<CustomerT[] | null>(null);

  console.log({ updateSale });

  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdateSale({ ...updateSale, [name]: value } as ADDSALET);
  };

  const handleGetProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getProjects`, {
        headers: {
          Authorization: token,
        },
      });
      setAllProjects(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCustomers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllCustomers`, {
        headers: {
          Authorization: token,
        },
      });

      setAllCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateSalesData/${updateSale?.customerId}/${updateSale?.projectId}/${updateSale?.id}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProjects();
    getAllCustomers();
  }, []);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Update Sale</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <OptionField
                labelName="Customer*"
                name="customerName"
                value={updateSale?.customerName ?? ""}
                handlerChange={handlerChange}
                optionData={allCustomers?.map((customer) => ({
                  id: customer.id,
                  label: customer.customerName,
                  value: customer.id,
                }))}
                inital="Please Select Customer"
              />

              <OptionField
                labelName="Project*"
                name="projectName"
                value={updateSale?.projectName ?? ""}
                handlerChange={handlerChange}
                optionData={allProjects?.map((project) => ({
                  id: project.id,
                  label: project.projectName,
                  value: project.id,
                }))}
                inital="Please Select Project"
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Update Sale"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
