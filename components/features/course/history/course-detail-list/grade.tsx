type GradeHistoryProps = {
  criteriaGradeA: number;
  criteriaGradeBP: number;
  criteriaGradeB: number;
  criteriaGradeCP: number;
  criteriaGradeC: number;
  criteriaGradeDP: number;
  criteriaGradeD: number;
  criteriaGradeF: number;
};

const GradeHistory: React.FC<GradeHistoryProps> = ({
  criteriaGradeA,
  criteriaGradeBP,
  criteriaGradeB,
  criteriaGradeCP,
  criteriaGradeC,
  criteriaGradeDP,
  criteriaGradeD,
  criteriaGradeF,
}) => {
  const grade = [
    {
      name: 'A',
      value: criteriaGradeA,
    },
    {
      name: 'BP',
      value: criteriaGradeBP,
    },
    {
      name: 'B',
      value: criteriaGradeB,
    },
    {
      name: 'CP',
      value: criteriaGradeCP,
    },
    {
      name: 'C',
      value: criteriaGradeC,
    },
    {
      name: 'DP',
      value: criteriaGradeDP,
    },
    {
      name: 'D',
      value: criteriaGradeD,
    },
    {
      name: 'F',
      value: criteriaGradeF,
    },
  ];
  return (
    <div className="space-y-3">
      <div className="text-lg font-bold">Grade</div>
      <div className="rounded-lg  p-3">
        <div className="inline-grid w-full grid-cols-8 gap-3">
          {grade.map((g, i) => (
            <div
              key={i}
              className=" inline-flex items-center space-x-2 border border-l-0"
            >
              <div className="w-12 rounded-l-lg  bg-primary p-3">{g.name}</div>
              <div className=" w-full items-end ">{g.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeHistory;
