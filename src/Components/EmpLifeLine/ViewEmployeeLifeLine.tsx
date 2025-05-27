import { DeleteButton } from "../CustomButtons/DeleteButton";
import { EditButton } from "../CustomButtons/EditButton";
import { Title } from "../Title";
import profilePicture from "../../assets/vector.png";
import { useState } from "react";

type VIEWEMPLOYEELIFELINEPROPS = {
  setIsOpenModal: () => void;
  // viewExpense: allExpenseT | null;
};

type ISOPENT = "EDIT" | "DELETE" | "";

export const ViewEmployeeLifeLine = ({
  setIsOpenModal,
}: VIEWEMPLOYEELIFELINEPROPS) => {
  const [isOpenData, setIsOpenData] = useState<ISOPENT | null>(null);

  const handleToggleModal = (active: ISOPENT) => {
    setIsOpenData((prev) => (prev === active ? "" : active));
  };

  console.log(isOpenData);

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-10">
      {/* Profile Section */}

      {/* Detail Section */}
      <div className="bg-white w-full max-w-3xl border border-indigo-500 rounded-lg p-6 shadow-lg">
        <Title setModal={setIsOpenModal}>Employee Lifeline</Title>

        {/* Profile Section */}
        <div className="flex items-center gap-6 bg-white p-3  shadow-md rounded-lg">
          {/* Profile Picture */}
          <img
            className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover"
            src={profilePicture}
            alt="Profile"
          />

          {/* User Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              {"Hamza amin"}
            </h2>
            <h4 className="text-sm text-gray-500">{"Hamzamin104@gmail.com"}</h4>
          </div>
        </div>

        {/* Header Row */}
        <div className=" max-h-[20rem]  overflow-y-auto">
          <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] bg-gray-100 text-gray-800 font-semibold text-sm border border-gray-300 rounded-t-md">
            <span className="p-1 min-w-[50px]">Sr#</span>
            <span className="p-1 text-left min-w-[150px]">Date</span>
            <span className="p-1 text-left min-w-[150px]">Position</span>
            <span className="p-1 text-center min-w-[150px]">Actions</span>
          </div>

          {/* Data Row */}
          <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] text-sm text-gray-700 border-x border-b border-gray-300 hover:bg-gray-50 transition duration-200">
            <span className="p-1 min-w-[50px]">1</span>
            <span className="p-1 text-left min-w-[150px]">27 May, 2025</span>
            <span className="p-1 text-left min-w-[150px]">React.js</span>
            <span className="p-1 flex items-center justify-center gap-2">
              <EditButton handleUpdate={() => handleToggleModal("EDIT")} />
              <DeleteButton handleDelete={() => handleToggleModal("DELETE")} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
