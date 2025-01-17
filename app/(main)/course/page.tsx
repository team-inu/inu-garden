'use client';

import Link from 'next/link';
import { useState } from 'react';

import CourseCard from '@/components/features/course/course-card';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/auth-hook';
import { useCourseList } from '@/hooks/course-hook';
import { Role } from '@/types/auth-type';
import { GetCourseList } from '@/types/schema/course-schema';

const CoursePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [curriculum, setCurriculum] = useState('all programmes');
  const [year, setYear] = useState('all years');
  const { user } = useAuth();
  const { data: courses, isLoading: isCourseLoading } = useCourseList();
  const curriculumLists = ['international', 'regular', 'all programmes'];

  const yearSet = new Set<string>();
  yearSet.add('all years');

  courses?.forEach((course) => {
    yearSet.add(String(course.semester.year));
  });

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
                {Array.from(yearSet)
                  .sort((a, b) => {
                    return Number(b) - Number(a);
                  })
                  .map((year, i) => {
                    return (
                      <SelectItem key={i} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div></div>
        </div>

        {user.data?.role === Role.HEAD_OF_CURRICULUM && (
          <Link href="/course/create" className="flex w-2/12 justify-end">
            <Button variant={'default'} className="min-w-max text-base  font-bold" size={'lg'}>
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
                lowerCaseCourseName.includes(lowerCaseSearchValue) || lowerCaseCourseId.includes(lowerCaseSearchValue)
              );
            })
            .filter((e) => {
              if (curriculum === 'all programmes') {
                return e;
              }
              return e.curriculum === curriculum;
            })
            .filter((e) => {
              if (year === 'all years') {
                return true;
              }
              return String(e.semester.year) === year;
            })
            .sort((a: GetCourseList, b: GetCourseList) => {
              if (b.academicYear !== a.academicYear) {
                return b.academicYear - a.academicYear;
              }

              return a.code.localeCompare(b.code);
            })
            .map((e, i) => {
              return (
                <CourseCard
                  key={i}
                  courseId={e.code}
                  courseName={e.name}
                  href={e.id}
                  curriculum={e.curriculum}
                  lecturer={e.user.firstName + ' ' + e.user.lastName}
                  semester={e.semester.semesterSequence + '/' + e.semester.year}
                />
              );
            })}
      </div>
    </div>
  );
};

export default CoursePage;
