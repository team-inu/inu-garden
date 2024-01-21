type InformationProps = {
  lable: string;
  value: string;
};

const Information: React.FC<InformationProps> = ({ lable, value }) => {
  return (
    <div className="flex space-x-2">
      <h1 className="">{lable}: </h1>
      <span className="text-zinc-400">{value}</span>
    </div>
  );
};

export default Information;
