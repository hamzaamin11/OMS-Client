import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddConfigTime } from "../../Components/ConfigTimeModal/AddConfigTime";
import { EditConfigTime } from "../../Components/ConfigTimeModal/EditConfigTime";
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

const numbers = [10, 25, 50, 10];

type CONFIGTIMET = "ADD" | "EDIT" | "DELETE" | "";

type ALLCONFIGT = {
  id: number;
  configureType: string;
  configureTime: string;
};
export const ConfigTime = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<CONFIGTIMET>("");

  const [allConfig, setAllConfig] = useState<ALLCONFIGT[] | null>(null);

  const [selectData, setSelectData] = useState<ALLCONFIGT | null>(null);

  const [catchId, setCatchId] = useState<number>();

  const token = currentUser?.token;

  const handleToggleViewModal = (active: CONFIGTIMET) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleGetAllTimeConfig = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getTimeConfigured`, {
        headers: {
          Authorization: token,
        },
      });
      setAllConfig(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditButton = (data: ALLCONFIGT) => {
    handleToggleViewModal("EDIT");
    setSelectData(data);
  };

  const handleClickDeleteButton = (id: number) => {
    handleToggleViewModal("DELETE");
    setCatchId(id);
  };

  const handleDeleteConfigTime = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteTime/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleGetAllTimeConfig();
      toast.info("Time Configuration has been deleted");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTimeConfig();
    document.title = "(OMS) CONFIG TIME";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("JCONFIG TIME"));
    }, 1000);
  }, []);

  if (loader) return <Loader />;
  
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Configure Time" activeFile="Late List" />

      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total Number of Configure Time :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              {allConfig?.length}
            </span>
          </span>
          <CustomButton
            label="Add Config Time"
            handleToggle={() => handleToggleViewModal("ADD")}
          />
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
            <span className="p-2  min-w-[50px]">Sr#</span>
            <span className="p-2 text-left min-w-[150px] ">Config Time</span>
            <span className="p-2 text-left min-w-[150px] ">Type</span>
            <span className="p-2 text-left min-w-[150px] ">Action</span>
          </div>
          {allConfig?.length === 0 ? (
            <div className="text-gray-800 text-lg text-center py-2 ">
              No records available at the moment!
            </div>
          ) : (
            allConfig?.map((config, index) => (
              <div
                className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
                key={config.id}
              >
                <span className=" p-2 text-left ">{index + 1}</span>
                <span className=" p-2 text-left   ">
                  {config.configureTime ?? "guest"}
                </span>
                <span className=" p-2 text-left  ">{config.configureType}</span>
                <span className="p-2 flex items-center  gap-1">
                  <EditButton
                    handleUpdate={() => handleClickEditButton(config)}
                  />
                  <DeleteButton
                    handleDelete={() => handleClickDeleteButton(config.id)}
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
        <AddConfigTime
          setModal={() => handleToggleViewModal("")}
          handleGetAllTimeConfig={handleGetAllTimeConfig}
        />
      )}

      {isOpenModal === "EDIT" && (
        <EditConfigTime
          setModal={() => handleToggleViewModal("")}
          handleGetAllTimeConfig={handleGetAllTimeConfig}
          selectData={selectData}
        />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleDeleteConfigTime()}
        />
      )}
    </div>
  );
};
