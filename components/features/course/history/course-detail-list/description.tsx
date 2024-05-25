type CourseDescriptionProps = {
  courseDescription: string;
};

const CourseDescription: React.FC<CourseDescriptionProps> = ({ courseDescription }) => {
  return (
    <div className="space-y-3">
      <div className="text-lg font-bold">Course introduction and description</div>
      <div className="rounded-lg bg-secondary p-3">{courseDescription}</div>
    </div>
  );
};

export default CourseDescription;
