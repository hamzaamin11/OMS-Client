import { FaTasks } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const EmployeeDashborad = () => {
  return (
    <div className="flex  flex-col md:flex-row gap-4 text-gray-700 p-4 w-full">
      {/* Todo Card */}
      <div className="bg-white rounded-xl shadow-md w-full h-64 ">
        <div className="bg-indigo-500 text-white rounded-t-xl px-4 py-3 font-semibold text-lg">
          Todo's
        </div>
        <div className="p-4 border-b flex justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-1">
            <FaTasks />
            Tasks
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            Deadline
          </div>
        </div>
        <div className="p-4 text-center text-blue-500 text-sm font-medium hover:underline cursor-pointer">
          <Link to={"/todo"}>For More</Link>
        </div>
      </div>

      {/* Projects Card */}
      <div className="bg-white rounded-xl shadow-md h-80 w-full">
        <div className="bg-indigo-500 text-white rounded-t-xl px-4 py-3 font-semibold text-lg">
          Project's
        </div>
        <div className="p-4 border-b flex justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-1">
            <FaTasks />
            Projects
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            Project Assigned Date
          </div>
        </div>
        <div className="px-4 py-2 flex justify-between border-b text-sm text-gray-700">
          <span>Office Management System</span>
          <span>05-Apr-25</span>
        </div>
        <div className="px-4 py-2 flex justify-between text-sm text-gray-700">
          <span>Learning and Excercise</span>
          <span>05-Apr-25</span>
        </div>
      </div>
    </div>
  );
};
