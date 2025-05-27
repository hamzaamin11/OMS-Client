import TodoCard from "../Components/UserDashboardCard/TodoCard";
import AssignProject from "../Components/UserDashboardCard/AssignProjectCard";
import Card from "../Components/DetailCards/Card";

export const UserDashboard = () => {
  return (
    <div className="flex items-center  w-full h-full">
      <TodoCard />
      <AssignProject />
      <div>
        <Card titleName="workings Days"/>
      </div>
    </div>
  );
};
