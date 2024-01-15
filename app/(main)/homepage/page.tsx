"use client";

import Dashboard from "@/components/features/course/dashboard/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Student from "@/components/features/course/student/student";
import Assignment from "@/components/features/course/assignment/assignment";

const HomePage = () => {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">CPE 100</h2>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="forms">forms</TabsTrigger>
              <TabsTrigger value="outcome">PO, PLO, CLO</TabsTrigger>
              <TabsTrigger value="assignment">Assignments</TabsTrigger>
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="setting">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Dashboard />
            </TabsContent>
            <TabsContent value="forms" className="space-y-4">
              this is forms sections
            </TabsContent>
            <TabsContent value="assignment" className="space-y-4">
              <Assignment />
            </TabsContent>
            <TabsContent value="student" className="space-y-4">
              <Student />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
