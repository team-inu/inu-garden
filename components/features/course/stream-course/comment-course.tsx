import CommentCard from '@/components/features/course/stream-course/comment-card';

const CommentCourse = () => {
  return (
    <div className="space-y-5 p-5 ">
      <div className="text-lg font-semibold">Comments form others course</div>
      <div className="scrollbar scrollbar-thumb-primary h-[500px] overflow-y-auto ">
        <div className="space-y-6 rounded-md bg-black p-5 py-0">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
};

export default CommentCourse;
