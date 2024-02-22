'use client';

import Link from 'next/link';
import { useState } from 'react';

import CourseCard, {
  CourseCardProps,
} from '@/components/features/course/course-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
];

const CoursePage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="container py-8">
      <div>
        <h1 className="mb-5 text-4xl font-bold">Course</h1>
      </div>
      <div className="mb-16 flex w-full items-center justify-between  ">
        <div className="flex w-10/12">
          <Input
            type="search"
            placeholder="Search..."
            className="w-10/12 "
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select a year"
                  defaultValue={'2022'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Link href="/course/create" className="flex w-2/12 justify-end">
          <Button
            variant={'default'}
            className="min-w-max text-base  font-bold"
            size={'lg'}
          >
            Add course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {courseCardProps
          .filter((e) => {
            const lowerCaseSearchValue = searchValue.toLocaleLowerCase();

            const lowerCaseCourseName = e.courseName.toLowerCase();
            const lowerCaseCourseId = e.courseId.toLowerCase();

            return (
              lowerCaseCourseName.includes(lowerCaseSearchValue) ||
              lowerCaseCourseId.includes(lowerCaseSearchValue)
            );
          })
          .map((e, i) => {
            return (
              <CourseCard
                key={i}
                courseId={e.courseId}
                courseName={e.courseName}
                href={e.href}
                studentAmount={e.studentAmount}
                finishedTask={e.finishedTask}
                totalTask={e.totalTask}
                teacherAmount={e.teacherAmount}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CoursePage;
