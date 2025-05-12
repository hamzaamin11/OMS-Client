import { ShowDataNumber } from "../Components/Pagination/ShowDataNumber";
import { Pagination } from "../Components/Pagination/Pagination";
import { TableInputField } from "../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../Components/CustomButtons/EditButton";
import { DeleteButton } from "../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddProgress } from "../Components/ProgressModal/AddProgress";
import { EditProgress } from "../Components/ProgressModal/EditProgress";
import { ConfirmationModal } from "../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../Content/URL";
import { useAppSelector } from "../redux/Hooks";

const numbers = [10, 25, 50, 100];

type PROGRESST = "ADD" | "EDIT" | "DELETE" | "";

type ALLPROGRESST = {
  id: number;
  name: string;
  projectName: string;
  date: string;
};

export const Progress = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const [allProgress, setAllProgress] = useState<ALLPROGRESST[] | null>(null);

  const [isOpenModal, setIsOpenModal] = useState<PROGRESST>("");

  const token = currentUser?.token;

  const handleToggleViewModal = (active: PROGRESST) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleGetAllProgress = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getProgress`, {
        headers: {
          Authorization: token,
        },
      });
      setAllProgress(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllProgress();
  }, []);

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Progress" activeFile="All Progress list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          <CustomButton
            label="Add Progress"
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
          <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Employee</span>
            <span className="p-2 text-left min-w-[150px] ">Project</span>
            <span className="p-2 text-left min-w-[150px] ">Date</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allProgress?.map((project, index) => (
            <div
              className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={project.id}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">{project.name}</span>
              <span className=" p-2 text-left  ">{project.projectName}</span>
              <span className=" p-2 text-left ">
                {project.date.slice(0, 10)}
              </span>

              <span className="p-2 flex items-center  gap-2">
                <EditButton
                  handleUpdate={() => handleToggleViewModal("EDIT")}
                />
                <DeleteButton
                  handleDelete={() => handleToggleViewModal("DELETE")}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={1 + 9} />
        <Pagination />
      </div>

      {isOpenModal === "ADD" && (
        <AddProgress
          setModal={() => handleToggleViewModal("")}
          handleGetAllProgress={handleGetAllProgress}
        />
      )}

      {isOpenModal === "EDIT" && (
        <EditProgress setModal={() => handleToggleViewModal("")} />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleToggleViewModal("")}
        />
      )}
    </div>
  );
};
