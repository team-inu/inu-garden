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
import { useAuth } from '@/hooks/auth-hook';
import { useCourseList } from '@/hooks/course-hook';
import { Role } from '@/types/auth-type';

const CoursePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [curriculum, setCurriculum] = useState('none');
  const [year, setYear] = useState('2023');
  const { user } = useAuth();
  const { data: courses, isLoading: isCourseLoading } = useCourseList();
  const curriculumLists = ['international', 'regular', 'none'];

  const handleYearChange = (e: string) => {
    setYear(e);
  };

  const handleCurriculumChange = (e: string) => {
    setCurriculum(e);
  };

  return (
    <div className="container py-8">
      <div>
        <h1 className="mb-5 text-4xl font-bold">Course</h1>
      </div>
      <div className="mb-16 flex w-full items-center justify-between  ">
        <div className="flex w-10/12 space-x-2">
          <Input
            type="search"
            placeholder="Search..."
            className="w-10/12 "
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Select value={curriculum} onValueChange={handleCurriculumChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a curriculum" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {curriculumLists.map((curriculum) => (
                  <SelectItem key={curriculum} value={curriculum}>
                    {curriculum}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <div></div>
        </div>

        {user.data?.role === Role.HEAD_OF_CURRICULUM && (
          <Link href="/course/create" className="flex w-2/12 justify-end">
            <Button
              variant={'default'}
              className="min-w-max text-base  font-bold"
              size={'lg'}
            >
              Add course
            </Button>
          </Link>
        )}
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
            .filter((e) => {
              if (curriculum === 'none') {
                return e;
              }
              return e.curriculum === curriculum;
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
