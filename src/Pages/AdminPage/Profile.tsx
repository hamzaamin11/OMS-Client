import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import profileImage from "../../assets/Avatar.png";
import { useAppSelector } from "../../redux/Hooks";

export const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.officeState);
  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Profile" activeFile="View Profile" />
      <div className="h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white ">
        <div className="flex text-gray-800 items-center justify-between  m-2">
          <div className="w-full flex justify-center">
            <div className="bg-white w-full max-w-3xl border border-indigo-500 rounded-lg p-6 shadow-lg mt-12">
              {/* Title */}
              {/* <Title setModal={setIsOpenModal}>User Details</Title> */}

              {/* Profile Section */}
              <div className="flex items-center gap-6 bg-white p-6 shadow-md rounded-lg">
                {/* Profile Picture */}
                <img
                  className="w-24 h-24 rounded-full border-4 border-indigo-500 bg-indigo-500 object-cover"
                  src={profileImage}
                  alt="Profile"
                />

                {/* User Info */}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {currentUser?.name ?? "Guest"}
                  </h2>
                  <h4 className="text-sm text-gray-500">
                    {currentUser?.role ?? "Role"}
                  </h4>
                </div>
              </div>

              {/* User Details List */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-semibold text-gray-800">
                    Email:
                  </span>
                  <p className="text-gray-600">
                    {currentUser?.email ?? "guest@gmail.com"}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-semibold text-gray-800">
                    CNIC #:
                  </span>
                  <p className="text-gray-600">
                    {currentUser?.cnic ?? "0000-0000000-0"}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-semibold text-gray-800">
                    Contact No:
                  </span>
                  <p className="text-gray-600">
                    {currentUser?.contact ?? "00000000000"}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-semibold text-gray-800">
                    Address:
                  </span>
                  <p className="text-gray-600">
                    {currentUser?.address ??
                      "Jalhan tehsil nowshera virkan district gujranwala..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
