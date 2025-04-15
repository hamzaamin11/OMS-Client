import React from "react";

type ButtonProps<T = void> = {
  label: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>, param?: T) => void;
  param?: T; // Optional parameter
  loading?: boolean;
};

export const AddButton = <T,>({
  label,
  handleClick,
  param,
  loading,
}: ButtonProps<T>) => {
  return (
    <div>
      <button
        disabled={loading}
        className="bg-indigo-600 text-white p-2 rounded hover:cursor-pointer hover:scale-105 duration-300"
        onClick={(e) => handleClick && handleClick(e, param)}
      >
        {label}
      </button>
    </div>
  );
};
