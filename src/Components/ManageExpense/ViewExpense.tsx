import { Title } from "../Title";

type allExpenseT = {
  expenseName: string;
  expenseCategoryId: number;
  categoryName: string;
  addedBy: string;
  date: string;
  expenseStatus: string;
  amount: number | string;
};

type CustomerDetailProps = {
  setIsOpenModal: () => void;
  viewExpense: allExpenseT | null;
};
export const ViewExpense = ({
  setIsOpenModal,
  viewExpense,
}: CustomerDetailProps) => {
  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-10">
      <div className="w-full flex justify-center">
        <div className="bg-white w-full max-w-3xl border border-indigo-500 rounded-lg p-6 shadow-lg">
          {/* Title */}
          <Title setModal={setIsOpenModal}>Expense Detail</Title>

          {/* User Details List */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Category Name:
              </span>
              <p className="text-gray-600">{viewExpense?.categoryName}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Expense Name:
              </span>
              <p className="text-gray-600">{viewExpense?.expenseName}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Amount:
              </span>
              <p className="text-gray-600">{viewExpense?.amount}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                Added By:
              </span>
              <p className="text-gray-600">{viewExpense?.addedBy}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">Date:</span>
              <p className="text-gray-600">{viewExpense?.date.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
