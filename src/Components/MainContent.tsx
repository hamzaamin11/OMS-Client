import { BiUser } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import Card from "./DetailCards/Card";
import { NewProject } from "./MenuCards/NewProject";
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

type CategoryT = {
  id: number;
  categoryName: string;
};

export const MainContent = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);

  const { currentUser } = useAppSelector((state) => state.officeState);

  const [allUsers, setAllUsers] = useState([]);

  const [allCategory, setAllCategory] = useState<CategoryT[] | null>(null);

  const [formData, setFormData] = useState({
    categoryName: "",
  });

  console.log(formData.categoryName);

  const [allNewProjects, setNewAllProjects] = useState([]);

  const [allWorkProjects, setAllWorkProjects] = useState([]);

  const [allCompleteProjects, setAllCompleteProjects] = useState([]);

  const [allAssignProjects, setAllAssignProjects] = useState([]);

  const [allTodos, setAllTodos] = useState([]);

  const [allExpenses, setAllExpenses] = useState([]);

  console.log(allNewProjects);

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
        <NewProject
          allProjects={allNewProjects}
          handlegetNewProjects={handlegetNewProjects}
        />
        <WorkingProject />
        <CompleteProject />
      </div>
      <div className="flex items-center justify-between m-4 ">
        <Card
          titleName="Users"
          totalUser="TotalUser"
          totalNumber={allUsers.length}
          icon={<BiUser />}
          style="bg-indigo-500 "
        />
        <Card
          titleName=" Projects"
          totalUser="TotalProjects"
          totalNumber={allNewProjects.length}
          icon={<FaProjectDiagram />}
          style="bg-red-500  "
        />
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
