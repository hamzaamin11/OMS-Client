import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { UserDashboard } from "./Pages/UserDashboard";
import { PrivateLayout } from "./Components/HOC/PrivateLayout/PrivateLayout";
import { UsersDetails } from "./Pages/AdminPage/UsersDetails";
import { CustomerDetail } from "./Pages/AdminPage/CustomerDetail";
import { MarkAttendance } from "./Pages/AdminPage/MarkAttendance";
import { UserAttendance } from "./Pages/AdminPage/UserAttendance";
import { LeaveRequests } from "./Pages/AdminPage/LeaveRequests";
import { Holidays } from "./Pages/AdminPage/Holidays";
import { EmployeeWithdraw } from "./Pages/AdminPage/EmployeeWithdraw";
import { ProjectsDetails } from "./Pages/AdminPage/ProjectsDetails";
import { ProjectsCatogries } from "./Pages/ProjectsCategories";
import { AssignProjects } from "./Pages/AdminPage/AssignProjects";
import { Todo } from "./Pages/AdminPage/Todo";
import { Progress } from "./Pages/Progress";
import { Sales } from "./Pages/AdminPage/Sales";
import { Quotation } from "./Pages/AdminPage/Quotation";
import { Payments } from "./Pages/AdminPage/Payments";
import { Expenses } from "./Pages/AdminPage/Expenses";
import { ExpensesCatogries } from "./Pages/AdminPage/ExpensesCatogries";
import { Communication } from "./Pages/AdminPage/Communication";
import { Calendar } from "./Pages/AdminPage/Calendar";
import { SalaryCycle } from "./Pages/AdminPage/SalaryCycle";
import { ConfigEmpSalary } from "./Pages/AdminPage/ConfigEmpSalary";
import { ConfigTime } from "./Pages/AdminPage/ConfigTime";
import { EmployeeAccount } from "./Pages/AdminPage/EmployeeAccount";
import { SalesReports } from "./Pages/AdminPage/SalesReports";
import { ProgressReports } from "./Pages/AdminPage/ProgressReports";
import { AttendanceReports } from "./Pages/AdminPage/AttendanceReports";
import { ProcessReports } from "./Pages/AdminPage/ProcessReports";
import { PaymentsReports } from "./Pages/AdminPage/PaymentsReports";
import { ExpenseReports } from "./Pages/AdminPage/ExpenseReports";
import { Profile } from "./Pages/AdminPage/Profile";
import { PrivateRoute } from "./Components/PrivateRouteHOC/PrivateRoute";

function App() {
  return (
    <Routers>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* {All Admin Routes deffine here } */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/dashboard"
            element={
              <PrivateLayout>
                <AdminDashboard />
              </PrivateLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <Profile />
              </PrivateLayout>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateLayout>
                <UsersDetails />
              </PrivateLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateLayout>
                <CustomerDetail />
              </PrivateLayout>
            }
          />
          <Route
            path="/markAttendance"
            element={
              <PrivateLayout>
                <MarkAttendance />
              </PrivateLayout>
            }
          />
          <Route
            path="/usersAttendance"
            element={
              <PrivateLayout>
                <UserAttendance />
              </PrivateLayout>
            }
          />
          <Route
            path="/leaveRequests"
            element={
              <PrivateLayout>
                <LeaveRequests />
              </PrivateLayout>
            }
          />
          <Route
            path="/holidays"
            element={
              <PrivateLayout>
                <Holidays />
              </PrivateLayout>
            }
          />
          <Route
            path="/employeeWithdraw"
            element={
              <PrivateLayout>
                <EmployeeWithdraw />
              </PrivateLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateLayout>
                <ProjectsDetails />
              </PrivateLayout>
            }
          />
          <Route
            path="/projectCatogries"
            element={
              <PrivateLayout>
                <ProjectsCatogries />
              </PrivateLayout>
            }
          />
          <Route
            path="/assignprojects"
            element={
              <PrivateLayout>
                <AssignProjects />
              </PrivateLayout>
            }
          />
          <Route
            path="/todo"
            element={
              <PrivateLayout>
                <Todo />
              </PrivateLayout>
            }
          />
          <Route
            path="/progress"
            element={
              <PrivateLayout>
                <Progress />
              </PrivateLayout>
            }
          />
          <Route
            path="/sales"
            element={
              <PrivateLayout>
                <Sales />
              </PrivateLayout>
            }
          />
          <Route
            path="/quotations"
            element={
              <PrivateLayout>
                <Quotation />
              </PrivateLayout>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateLayout>
                <Payments />
              </PrivateLayout>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateLayout>
                <Expenses />
              </PrivateLayout>
            }
          />
          <Route
            path="/expensesCatogries"
            element={
              <PrivateLayout>
                <ExpensesCatogries />
              </PrivateLayout>
            }
          />
          <Route
            path="/communication"
            element={
              <PrivateLayout>
                <Communication />
              </PrivateLayout>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateLayout>
                <Calendar />
              </PrivateLayout>
            }
          />
          <Route
            path="/salaryCycle"
            element={
              <PrivateLayout>
                <SalaryCycle />
              </PrivateLayout>
            }
          />
          <Route
            path="/configEmployeeSalaries"
            element={
              <PrivateLayout>
                <ConfigEmpSalary />
              </PrivateLayout>
            }
          />
          <Route
            path="/configTime"
            element={
              <PrivateLayout>
                <ConfigTime />
              </PrivateLayout>
            }
          />
          <Route
            path="/employeeAccount"
            element={
              <PrivateLayout>
                <EmployeeAccount />
              </PrivateLayout>
            }
          />
          <Route
            path="/salesReports"
            element={
              <PrivateLayout>
                <SalesReports />
              </PrivateLayout>
            }
          />
          <Route
            path="/progressReports"
            element={
              <PrivateLayout>
                <ProgressReports />
              </PrivateLayout>
            }
          />
          <Route
            path="/attendanceReports"
            element={
              <PrivateLayout>
                <AttendanceReports />
              </PrivateLayout>
            }
          />
          <Route
            path="/processReports"
            element={
              <PrivateLayout>
                <ProcessReports />
              </PrivateLayout>
            }
          />
          <Route
            path="/paymentReports"
            element={
              <PrivateLayout>
                <PaymentsReports />
              </PrivateLayout>
            }
          />
          <Route
            path="/expenseReports"
            element={
              <PrivateLayout>
                <ExpenseReports />
              </PrivateLayout>
            }
          />
          {/* {All User Routes define here} */}

          <Route
            path="/user/dashboard"
            element={
              <PrivateLayout>
                <UserDashboard />
              </PrivateLayout>
            }
          />
        </Route>
      </Routes>
    </Routers>
  );
}

export default App;
