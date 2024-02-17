'use client';

import Link from 'next/link';

import Assignment from '@/components/features/course/assignment/assignment';
import Dashboard from '@/components/features/course/dashboard/dashboard';
import CourseSetting from '@/components/features/course/settings/course-setting';
import Student from '@/components/features/course/student/student';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-api';
import { CreateCoursePortfolioSchemaType } from '@/types/schema/course-portfolio-schema';
import CourseLearningOutcome from '@/components/features/course/outcome/clo';

const HomePage = () => {
  const handleCourseExport = async () => {
    // exportToWord(coursePortfolio);
  };

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">CPE 100</h2>
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="outcome">PO, PLO, CLO</TabsTrigger>
                <TabsTrigger value="assignment">Assignments</TabsTrigger>
                <TabsTrigger value="student">Students</TabsTrigger>
                <TabsTrigger value="setting">Settings</TabsTrigger>
              </TabsList>
              <Link href="/course/1/portfolio">
                <Button>Course Portfolio</Button>
              </Link>
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
            <TabsContent value="student" className="space-y-4">
              <Student />
            </TabsContent>
            <TabsContent value="setting" className="space-y-4">
              <CourseSetting />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
