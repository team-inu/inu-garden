"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackpackIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export type CourseCardProps = {
  href: string,
  courseId: string,
  courseName: string,
  studentAmount: number,
  teacherAmount: number,
  finishedTask: number,
  totalTask: number,
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  return (
    <Link href={props.href}>
      <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
        <Card className="hover:opacity-70 transition-opacity ease-in-out duration-300 cursor-pointer ">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <div>
                <div className="font-bold">{props.courseId}</div>
                <CardDescription>
                  {props.courseName}
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="flex space-x-5 px-5 text-sm">
              <div className="flex items-center space-x-2">
                <PersonIcon />
                <div>Students: {props.studentAmount}</div>
              </div>
              <div className="flex items-center space-x-2">
                <BackpackIcon />
                <div>Teachers: {props.teacherAmount}</div>
              </div>
              <div className="flex items-center space-x-2">
                <FileTextIcon />
                <div>Task: {props.finishedTask}/{props.totalTask}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default CourseCard;
