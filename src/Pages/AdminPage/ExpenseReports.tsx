import { useState } from "react";
import { TableTitle } from "../../Components/TableLayoutComponents/TableTitle";
import { TableInputField } from "../../Components/TableLayoutComponents/TableInputField";
import { ShowDataNumber } from "../../Components/Pagination/ShowDataNumber";
import { Pagination } from "../../Components/Pagination/Pagination";
import { InputField } from "../../Components/InputFields/InputField";

const itemsPerPageOptions = [10, 25, 50];

export const ExpenseReports = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // ISO formatted date

  const initialState = {
    startDate: currentDate,
    endDate: currentDate,
    selectCustomer: "",
  };

  const [reportData, setReportData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const printDiv = () => {
    const printStyles = `
      @page { size: A4 portrait; }
      body { font-family: Arial, sans-serif; font-size: 11pt; color: #000; }
      .print-container { width: 100%; padding: 0; }
      .print-header { text-align: center; }
      .print-header h1 { font-size: 25pt; font-weight: bold; }
      .print-header h2 { font-size: 20pt; font-weight: normal; }
      .date-range { text-align: left; font-size: 14pt; display: flex; justify-content: space-between; }
      table { width: 100%; border-collapse: collapse; border: 2px solid #000; }
      thead { background-color: #ccc; color: #000; }
      thead th, tbody td { border: 2px solid #000; font-size: 10pt; text-align: left; }
      tbody tr:nth-child(even) { background-color: #f9f9f9; }
      .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10pt; padding: 10px 0; border-top: 1px solid #ccc; }
      @media print { .no-print { display: none; } }
    `;

    const content = document.getElementById("myDiv")?.outerHTML || "";

    document.body.innerHTML = `
      <div class="print-container">
        <div class="print-header">
          <h1>Office Management System</h1>
          <h2>Sales Report</h2>
        </div>
        <div class="date-range">
          <strong>From: ${reportData.startDate}</strong>
          <strong>To: ${reportData.endDate}</strong>
        </div>
        ${content}
        <div class="footer"></div>
      </div>
    `;

    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(printStyles));
    document.head.appendChild(style);

    window.print();
    location.reload(); // restore full pag
  };

  return (
    <div className="w-full mx-2">
      <TableTitle tileName="Expense Report" activeFile="Expense Report" />

      {/* Top Controls */}
      <div className="flex items-center justify-between text-gray-800 py-2 mx-2">
        <div>
          <span>Show</span>
          <span className="bg-gray-200 rounded mx-1 p-1">
            <select>
              {itemsPerPageOptions.map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </span>
          <span>entries</span>
        </div>
        <TableInputField />
      </div>

      {/* Report Filters */}
      <div className="max-h-full shadow-lg border-t-2 rounded border-indigo-500 bg-white">
        <div className="flex items-center justify-between text-gray-800 mx-2">
          <div className="flex flex-1 px-6 py-2 gap-2 items-center justify-between">
            <InputField
              labelName="From"
              type="date"
              inputVal={reportData.startDate}
              handlerChange={handleChange}
              name="startDate"
            />
            <InputField
              labelName="To"
              type="date"
              inputVal={reportData.endDate}
              handlerChange={handleChange}
              name="endDate"
            />
            <InputField labelName="Expense Category" />
            <div className="mt-6">
              <button className="bg-indigo-500 text-white py-1 px-6 rounded hover:cursor-pointer hover:scale-105 duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Selected Date Range Display */}
        <div className="text-gray-800 flex items-center justify-end mx-7 py-2 font-semibold">
          <span className="mr-1">From</span>
          <span className="text-red-500 mr-1">{reportData.startDate}</span>
          <span className="mr-1">To</span>
          <span className="text-red-500">{reportData.endDate}</span>
        </div>

        {/* Report Table */}
        <div
          id="myDiv"
          className="w-full max-h-[28.6rem] overflow-hidden mx-auto"
        >
          <div className="grid grid-cols-5 bg-gray-200 text-gray-900 font-semibold rounded-t-lg border border-gray-500">
            <span className="p-2 min-w-[50px]">Sr#</span>
            <span className="p-2 text-left min-w-[150px]">
              Expense Category
            </span>
            <span className="p-2 text-left min-w-[150px]">Expense Name</span>
            <span className="p-2 text-left min-w-[150px]">Expense Amount</span>
            <span className="p-2 text-left min-w-[150px]">Expense Date</span>
          </div>
          <div className="grid grid-cols-5 border border-gray-600 text-gray-800 hover:bg-gray-100 transition duration-200">
            <span className="p-2 text-left">1</span>
            <span className="p-2 text-left">Hamza</span>
            <span className="p-2 text-left">Jamat Project</span>
            <span className="p-2 text-left">2025-04-28</span>
            <span className="p-2 text-left">2025-04-28</span>
          </div>
        </div>
      </div>

      {/* Pagination and Footer */}
      <div className="flex items-center justify-between">
        <ShowDataNumber start={1} total={10} end={10} />
        <Pagination />
      </div>

      {/* Download Button */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={printDiv}
          className="bg-green-500 text-white py-2 px-4 rounded font-semibold hover:cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
};
