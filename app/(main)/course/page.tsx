"use client";
import CourseCard from "@/components/features/course/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const CoursePage = () => {
  return (
    <div className="container py-8">
      <div>
        <h1 className="text-4xl font-bold mb-5">Course</h1>
      </div>
      <div className="mb-16 flex items-center justify-between w-full  ">
        <Input
          type="search"
          placeholder="Search..."
          className="dark:bg-input w-10/12"
        />
        <Link href="/course/create" className="w-2/12 flex justify-end">
          <Button
            variant={"default"}
            className="text-base font-bold  min-w-max"
            size={"lg"}
          >
            Add course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default CoursePage;
