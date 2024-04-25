import CommentCourse from '@/components/features/course/stream-course/comment-course';
import CommentForm from '@/components/features/course/stream-course/comment-form';

const StreamCoures = () => {
  return (
    <div className="space-y-5">
      <h1 className="mb-5 text-2xl font-bold">Upstream - Downstream Course</h1>
      <div className="flex w-11/12 gap-5">
        {/* Left comment */}
        <div className="w-1/2">
          {' '}
          <CommentCourse />
        </div>
        {/* Right form */}
        <div className="w-1/2">
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default StreamCoures;
