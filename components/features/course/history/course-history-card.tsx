'use client';

import { UserCircle } from 'lucide-react';

import CourseHistoryCardDetail from '@/components/features/course/history/course-history-card-detail';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { GetCourseList } from '@/types/schema/course-schema';

type CourseHistoryCardProps = {
  courseData: GetCourseList;
  isSee: boolean;
  handleIsSee: (id: string) => void;
};

const CourseHistoryCard: React.FC<CourseHistoryCardProps> = ({
  courseData,
  isSee,
  handleIsSee,
}) => {
  return (
    <Collapsible open={isSee}>
      <div className=" w-full border-2 border-l-4 border-l-primary p-3">
        <div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="space-x-3">
                <span className="text-xl font-bold">{courseData.code}</span>
                <span className="text-sm font-semibold">regular</span>
              </div>
              <Badge className="text-sm font-bold">
                {courseData.semester.semesterSequence}/
                {courseData.semester.year}
              </Badge>
            </div>
            <div className="text-gray-400 ">{courseData.name}</div>
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5 " />
              <div>
                {courseData.user.firstName} {courseData.user.lastName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <div className="font-semibold">
              Academic year: <span>-</span>
            </div>
            <div className="font-semibold">
              Graduate year: <span>-</span>
            </div>
          </div>
          <div className="space-x-5">
            <CollapsibleTrigger asChild>
              <Button
                size={'sm'}
                variant={'ghost'}
                onClick={() => handleIsSee(courseData.id)}
              >
                See more
              </Button>
            </CollapsibleTrigger>
            <Button size={'sm'}>Import this course</Button>
          </div>
        </div>
      </div>
      <CourseHistoryCardDetail
        courseId={courseData.id}
        courseDescription={courseData.description}
        criteriaGradeA={courseData.criteriaGradeA}
        criteriaGradeBP={courseData.criteriaGradeBP}
        criteriaGradeB={courseData.criteriaGradeB}
        criteriaGradeCP={courseData.criteriaGradeCP}
        criteriaGradeC={courseData.criteriaGradeC}
        criteriaGradeDP={courseData.criteriaGradeDP}
        criteriaGradeD={courseData.criteriaGradeD}
        criteriaGradeF={courseData.criteriaGradeF}
      />
    </Collapsible>
  );
};

export default CourseHistoryCard;
