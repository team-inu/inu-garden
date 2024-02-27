'use client';

import Link from 'next/link';
import { useState } from 'react';

import CourseCard from '@/components/features/course/course-card';
import Loading from '@/components/features/loading-screen';
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
import { useCourseList } from '@/hooks/course-hook';

const CoursePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [year, setYear] = useState('2023');
  const { data: courses, isLoading: isCourseLoading } = useCourseList();

  const handleYearChange = (e: string) => {
    setYear(e);
  };

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
            <Select value={year} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a year" />
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
      {isCourseLoading && (
        <div className="items-center">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-1  gap-5 md:grid-cols-2">
        {courses &&
          courses
            .filter((e) => {
              const lowerCaseSearchValue = searchValue.toLocaleLowerCase();

              const lowerCaseCourseName = e.name.toLowerCase();
              const lowerCaseCourseId = e.code.toLowerCase();

              return (
                lowerCaseCourseName.includes(lowerCaseSearchValue) ||
                lowerCaseCourseId.includes(lowerCaseSearchValue)
              );
            })
            .map((e, i) => {
              return (
                <CourseCard
                  key={i}
                  courseId={e.code}
                  courseName={e.name}
                  href={e.id}
                  studentAmount={0}
                  finishedTask={0}
                  totalTask={0}
                  teacherAmount={0}
                  curriculum={e.curriculum}
                />
              );
            })}
      </div>
    </div>
  );
};

export default CoursePage;
