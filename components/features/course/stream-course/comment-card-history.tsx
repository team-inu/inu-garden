import { Trash2Icon } from 'lucide-react';

import { useGetCourseById } from '@/hooks/course-hook';

type CommentCardProps = {
  comment: string;
  courseId: string;
  courseStreamId: string;
  streamType: string;
  onDelete: (id: string) => void;
};

const CommentCardHistory = ({ comment, courseId, courseStreamId, streamType, onDelete }: CommentCardProps) => {
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
        <Trash2Icon onClick={() => onDelete(courseStreamId)} className="h-6 w-6 cursor-pointer hover:text-red-500" />
      </div>
      <div className="mt-3">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default CommentCardHistory;
