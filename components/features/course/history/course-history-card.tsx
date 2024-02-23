'use client';

import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { UserCircle } from 'lucide-react';

import CourseHistoryCardDetail from '@/components/features/course/history/course-history-card-detail';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';

type CourseHistoryCardProps = {
  courseId: string;
  courseName: string;
  isSee: boolean;
  handleIsSee: (id: string) => void;
};

const CourseHistoryCard: React.FC<CourseHistoryCardProps> = ({
  courseId,
  courseName,
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
                <span className="text-xl font-bold">{courseId}</span>
                <span className="text-sm font-semibold">regular</span>
              </div>
              <Badge className="text-sm font-bold">2/2023</Badge>
            </div>
            <div className="text-gray-400 ">{courseName}</div>
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5 " />
              <div>Dr. John Doe</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <div className="font-semibold">
              Academic year: <span>2021</span>
            </div>
            <div className="font-semibold">
              Graduate year: <span>2023</span>
            </div>
          </div>
          <div className="space-x-5">
            <CollapsibleTrigger asChild>
              <Button
                size={'sm'}
                variant={'ghost'}
                onClick={() => handleIsSee(courseId)}
              >
                See more
              </Button>
            </CollapsibleTrigger>
            <Button size={'sm'}>Import this course</Button>
          </div>
        </div>
      </div>
      <CourseHistoryCardDetail courseId={courseId} />
    </Collapsible>
  );
};

export default CourseHistoryCard;
