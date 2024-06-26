'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Assignment from '@/components/features/course/assignment/assignment';
import Dashboard from '@/components/features/course/dashboard/dashboard';
import Enrollment from '@/components/features/course/enrollment/enrollment';
import CourseLearningOutcome from '@/components/features/course/outcome/clo';
import StreamCoures from '@/components/features/course/stream-course/stream-coures';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-api';
import { useGetCourseById } from '@/hooks/course-hook';
import { useGetCoursePortfolio } from '@/hooks/course-portfolio-hook';

const HomePage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData } = useGetCourseById(courseId);
  const handleCourseExport = async () => {
    // exportToWord(coursePortfolio);
  };
  const { data, isLoading } = useGetCoursePortfolio(courseId);

  if (!courseData || !data) return <Loading />;

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="text-3xl font-bold tracking-tight">
            {courseData?.code} - {courseData?.name}
          </div>
          <div className="text-xl font-bold tracking-tight">{courseData?.curriculum}</div>

          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="enrollment">Enrollments</TabsTrigger>
                <TabsTrigger value="outcome">Course Learning Outcome</TabsTrigger>
                <TabsTrigger value="assignment">Assessments</TabsTrigger>
                <TabsTrigger value="stream">Up / Down Stream Course</TabsTrigger>
              </TabsList>
              <div className="space-x-3">
                <Link href={`/course/${courseId}/portfolio`}>
                  <Button>Course Portfolio</Button>
                </Link>
                <Link href={`/course/${courseId}/setting`}>
                  <Button variant="secondary">Course Setting</Button>
                </Link>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <Dashboard
                courseData={courseData}
                scoreFrequency={data.result.gradeDistribution.scoreFrequencies}
                grade={data.result.gradeDistribution.GPA}
                studentAmount={data.result.gradeDistribution.studentAmount}
                gradeFrequency={data.result.gradeDistribution.gradeFrequencies}
              />
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
            <TabsContent value="stream" className="space-y-4">
              {/* TODO: Typo */}
              <StreamCoures />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
