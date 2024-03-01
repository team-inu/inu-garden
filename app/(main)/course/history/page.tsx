'use client';

import { useState } from 'react';

import CourseHistoryCard from '@/components/features/course/history/course-history-card';
import CourseHistoryHeader from '@/components/features/course/history/course-history-header';
import { Input } from '@/components/ui/input';

const CourseHistoryPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [courseMock, setCourseMock] = useState([
    {
      courseId: 'cpe100',
      courseName: 'Fundamental of Programming in C',
      isSee: false,
    },
    {
      courseId: 'cpe101',
      courseName: 'Intro into com eng',
      isSee: false,
    },
  ]);
  const handleIsSee = (id: string) => {
    setCourseMock(
      courseMock.map((item) => {
        if (item.courseId === id) {
          return { ...item, isSee: !item.isSee };
        } else {
          return { ...item, isSee: false };
        }
      }),
    );
  };
  return (
    <div className="container ">
      <CourseHistoryHeader />
      <div className="space-y-3">
        <div className="mb-5 space-y-1 ">
          <h1 className=" text-4xl font-bold">Course History</h1>
          <div>
            this page is for showing the history of the course that the user has
            taken in the past.
          </div>
        </div>
        <div>
          <Input
            type="search"
            placeholder="Search..."
            className="w-1/4"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="space-y-5">
          {courseMock.map((item, index) => (
            <CourseHistoryCard
              key={index}
              courseId={item.courseId}
              courseName={item.courseName}
              isSee={item.isSee}
              handleIsSee={handleIsSee}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseHistoryPage;
