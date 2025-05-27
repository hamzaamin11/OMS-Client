import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { CustomButton } from "../../Components/TableLayoutComponents/CustomButton";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { EditButton } from "../../Components/CustomButtons/EditButton";
import { DeleteButton } from "../../Components/CustomButtons/DeleteButton";
import { useEffect, useState } from "react";
import { AddTodo } from "../../Components/TodoModals/AddTodo";
import { UpdateTodo } from "../../Components/TodoModals/UpdateTodo";
import { ConfirmationModal } from "../../Components/Modal/ComfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
  navigationStart,
  navigationSuccess,
} from "../../redux/NavigationSlice";
import { Loader } from "../../Components/LoaderComponent/Loader";

type ALLTODOT = {
  id: number;
  name: string;
  employeeName: string;
  task: string;
  note: string;
  startDate: string;
  endDate: string;
  deadline: string;
  Deadline?: string;
};
type TODOT = "Add" | "Edit" | "Delete" | "";

export const Todo = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);

  const { loader } = useAppSelector((state) => state.NavigateSate);

  const dispatch = useAppDispatch();

  const [allTodos, setAllTodos] = useState<ALLTODOT[] | null>(null);

  const [catchId, setCatchId] = useState<number>();

  const [seleteTodo, setSeleteTodo] = useState<ALLTODOT | null>(null);

  const [isOpenModal, setIsOpenModal] = useState<TODOT>("");

  const token = currentUser?.token;
  const id = currentUser?.userId;

  const handleToggleViewModal = (active: TODOT) => {
    setIsOpenModal((prev) => (prev === active ? "" : active));
  };

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getTodos`, {
        headers: {
          Authorization: token,
        },
      });
      setAllTodos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersAllTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getTodo/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setAllTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditButton = (seleteData: ALLTODOT) => {
    handleToggleViewModal("Edit");
    setSeleteTodo(seleteData);
  };

  const hanleClickDeleteButton = (id: number) => {
    handleToggleViewModal("Delete");
    setCatchId(id);
  };

  const handleDeleteTodo = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/admin/deleteTodo/${catchId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "admin") {
      getAllTodos();
    } else {
      getUsersAllTodos();
    }

    document.title = "(OMS)ALL Todos";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("TODOS"));
    }, 1000);
  }, []);
  if (loader) return <Loader />;
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Todo's" activeFile="All Todo,s list" />
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between mx-2">
          <span>
            Total number of Attendance :{" "}
            <span className="text-2xl text-blue-500 font-semibold font-sans">
              [{allTodos?.length}]
            </span>
          </span>
          <CustomButton
            label="Add Todo"
            handleToggle={() => handleToggleViewModal("Add")}
          />
        </div>
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div></div>
          <TableInputField />
        </div>
        <div className="w-full max-h-[28.6rem] overflow-hidden  mx-auto">
          <div className="grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr] bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500 ">
            <span className="p-2  min-w-[50px]">Sr.</span>
            <span className="p-2 text-left min-w-[150px] ">Employee</span>
            <span className="p-2 text-left min-w-[150px] ">Tasks</span>
            <span className="p-2 text-left min-w-[150px] ">Start Date</span>
            <span className="p-2 text-left min-w-[150px] ">End Date</span>
            <span className="p-2 text-left min-w-[150px] ">Deadline</span>
            <span className="p-2 text-left min-w-[150px]">Action</span>
          </div>
          {allTodos?.map((todo, index) => (
            <div
              className="grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr] border border-gray-600 text-gray-800  hover:bg-gray-100 transition duration-200"
              key={todo.id}
            >
              <span className=" p-2 text-left ">{index + 1}</span>
              <span className=" p-2 text-left   ">
                {todo?.name || todo?.employeeName}
              </span>
              <span className=" p-2 text-left  ">{todo.task}</span>
              <span className=" p-2 text-left ">
                {todo.startDate.slice(0, 10)}
              </span>
              <span className=" p-2 text-left ">
                {todo.endDate.slice(0, 10)}
              </span>
              <span className=" p-2 text-left ">
                {todo.deadline?.slice(0, 10) || todo.Deadline?.slice(0, 10)}
              </span>
              <span className="p-2 flex items-center  gap-2">
                <EditButton handleUpdate={() => handleClickEditButton(todo)} />

                <DeleteButton
                  handleDelete={() => hanleClickDeleteButton(todo.id)}
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

      {isOpenModal === "Add" && (
        <AddTodo
          setModal={() => handleToggleViewModal("")}
          getAllTodos={getAllTodos}
        />
      )}

      {isOpenModal === "Edit" && (
        <UpdateTodo
          setModal={() => handleToggleViewModal("")}
          seleteTodo={seleteTodo}
        />
      )}

      {isOpenModal === "Delete" && (
        <ConfirmationModal
          isOpen={() => handleToggleViewModal("Delete")}
          onClose={() => handleToggleViewModal("")}
          onConfirm={() => handleDeleteTodo()}
        />
      )}
    </div>
  );
};
