"use client";
import CourseCard, { CourseCardProps } from "@/components/features/course/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from 'react';

const courseCardProps: CourseCardProps[] = [
  {
    courseId: 'cpe100',
    courseName: 'Fundamental of Programming in C',
    href: '/course/1',
    studentAmount: 49,
    teacherAmount: 2,
    finishedTask: 3,
    totalTask: 55,
  },
  {
    courseId: 'cpe101',
    courseName: 'Intro into com eng',
    href: '/course/2',
    studentAmount: 111,
    teacherAmount: 4,
    finishedTask: 12,
    totalTask: 33,
  },
]

const CoursePage = () => {
  const [searchValue, setSearchValue] = useState('')

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
          onChange={(e) => setSearchValue(e.target.value)}
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
        {courseCardProps
          .filter(e => {
            const lowerCaseSearchValue = searchValue.toLocaleLowerCase()

            const lowerCaseCourseName = e.courseName.toLowerCase()
            const lowerCaseCourseId = e.courseId.toLowerCase()

            return lowerCaseCourseName.includes(lowerCaseSearchValue) || lowerCaseCourseId.includes(lowerCaseSearchValue)
          })
          .map((e, i) => {
            return <CourseCard
              key={i}
              courseId={e.courseId}
              courseName={e.courseName}
              href={e.href}
              studentAmount={e.studentAmount}
              finishedTask={e.finishedTask}
              totalTask={e.totalTask}
              teacherAmount={e.teacherAmount}
            />
          })}
      </div>
    </div>
  );
};

export default CoursePage;
