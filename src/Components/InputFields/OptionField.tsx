type option = {
  label: string;
  value: string;
};

type OptionFieldProps = {
  labelName: string;
  handlerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  Value: string;
  optionData: option[];
};
export const OptionField = ({
  labelName,
  handlerChange,
  name,
  Value,
  optionData,
}: OptionFieldProps) => {
  return (
    <div className=" flex flex-col  mt-3">
      <label className=" text-gray-900 text-xs font-semibold">
        {labelName}
      </label>
      <select
        value={Value}
        onChange={handlerChange}
        name={name}
        className="p-1 rounded bg-white text-gray-800  border border-gray-300 focus:outline-indigo-500"
      >
        {optionData.map((options, index) => (
          <option value={options.value} key={index}>
            {options.label}
          </option>
        ))}
      </select>
    </div>
  );
};
