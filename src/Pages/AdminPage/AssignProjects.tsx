import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddAssignProject } from "../../Components/AssignProjectModal/AddAssignProject";
import { EditAssignProject } from "../../Components/AssignProjectModal/EditAssignProject";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

const numbers = [10, 25, 50, 100];

type ASSIGNPROJECTT = "ADDPROJECT" | "EDITPROJECT" | "DELETEPROJECT" | "";

type ALLASSIGNPROJECTT = {
  id: number;
  name: string;
  projectName: string;
};

export const AssignProjects = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const isAdmin = currentUser?.role;

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [allAssignProjects, setAllAssignProjects] = useState<
    ALLASSIGNPROJECTT[] | null
  >(null);

  const [isOpenModal, setIsOpenModal] = useState<ASSIGNPROJECTT>("");

  const handleToggleViewModal = (active: ASSIGNPROJECTT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const token = currentUser?.token;
  const handleGetAllAssignProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAssignProjects`, {
        headers: {
          Authorization: token,
        },
      });

      console.log(res.data);
      setAllAssignProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllAssignProjects();
    document.title = "(OMS)ASSIGN PTROJECTS";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("Assign project"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Assign Project" activeFile="Assign Project list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>
          {isAdmin === "admin" ? (
            <CustomButton
              label=" Add Assign Project"
              handleToggle={() => handleToggleViewModal("ADDPROJECT")}
            />
          ) : null}
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select>
                {numbers.map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-4 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Users</span>
            <span className="p-2 text-left min-w-[150px] ">Project</span>
            <span className="p-2 text-left min-w-[150px] ">Actions</span>
          </div>
          {allAssignProjects?.map((allAssign, index) => (
            <div
              className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={allAssign.id}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">{allAssign.name}</span>
              <span className=" p-2 text-left  ">{allAssign.projectName}</span>
              <span className="p-2 flex items-center  gap-2">
                <EditButton
                  handleUpdate={() => handleToggleViewModal("EDITPROJECT")}
                />
                <DeleteButton
                  handleDelete={() => handleToggleViewModal("DELETEPROJECT")}
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
      {isOpenModal === "ADDPROJECT" && (
        <AddAssignProject
          setModal={() => setIsOpenModal("")}
          handleGetAllAssignProjects={handleGetAllAssignProjects}
        />
      )}

      {isOpenModal === "EDITPROJECT" && (
        <div>
          <EditAssignProject setModal={() => handleToggleViewModal("")} />
        </div>
      )}

      {isOpenModal === "DELETEPROJECT" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETEPROJECT")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleToggleViewModal("")}
        />
      )}
    </div>
  );
};
