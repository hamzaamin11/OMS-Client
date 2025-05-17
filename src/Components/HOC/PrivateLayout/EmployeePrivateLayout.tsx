import { useState } from "react";
import { Header } from "../../Header";
import { Footer } from "../../Footer";
import { EmployeeSideBar } from "../../Employee/EmployeeSideBar";

export interface IPrivateLayout extends React.ComponentPropsWithoutRef<"div"> {}
export const EmployeePrivateLayout = ({ children }: IPrivateLayout) => {
  const [isOpen, setIsopen] = useState(false);

  const toggleSideBar = () => {
    setIsopen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <div className="flex flex-col h-[calc(100%-3.5rem)] overflow-y-auto">
        <div className="flex flex-grow overflow-y-auto">
          <EmployeeSideBar isOpen={isOpen} />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
