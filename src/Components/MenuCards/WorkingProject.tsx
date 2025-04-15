import { BiArrowFromTop } from "react-icons/bi";

export const WorkingProject = () => {
  return (
    <div className="w-full max-w-2xl h-96 bg-white mt-4 rounded-lg shadow-lg overflow-y-auto p-4 mx-auto relative">
      {/* Title (Fixed) */}
      <h1 className="text-center text-lg font-semibold bg-orange-400 text-white p-3 rounded-md  sticky top-0 z-10">
        Working Project
      </h1>

      {/* Project List Items */}
      <div className="space-y-3 mt-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="shadow-md  py-3 px-5 bg-gray-100 flex items-center justify-between rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          >
            <span className="text-gray-800 font-medium">
              Estate Management System
            </span>
            <BiArrowFromTop className="text-gray-700 hover:text-indigo-500 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
