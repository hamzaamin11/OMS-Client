import { BiUser } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import Card from "./DetailCards/Card";

import { WorkingProject } from "./MenuCards/WorkingProject";
import { CompleteProject } from "./MenuCards/CompleteProject";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { navigationStart, navigationSuccess } from "../redux/NavigationSlice";
import { Loader } from "./LoaderComponent/Loader";
import { toast } from "react-toastify";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import axios from "axios";
import { BASE_URL } from "../Content/URL";
import { OptionField } from "./InputFields/OptionField";
import { NewProject } from "./MenuCards/NewProject";
import { Columns } from "./MenuCards/Colums";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

type CategoryT = {
  id: number;
  categoryName: string;
};

type Project = {
  id: number;
  projectName: string;
  projectCategory: string;
  description: string;
  startDate: string;
  endDate: string;
  projectStatus: "Y" | "N";
};

const columsData = [
  {
    id: "newProject",
    title: "New Project",
  },
  {
    id: "working",
    title: "Working Project",
  },

  {
    id: "complete",
    title: "Complete Project",
  },
];

type DummyDataT = {
  id: string;
  projectName: string;
  status: string;
};

const dummyProjects = [
  { id: "1", projectName: "Website Redesign", status: "newProject" },
  { id: "2", projectName: "Marketing Strategy", status: "working" },
  { id: "3", projectName: "Mobile App Launch", status: "complete" },
  { id: "4", projectName: "CRM Integration", status: "working" },
  { id: "5", projectName: "SEO Optimization", status: "newProject" },
  { id: "6", projectName: "Cloud Migration", status: "complete" },
  { id: "7", projectName: "Brand Identity Update", status: "working" },
  { id: "8", projectName: "Internal Tooling", status: "newProject" },
  { id: "9", projectName: "Sales Automation", status: "complete" },
  { id: "10", projectName: "Customer Feedback System", status: "newProject" },
];

export const MainContent = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const { currentUser } = useAppSelector((state) => state.officeState);

  const [allUsers, setAllUsers] = useState([]);

  const [allCategory, setAllCategory] = useState<CategoryT[] | null>(null);

  const [formData, setFormData] = useState({
    categoryName: "",
  });

  console.log(formData.categoryName);

  const [allNewProjects, setNewAllProjects] = useState<Project[] | null>(null);

  console.log(allNewProjects, "allnewProject =>");

  console.log("allNewProjects", allNewProjects);

  const [allWorkProjects, setAllWorkProjects] = useState([]);

  const [allCompleteProjects, setAllCompleteProjects] = useState([]);

  const [allAssignProjects, setAllAssignProjects] = useState([]);

  const [allTodos, setAllTodos] = useState([]);

  const [allExpenses, setAllExpenses] = useState([]);

  const [dummyData, setDummyData] = useState<DummyDataT[]>(dummyProjects);

  console.log(dummyData, "123");

  const [expenseCategory, setExpenseCategory] = useState([]);

  const token = currentUser?.token;

  const dispatch = useAppDispatch();

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

  console.log("working", allWorkProjects);
  console.log("Complete", allCompleteProjects);

  const handlegetNewProjects = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getNewProjects?projectCategory=${formData.categoryName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setNewAllProjects(res.data);
      console.log("=>>>>>>>>>>>>>>>>>new project hit", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetWorkProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getWorkingProjects`, {
        headers: {
          Authorization: token,
        },
      });
      setAllWorkProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetCompleteProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getCompleteProjects`, {
        headers: {
          Authorization: token,
        },
      });
      setAllCompleteProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetAssignProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAssignProjects`, {
        headers: {
          Authorization: token,
        },
      });
      setAllAssignProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegetTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getTodos`, {
        headers: {
          Authorization: token,
        },
      });
      setAllTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getExpense`, {
        headers: {
          Authorization: token,
        },
      });
      setAllExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetExpenseCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getExpenseCategory`, {
        headers: {
          Authorization: token,
        },
      });
      setExpenseCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProjectsCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getCategory`, {
        headers: {
          Authorization: token,
        },
      });
      setAllCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as DummyDataT["status"];

    console.log(newStatus, " <=<new Status");

    setDummyData((prevData) =>
      prevData.map((project) =>
        project.id === taskId ? { ...project, status: newStatus } : project
      )
    );
  };

  useEffect(() => {
    toast.success("Welcome To Technic Mentors(OMS)");
    document.title = "(OMS)Admin Dashboard";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("logIn"));
    }, 1000);
    getAllUsers();
    handlegetNewProjects();
    handlegetAssignProjects();
    handlegetTodos();
    handleGetExpenses();
    handleGetExpenseCategory();
    handlegetWorkProjects();
    handlegetCompleteProjects();
    handleGetProjectsCategory();
  }, []);

  useEffect(() => {
    if (formData.categoryName) {
      handlegetNewProjects();
    }
  }, [formData.categoryName]);

  if (loader) return <Loader />;

  return (
    <div className="w-full  h-full overflow-y-auto ">
      <form className="flex items-center justify-between mx-5 mt-4 gap-4 ">
        <div className="flex flex-col bg-white  w-full rounded-lg shadow-lg space-y-4">
          <OptionField
            labelName="Project Category"
            name="categoryName"
            handlerChange={handleChange}
            value={formData.categoryName}
            optionData={allCategory?.map((category) => ({
              id: category.id,
              label: category.categoryName,
              value: category.categoryName,
            }))}
            inital="Please Select Category"
          />
        </div>
      </form>

      <div className="flex justify-between gap-4 mx-4 bg-">
        {/* <NewProject
          allProjects={allNewProjects}
          handlegetNewProjects={handlegetNewProjects}
        />
        <WorkingProject />
        <CompleteProject /> */}
        <DndContext onDragEnd={handleDragEnd}>
          {columsData.map((column) => (
            <Columns
              key={column.id}
              colum={column}
              allProject={dummyData?.filter(
                (task) => task?.status === column.id
              )}
            />
          ))}
        </DndContext>
      </div>
      <div className="flex items-center justify-between m-4 ">
        <Card
          titleName="Users"
          totalUser="TotalUser"
          totalNumber={allUsers.length}
          icon={<BiUser />}
          style="bg-indigo-500 "
        />
        {/* <Card
          titleName=" Projects"
          totalUser="TotalProjects"
          totalNumber={allNewProjects?.length}
          icon={<FaProjectDiagram />}
          style="bg-red-500  "
        /> */}
        <Card
          titleName="Assigned Projects"
          totalUser="TotalProjects"
          totalNumber={allAssignProjects.length}
          icon={<FaProjectDiagram />}
          style="bg-blue-500 "
        />
        <Card
          titleName="Todo's"
          totalUser="TotalTodo's"
          totalNumber={allTodos.length}
          icon={<LuListTodo />}
          style="bg-orange-400 "
        />
        <Card
          titleName="Expense Categories"
          totalUser="TotalTodo's"
          totalNumber={expenseCategory.length}
          icon={<CiViewList />}
          style="bg-fuchsia-500 "
        />
        <Card
          titleName="Total Expense"
          totalUser="TotalTodo's"
          totalNumber={allExpenses.length}
          icon={<GiTakeMyMoney />}
          style="bg-cyan-600 "
        />
      </div>
    </div>
  );
};
