type InformationProps = {
  label: string;
  value: string;
};

const Information: React.FC<InformationProps> = ({ label, value }) => {
  return (
    <div className="flex space-x-2">
      <h1 className="">{label}: </h1>
      <span className="text-zinc-400">{value}</span>
    </div>
  );
};

export default Information;
