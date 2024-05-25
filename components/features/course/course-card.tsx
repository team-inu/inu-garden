'use client';

import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type CourseCardProps = {
  href: string;
  courseId: string;
  courseName: string;
  curriculum: string;
  lecturer: string;
  semester: string;
};

const CourseCard: React.FC<CourseCardProps> = (props) => {
  return (
    <Link href={`/course/${props.href}`}>
      <div className="h-50 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
        <Card className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70 ">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <div>
                <div className="font-bold">{props.courseId}</div>
                <CardDescription>
                  {props.courseName} ({props.curriculum})
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-row justify-between space-x-5  text-sm">
              <div>{props.lecturer}</div>
              <div>{props.semester}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default CourseCard;
