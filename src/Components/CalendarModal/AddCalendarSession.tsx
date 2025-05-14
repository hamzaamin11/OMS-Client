import React, { useState } from "react";
import { AddButton } from "../CustomButtons/AddButton";
import { CancelBtn } from "../CustomButtons/CancelBtn";
import { Title } from "../Title";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { BASE_URL } from "../../Content/URL";
import { useAppSelector } from "../../redux/Hooks";

type AddAttendanceProps = {
  setModal: () => void;
};

// Initial state with Date object
const initialState = {
  startingMonth: new Date(), // Default to current date
};

export const AddCalendarSession = ({ setModal }: AddAttendanceProps) => {
  const { currentUser } = useAppSelector((state) => state.officeState);
  const token = currentUser?.token;

  const [addCalendar, setAddCalendar] = useState<{
    startingMonth: Date | null;
  }>(initialState);

  // This handler is now for DatePicker only
  const handlerChange = (e: {
    target: { name: string; value: Date | null };
  }) => {
    const { name, value } = e.target;
    setAddCalendar((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...addCalendar,
        // Send only year-month string like '2025-05'
        startingMonth: addCalendar.startingMonth
          ? addCalendar.startingMonth.toISOString().slice(0, 7)
          : null,
      };

      console.log(formattedData, "date");
      const res = await axios.post(
        `${BASE_URL}/admin/addCalendarSession`,
        formattedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-10">
        <div className="w-[42rem] max-h-[29rem] bg-white mx-auto rounded-xl border border-indigo-500">
          <form onSubmit={handlerSubmitted}>
            <Title setModal={() => setModal()}>Add Calendar</Title>
            <div className="mx-2 flex-wrap gap-3 flex flex-col justify-center">
              <label className="block text-gray-900 text-xs font-semibold">
                Starting Month*
              </label>
              <DatePicker
                selected={addCalendar?.startingMonth}
                onChange={(date: Date | null) =>
                  handlerChange({
                    target: { name: "startingMonth", value: date },
                  })
                }
                dateFormat="yyyy-MM"
                showMonthYearPicker
                className="border px-3 py-2 rounded-md w-full text-gray-800"
              />
            </div>
            <div className="flex items-center justify-center m-2 gap-2 text-xs">
              <CancelBtn setModal={() => setModal()} />
              <AddButton label={"Save Calendar"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
