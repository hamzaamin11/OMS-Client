import React, { useEffect, useState } from "react";

import { AddButton } from "../CustomButtons/AddButton";

import { CancelBtn } from "../CustomButtons/CancelBtn";

import { Title } from "../Title";

import { UserSelect } from "../InputFields/UserSelect";

import axios from "axios";

import { BASE_URL } from "../../Content/URL";

import { useAppSelector } from "../../redux/Hooks";
import { InputField } from "../InputFields/InputField";
import { TextareaField } from "../InputFields/TextareaField";
import { OptionField } from "../InputFields/OptionField";

type AddAttendanceProps = {
  setModal: () => void;
  handleGetAllProgress: () => void;
};

type SeleteProjectT = {
  projectId: number;
  projectName: string;
};

const initialState = {
  employeeId: "",
  project: "",
  date: "",
  note: "",
};
export const AddProgress = ({
  setModal,
  handleGetAllProgress,
}: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [addProgress, setAddProgress] = useState(initialState);

  const [allUsers, setAllUsers] = useState([]);

  const [seleteProject, setSeleteProject] = useState<SeleteProjectT[] | null>(
    null
  );


  const token = currentUser?.token;

  const handlerChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddProgress({ ...addProgress, [name]: value });
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getUsers`, {
        headers: {
          Authorization: token,
        },
      });
      setAllUsers(res?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeleteProject = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getProjectByUser/${addProgress.employeeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      setSeleteProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addProgress/${addProgress.employeeId}`,
        addProgress,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      handleGetAllProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    if (addProgress.employeeId) {
      handleSeleteProject();
    }
  }, [addProgress?.employeeId]);
  return (
    <div>
      <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs  flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[28rem]  bg-white mx-auto rounded-xl border  border-indigo-500 ">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Progress</Title>
            <div className="mx-2 flex-wrap gap-3  ">
              <UserSelect
                labelName="Employees*"
                name="employeeId"
                value={addProgress.employeeId}
                handlerChange={handlerChange}
                optionData={allUsers}
              />

              <OptionField
                labelName="Project"
                name="project"
                handlerChange={handlerChange}
                value={addProgress.project}
                optionData={seleteProject?.map((project) => ({
                  id: project.projectId,
                  label: project.projectName,
                  value: project.projectName,
                }))}
                inital="Please Select Project"
              />

              <InputField
                labelName="End Date*"
                name="date"
                type="date"
                handlerChange={handlerChange}
                inputVal={addProgress.date}
              />
              <TextareaField
                labelName="Note*"
                name="note"
                handlerChange={handlerChange}
                inputVal={addProgress.note}
              />
            </div>

            <div className="flex items-center justify-center m-2 gap-2 text-xs ">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Progress"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
