"use client";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import Dashboard from "@/components/features/course/dashboard/dashboard";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserNav } from "@/components/user-nav";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">CPE 100</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="forms" >
                forms
              </TabsTrigger>
              <TabsTrigger value="outcome" >
                PO, PLO, CLO
              </TabsTrigger>
              <TabsTrigger value="assignment" >
                Assignments
              </TabsTrigger>
              <TabsTrigger value="student" >
                Students
              </TabsTrigger>
              <TabsTrigger value="setting" >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Dashboard/>
            </TabsContent>
            <TabsContent value="forms" className="space-y-4">
              this is forms sections
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default HomePage;
