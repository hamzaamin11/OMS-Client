type option = {
  id: number;
  label: string | number;
  value: string | number;
};

type OptionFieldProps = {
  labelName: string;
  handlerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  value: string;
  optionData: option[] | undefined;
  inital: string;
};

export const OptionField = ({
  labelName,
  handlerChange,
  name,
  value,
  optionData,
  inital,
}: OptionFieldProps) => {
  return (
    <div className=" flex flex-col  mt-3">
      <label className=" text-gray-900 text-xs font-semibold">
        {labelName}
      </label>
      <select
        value={value}
        onChange={handlerChange}
        name={name}
        className="p-1 py-2 rounded bg-white text-gray-800  border border-gray-300 focus:outline-indigo-500"
      >
        <option value={""}>{inital}</option>
        {optionData?.map((options, index) => (
          <option value={options.value} key={index}>
            {options.label}
          </option>
        ))}
      </select>
    </div>
  );
};
