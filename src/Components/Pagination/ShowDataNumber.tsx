interface ShowDataNumberProps {
  start?: number;
  end?: number;
  total?: number;
}

export const ShowDataNumber: React.FC<ShowDataNumberProps> = ({
  start = "1",
  end = "10",
  total = "7",
}) => {
  return (
    <div className=" text-gray-800">
      Showing {start} to {end} of {total} entries
    </div>
  );
};
