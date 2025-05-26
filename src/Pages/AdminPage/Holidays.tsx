import { useEffect, useState } from "react";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { Loader } from "../../Components/LoaderComponent/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Pagination } from "../../Components/Pagination/Pagination";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { AddHoliday } from "../../Components/HolidayModals/AddHoliday";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { UpdateHoliday } from "../../Components/HolidayModals/UpdateHoliday";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import { toast } from "react-toastify";

const numbers = [10, 25, 50, 100];

type THOLIDAYMODAL = "EDIT" | "DELETE" | "ADDHOLIDAY" | "";

type HOLIDAYSTATET = {
  id: number;
  date: string;
  holiday: string;
};

export const Holidays = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const [allHoliday, setAllHoliday] = useState<HOLIDAYSTATET[] | null>(null);

  const token = currentUser?.token;

  const [editHoliday, setEditHoliday] = useState<HOLIDAYSTATET | null>(null);

  const [catchId, setCatchId] = useState<Number>();

  const [isOpenModal, setIsOpenModal] = useState<THOLIDAYMODAL>("");

  const [selectedValue, setSelectedValue] = useState(10);

  const [pageNo, setPageNo] = useState(1);

  const handleIncrementPageButton = () => {
    setPageNo((prev) => prev + 1);
  };

  const handleDecrementPageButton = () => {
    setPageNo((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChangeShowData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(e.target.value));
  };

  const handleToggleViewModal = (active: THOLIDAYMODAL) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const handleUpdateHoliday = (id: HOLIDAYSTATET) => {
    handleToggleViewModal("EDIT");
    setEditHoliday(id);
  };

  const handleGetAllHodidays = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getHolidays`, {
        headers: {
          Authorization: token,
        },
      });
      setAllHoliday(res.data);
      console.log("get", res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelededCall = (id: number) => {
    handleToggleViewModal("DELETE");
    setCatchId(id);
  };
  const handleDeleteHoliday = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteHoliday/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.info(res.data.message);
      handleGetAllHodidays();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "(OMS) HOLIDAYS";
    handleGetAllHodidays();
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("holidays"));
    }, 1000);
  }, [dispatch]);

  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Configure Holidays" activeFile="Holidays List" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <span>
            Total Number of Holidays in List :
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [10]
            </span>
          </span>

          <CustomButton
            label="Add Holiday"
            handleToggle={() => handleToggleViewModal("ADDHOLIDAY")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div>
            <span>Show</span>
            <span className="bg-gray-200 rounded mx-1 p-1">
              <select value={selectedValue} onChange={handleChangeShowData}>
                {numbers.map((num, index) => (
                  <option key={index} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </span>
            <span>entries</span>
          </div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-4 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500  ">
            <span className="p-2 text-left min-w-[150px] ">Sr#</span>
            <span className="p-2 text-left min-w-[150px] ">Date</span>
            <span className="p-2 text-left min-w-[350px] ">Holiday</span>
            <span className="p-2 text-left min-w-[350px] ">Actions</span>
          </div>
          {allHoliday?.map((holi, index) => (
            <div
              key={holi?.id}
              className="grid grid-cols-4 border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
            >
              <span className="p-2 text-left">{index + 1}</span>
              <span className="p-2 text-left">{holi.date.slice(0, 10)}</span>
              <span className="p-2 text-left">{holi.holiday}</span>
              <span className="p-2 flex items-center  gap-1">
                <EditButton handleUpdate={() => handleUpdateHoliday(holi)} />
                <DeleteButton
                  handleDelete={() => handleDelededCall(holi?.id)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ShowDataNumber />
        <Pagination
          handleIncrementPageButton={handleIncrementPageButton}
          handleDecrementPageButton={handleDecrementPageButton}
          pageNo={pageNo}
        />
      </div>
      {isOpenModal === "ADDHOLIDAY" && (
        <AddHoliday
          handleGetAllHodidays={handleGetAllHodidays}
          setModal={() => setIsOpenModal("")}
        />
      )}

      {isOpenModal === "EDIT" && (
        <UpdateHoliday
          setModal={() => setIsOpenModal("")}
          handleGetAllHodidays={handleGetAllHodidays}
          editHoliday={editHoliday}
        />
      )}

      {isOpenModal === "DELETE" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("DELETE")}
          message="Are you sure you want to delete this Holiday?"
          onClose={() => handleToggleViewModal("")}
          onConfirm={handleDeleteHoliday}
        />
      )}
    </div>
  );
};
