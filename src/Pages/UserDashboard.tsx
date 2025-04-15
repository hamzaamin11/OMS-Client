import TodoCard from "../Components/UserDashboardCard/TodoCard";
import AssignProject from "../Components/UserDashboardCard/AssignProjectCard";

export const UserDashboard = () => {
  return (
    <div className="flex items-center  w-full h-full">
      <TodoCard />
      <AssignProject />
    </div>
  );
};
