export const TableInputField = () => {
  return (
    <div className="mb-2">
      <span className="text-gray-900 font-sans">Search: </span>
      <input
        type="text"
        placeholder="Search..."
        className="border placeholder-gray-500 border-gray-800 mt-1 p-[0.20rem] outline-none rounded "
      />
    </div>
  );
};
