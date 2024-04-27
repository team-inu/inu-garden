import CommentCourse from '@/components/features/course/stream-course/comment-course';
import CommentForm from '@/components/features/course/stream-course/comment-form';
import CommentHistory from '@/components/features/course/stream-course/comment-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import '@/components/ui/tabs-api';

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
        <div className="w-1/2 space-y-3">
          <div className="text-lg font-semibold">Comment Form</div>
          <Tabs defaultValue="form" className="space-y-4">
            <TabsList>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <CommentForm />
            </TabsContent>
            <TabsContent value="history">
              <CommentHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StreamCoures;
