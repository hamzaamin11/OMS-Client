import { Title } from "../Title";

export type ViewUserT = {
  id: number;
  name: string;
  email: string;
  contact: string;
  cnic: string;
  address: string;
  date: string;
  password: string;
  confirmPassword: string;
  role: string;
  image: string;
};
type ModalTProps = {
  setModal: () => void;
};
export const ViewConfigEmpSalary = ({ setModal }: ModalTProps) => {
  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-10">
      <div className="w-full flex justify-center">
        <div className="bg-white w-full max-w-3xl border border-indigo-500 rounded-lg p-6 shadow-lg">
          {/* Title */}
          <Title setModal={setModal}>Employee Salary Details</Title>

          {/* User Details List */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Employee Name:
              </span>
              <p className="text-gray-600">{"Hamza Amin"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Salary:
              </span>
              <p className="text-gray-600">{"500000"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Overtime Allowance:
              </span>
              <p className="text-gray-600">{"10000"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Project Allowance:
              </span>
              <p className="text-gray-600">{"50000"}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Employee Of Month Allowance:
              </span>
              <p className="text-gray-600">{"50000"}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Medical Allowance:
              </span>
              <p className="text-gray-600">{"50000"}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">Date:</span>
              <p className="text-gray-600">{"12-5-2025"}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                With Effect Date:
              </span>
              <p className="text-gray-600">{"12-5-2025"}</p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Status:
              </span>
              <p className="text-gray-600">{"Paid"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
