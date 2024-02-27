'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Assignment from '@/components/features/course/assignment/assignment';
import Dashboard from '@/components/features/course/dashboard/dashboard';
import Enrollment from '@/components/features/course/enrollment/enrollment';
import CourseLearningOutcome from '@/components/features/course/outcome/clo';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-api';
import { useGetCourseById } from '@/hooks/course-hook';

const HomePage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData } = useGetCourseById(courseId);
  const handleCourseExport = async () => {
    // exportToWord(coursePortfolio);
  };

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="text-3xl font-bold tracking-tight">
            {courseData?.code} - {courseData?.name}
          </div>
          <div className="text-xl font-bold tracking-tight">
            {courseData?.curriculum}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="outcome">
                  Course Learning Outcome
                </TabsTrigger>
                <TabsTrigger value="assignment">Assignments</TabsTrigger>
                <TabsTrigger value="enrollment">Enrollments</TabsTrigger>
              </TabsList>
              <div className="space-x-3">
                <Link href="/course/1/portfolio">
                  <Button>Course Portfolio</Button>
                </Link>
                <Link href="/course/1/setting">
                  <Button variant="secondary">Course Setting</Button>
                </Link>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <Dashboard />
            </TabsContent>
            <TabsContent value="outcome" className="space-y-4">
              <CourseLearningOutcome />
            </TabsContent>
            <TabsContent value="assignment" className="space-y-4">
              <Assignment />
            </TabsContent>
            <TabsContent value="enrollment" className="space-y-4">
              <Enrollment />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
