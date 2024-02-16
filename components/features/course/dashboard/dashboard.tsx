import { TimerIcon } from '@radix-ui/react-icons';
import { FolderIcon, UserIcon } from 'lucide-react';
import React from 'react';

import BadStudent from '@/components/bad-student';
import { Overview } from '@/components/overview';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex text-sm font-medium">
              Latest Assigment
            </CardTitle>
            <TimerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Latest Assigment */}
            <div className="flex items-center text-2xl font-bold">
              Lomuto
              <Badge variant="green" className="ml-2">
                New
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">due date 12/12/2021</p>
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
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              including A and B sections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">assessing 3 clos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              CLO 1 Percentage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63%</div>
            <p className="text-xs text-muted-foreground">
              3 out of 5 students passed
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Grade Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Bad Student</CardTitle>
            <CardDescription>
              The group of students who has the chance to fail this course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BadStudent
              data={[
                {
                  studentId: '6307050XXXX',
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'jhon@mail.com',
                  fails: 3,
                },
                {
                  studentId: '6307050XXXX',
                  firstName: 'Annie',
                  lastName: 'Doe',
                  email: 'no@mail.com',
                  fails: 2,
                },
                {
                  studentId: '6307050XXXX',
                  firstName: 'Por',
                  lastName: 'Ping',
                  email: 'no@mail.com',
                  fails: 1,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
