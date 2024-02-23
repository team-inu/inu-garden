const GradeHistory = () => {
  const grade = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
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
              <div className="w-12 rounded-l-lg  bg-primary p-3">{g}</div>
              <div className=" w-full items-end ">20</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeHistory;
