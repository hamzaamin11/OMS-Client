import { BiUser } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import Card from "./DetailCards/Card";
import { NewProject } from "./MenuCards/NewProject";
import { WorkingProject } from "./MenuCards/WorkingProject";
import { CompleteProject } from "./MenuCards/CompleteProject";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { navigationStart, navigationSuccess } from "../redux/NavigationSlice";
import { Loader } from "./LoaderComponent/Loader";
import { toast } from "react-toastify";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
export const MainContent = () => {
  const { loader } = useAppSelector((state) => state.NavigateSate);
  const dispatch = useAppDispatch();
  useEffect(() => {
    toast.success("Welcome To Technic Mentors(OMS)");
    document.title = "(OMS)Admin Dashboard";
    dispatch(navigationStart());
    setTimeout(() => {
      dispatch(navigationSuccess("logIn"));
    }, 1000);
  }, []);
  if (loader) return <Loader />;

  return (
    <div className="w-full  h-full overflow-y-auto ">
      <form className="flex items-center justify-between mx-5 mt-4 gap-4 ">
        <div className="flex flex-col bg-white  w-full rounded-lg shadow-lg space-y-4">
          <label className="text-gray-900 font-medium mb-1 p-2 ">
            Project Category
          </label>
          <select className="w-full border text-gray-800 border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ">
            <option>Select Category</option>
            <option>Web Application</option>
            <option>Blog</option>
            <option>Graphic Designing</option>
            <option>Digital Marketing</option>
            <option>Desktop Software</option>
          </select>
        </div>
        <div className="  w-full rounded-lg  bg-white shadow-lg space-y-4 p-2">
          {/* "To" Field */}

          <label className="text-gray-900 font-medium mb-1">To</label>
          <input
            type="date"
            className="w-full text-gray-800 border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        {/* "From" Field */}
        <div className="  rounded-lg shadow-lg w-full  bg-white space-y-4 p-2">
          <label className="text-gray-900 font-medium mb-1">From</label>
          <input
            type="date"
            className="w-full border text-gray-800 border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
      </form>
      <div className="flex justify-between gap-4 mx-4 bg-">
        <NewProject />
        <WorkingProject />
        <CompleteProject />
      </div>
      <div className="flex items-center justify-between m-4 ">
        <Card
          titleName="Users"
          totalUser="TotalUser"
          totalNumber={53}
          icon={<BiUser />}
          style="bg-indigo-500 "
        />
        <Card
          titleName="Total Projects"
          totalUser="TotalProjects"
          totalNumber={43}
          icon={<FaProjectDiagram />}
          style="bg-red-500  "
        />
        <Card
          titleName="Assigned Projects"
          totalUser="TotalProjects"
          totalNumber={93}
          icon={<FaProjectDiagram />}
          style="bg-blue-500 "
        />
        <Card
          titleName="Todo's"
          totalUser="TotalTodo's"
          totalNumber={193}
          icon={<LuListTodo />}
          style="bg-orange-400 "
        />
        <Card
          titleName="Expense Categories"
          totalUser="TotalTodo's"
          totalNumber={193}
          icon={<CiViewList />}
          style="bg-fuchsia-500 "
        />
        <Card
          titleName="Total Expense"
          totalUser="TotalTodo's"
          totalNumber={193}
          icon={<GiTakeMyMoney />}
          style="bg-cyan-600 "
        />
      </div>
    </div>
  );
};
