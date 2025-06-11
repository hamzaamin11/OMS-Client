import TodoCard from "../Components/UserDashboardCard/TodoCard";
import AssignProject from "../Components/UserDashboardCard/AssignProjectCard";
import Card from "../Components/DetailCards/Card";
import { FaComputer } from "react-icons/fa6";

export const UserDashboard = () => {
  return (
    <div className="flex items-center  w-full h-full">
      <TodoCard />
      <AssignProject />
      <div>
        <Card
          titleName="workings Days"
          totalNumber={10}
          totalUser={"10"}
          icon={<FaComputer />}
          style="bg-cyan-600 "
        />
      </div>
    </div>
  );
};
