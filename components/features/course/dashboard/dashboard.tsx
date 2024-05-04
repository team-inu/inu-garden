import { FolderIcon, UserIcon } from 'lucide-react';

import GradeDistribution from '@/components/bad-student';
import Overview from '@/components/overview';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GetCourseList } from '@/types/schema/course-schema';

type DashboardProps = {
  courseData: GetCourseList;
  scoreFrequency: {
    score: number;
    frequency: number;
  }[];
  studentAmount: string;
  grade: number;
  gradeFrequency: {
    name: string;
    gradeScore: number;
    frequency: number;
  }[];
};

export default function Dashboard({
  courseData,
  scoreFrequency,
  studentAmount,
  grade,
  gradeFrequency,
}: DashboardProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex text-sm font-medium">Lecturer</CardTitle>
            <Badge variant="green" className="ml-2">
              {courseData?.user.role ?? '-'}
            </Badge>
          </CardHeader>
          <CardContent>
            {/* Latest Assigment */}
            <div className="flex items-center  font-bold">
              {courseData?.user.firstName ?? ''}{' '}
              {courseData?.user.lastName ?? ''}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Students
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold"> {studentAmount ?? '-'} </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total grade</CardTitle>
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              GPA: {grade.toFixed(2) ?? '-'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expected Passing CLO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {courseData.expectedPassingCloPercentage ?? '-'}%
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Grade Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={scoreFrequency} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Score distribution of students</CardDescription>
          </CardHeader>
          <CardContent>
            <GradeDistribution data={gradeFrequency} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
