import CourseDescription from '@/components/features/course/history/course-detail-list/description';
import GradeHistory from '@/components/features/course/history/course-detail-list/grade';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-api';

type CourseHistoryCardDetailProps = {
  courseId: string;
  courseDescription: string;
  criteriaGradeA: number;
  criteriaGradeBP: number;
  criteriaGradeB: number;
  criteriaGradeCP: number;
  criteriaGradeC: number;
  criteriaGradeDP: number;
  criteriaGradeD: number;
  criteriaGradeF: number;
};

const CourseHistoryCardDetail: React.FC<CourseHistoryCardDetailProps> = ({
  courseId,
  courseDescription,
  criteriaGradeA,
  criteriaGradeBP,
  criteriaGradeB,
  criteriaGradeCP,
  criteriaGradeC,
  criteriaGradeDP,
  criteriaGradeD,
  criteriaGradeF,
}) => {
  return (
    <CollapsibleContent className="border-b-2 border-b-primary p-3">
      <div>
        <Tabs defaultValue={`info${courseId}`}>
          <TabsList>
            <TabsTrigger value={`info${courseId}`}>Information</TabsTrigger>
            <TabsTrigger value={`grade${courseId}`}>Grade</TabsTrigger>
          </TabsList>
          <TabsContent value={`info${courseId}`}>
            <CourseDescription courseDescription={courseDescription} />
          </TabsContent>
          <TabsContent value={`grade${courseId}`}>
            <GradeHistory
              criteriaGradeA={criteriaGradeA}
              criteriaGradeBP={criteriaGradeBP}
              criteriaGradeB={criteriaGradeB}
              criteriaGradeCP={criteriaGradeCP}
              criteriaGradeC={criteriaGradeC}
              criteriaGradeDP={criteriaGradeDP}
              criteriaGradeD={criteriaGradeD}
              criteriaGradeF={criteriaGradeF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </CollapsibleContent>
  );
};

export default CourseHistoryCardDetail;
