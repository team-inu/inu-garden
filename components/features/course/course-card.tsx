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

const CourseCard = () => {
  return (
    <Link href="/course/1">
      <Card className="hover:opacity-70 transition-opacity ease-in-out duration-300 cursor-pointer ">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div>
              <div className="font-bold">CPE 100</div>
              <CardDescription>Fundamental of Programming in C</CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex space-x-5 px-5">
            <div className="flex items-center space-x-2">
              <PersonIcon />
              <div>Students: 40</div>
            </div>
            <div className="flex items-center space-x-2">
              <BackpackIcon />
              <div>Teachers: 2</div>
            </div>
            <div className="flex items-center space-x-2">
              <FileTextIcon />
              <div>Task: 2/10</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
