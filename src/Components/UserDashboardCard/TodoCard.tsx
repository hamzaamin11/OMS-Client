import { FaTasks } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const TodoCard = () => {
  return (
    <div className="max-w-lg   bg-white shadow-lg rounded-lg mt-16  w-full max-h-screen">
      {/* Header */}
      <div className="bg-indigo-500 text-white text-lg font-semibold p-4">
        Todo's
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2 text-gray-700 font-serif">
            <FaTasks className="text-indigo-500" />
            Tasks
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-serif">
            <BsCalendarDate className="text-indigo-500" />
            Deadline
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 text-center">
        <a href="#" className="text-blue-500 hover:underline font-medium">
          For More
        </a>
      </div>
    </div>
  );
};

export default TodoCard;
