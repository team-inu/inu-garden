import { useParams } from 'next/navigation';

import CommentCardHistory from '@/components/features/course/stream-course/comment-card-history';
import { useDeleteCourseStreamComment, useGetHistoryCourseStreamByCourseId } from '@/hooks/course-stream-hook';

const CommentHistory = () => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data: historyCourseStreams } = useGetHistoryCourseStreamByCourseId(courseId);

  const { mutate: deleteCourseStream } = useDeleteCourseStreamComment();

  const onDelete = (id: string) => {
    deleteCourseStream(id);
  };
  return (
    <div className="space-y-5 p-5 ">
      <div className="text-lg font-semibold">History</div>
      <div className="h-[500px] overflow-y-auto scrollbar scrollbar-thumb-primary ">
        <div className="space-y-6 rounded-md bg-secondary/20 p-5 py-0">
          {historyCourseStreams ? (
            historyCourseStreams?.map((e, i) => {
              return (
                <CommentCardHistory
                  key={i}
                  comment={e.comment}
                  streamType={e.streamType}
                  courseId={e.targetCourseId}
                  courseStreamId={e.id}
                  onDelete={onDelete}
                />
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold">No comments yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentHistory;
