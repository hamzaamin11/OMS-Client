import { Title } from "../Title";
import profilePicture from "../../assets/vector.png";
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
export const ViewSupplierModal = ({ setModal }: ModalTProps) => {
  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-10">
      <div className="w-full flex justify-center">
        <div className="bg-white w-full max-w-3xl border border-indigo-500 rounded-lg p-6 shadow-lg">
          {/* Title */}
          <Title setModal={setModal}>Supplier Details</Title>

          {/* Profile Section */}
          <div className="flex items-center gap-6 bg-white p-6 shadow-md rounded-lg">
            {/* Profile Picture */}
            <img
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
              src={profilePicture}
              alt="Profile"
            />

            {/* User Info */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800">
                {"guest"}
              </h2>
              <h4 className="text-sm text-gray-500">{"Supplier"}</h4>
            </div>
          </div>

          {/* User Details List */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Email:
              </span>
              <p className="text-gray-600">{"Guest@gmail.com"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">CNIC:</span>
              <p className="text-gray-600">{"CNIC 123243"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">Date:</span>
              <p className="text-gray-600">{"date....."}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Address:
              </span>
              <p className="text-gray-600">
                {"vpo jalhan district gujranwala"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
