import { useParams } from 'next/navigation';

import CommentCard from '@/components/features/course/stream-course/comment-card';
import { useGetTargetCourseStreamByCourseId } from '@/hooks/course-stream-hook';

const CommentCourse = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseStreams } = useGetTargetCourseStreamByCourseId(courseId);

  return (
    <div className="space-y-5 p-5 ">
      <div className="text-lg font-semibold">Comments form others course</div>
      <div className="h-[500px] overflow-y-auto scrollbar scrollbar-thumb-primary ">
        <div className="space-y-6 rounded-md bg-black p-5 py-0">
          {courseStreams?.map((e, i) => {
            return <CommentCard key={i} comment={e.comment} streamType={e.streamType} courseId={e.targetCourseId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentCourse;
