"use client";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import Dashboard from "@/components/features/course/dashboard/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentDataTable } from "@/components/features/course/student/student-table";
import { columns } from "@/components/features/course/student/student-column";
import { z } from "zod";

const HomePage = () => {

   const taskSchema = z.object({
    id: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    score: z.number(),
  })

  type Task = z.infer<typeof taskSchema>
  
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
            <TabsContent value="student" className="space-y-4">
              <StudentDataTable columns={columns} data={[
                {
                  id: "1",
                  firstName: "John",
                  lastName: "eiei",
                  email: "a",
                  name: "a",
                  label: "passed",
                },
                {
                  id: "2",
                  firstName: "Por",
                  lastName: "Doe",
                  email: "a",
                  name: "a",
                  label: "passed",
                },
                {
                  id: "3",
                  firstName: "Annt",
                  lastName: "Doe",
                  email: "a",
                  name: "a",
                  label: "failed",
                },
              ]} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
