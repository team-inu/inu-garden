import { useGetCourseById } from '@/hooks/course-hook';

type CommentCardProps = {
  comment: string;
  courseId: string;
  streamType: string;
};

const CommentCard = ({ comment, courseId, streamType }: CommentCardProps) => {
  const { data: course } = useGetCourseById(courseId);

  return (
    <div className="rounded-md border-2 border-primary-foreground bg-secondary p-3">
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-primary"></div>
        <div className="flex w-full  justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">
              {course?.code}: {course?.name}
            </div>
            <div className="text-md text-secondary-foreground">
              Lecturer: {course?.user.firstName} {course?.user.lastName}
            </div>
          </div>
          <div className="text-sm text-secondary-foreground">{streamType}</div>
        </div>
      </div>
      <div className="mt-3">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
