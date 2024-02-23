import CourseLearningOutcomeHistory from '@/components/features/course/history/course-detail-list/course-learning-outcome';
import CourseDescription from '@/components/features/course/history/course-detail-list/description';
import GradeHistory from '@/components/features/course/history/course-detail-list/grade';
import { CollapsibleContent } from '@/components/ui/collapsible';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-api';

type CourseHistoryCardDetailProps = {
  courseId: string;
};

const CourseHistoryCardDetail: React.FC<CourseHistoryCardDetailProps> = ({
  courseId,
}) => {
  return (
    <CollapsibleContent className="border-b-2 border-b-primary p-3">
      <div>
        <Tabs defaultValue={`info${courseId}`}>
          <TabsList>
            <TabsTrigger value={`info${courseId}`}>Information</TabsTrigger>
            <TabsTrigger value={`clo${courseId}`}>
              Course learning outcome
            </TabsTrigger>
            <TabsTrigger value={`grade${courseId}`}>Grade</TabsTrigger>
          </TabsList>
          <TabsContent value={`info${courseId}`}>
            <CourseDescription />
          </TabsContent>
          <TabsContent value={`clo${courseId}`}>
            <CourseLearningOutcomeHistory />
          </TabsContent>
          <TabsContent value={`grade${courseId}`}>
            <GradeHistory />
          </TabsContent>
        </Tabs>
      </div>
    </CollapsibleContent>
  );
};

export default CourseHistoryCardDetail;
