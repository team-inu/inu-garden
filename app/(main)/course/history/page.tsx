'use client';

import { useEffect, useState } from 'react';

import CourseHistoryCard from '@/components/features/course/history/course-history-card';
import CourseHistoryHeader from '@/components/features/course/history/course-history-header';
import Loading from '@/components/features/loading-screen';
import { Input } from '@/components/ui/input';
import { useCourseList } from '@/hooks/course-hook';
import { GetCourseList } from '@/types/schema/course-schema';

type CourseHistoryType = GetCourseList & {
  isSee: boolean;
};

const CourseHistoryPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [coursesSelect, setCoursesSelect] = useState<CourseHistoryType[]>();
  const { data: courses, isLoading: isCourseLoading } = useCourseList();

  const setCourseData = (data: GetCourseList[]) => {
    const newCourses = data.map((course) => {
      return {
        ...course,
        isSee: false,
      };
    });
    setCoursesSelect(newCourses);
  };

  const handleIsSee = (id: string) => {
    setCoursesSelect(
      coursesSelect?.map((course) => {
        if (course.id === id) {
          return {
            ...course,
            isSee: !course.isSee,
          };
        } else {
          return { ...course, isSee: false };
        }
      }),
    );
  };

  useEffect(() => {
    if (courses) {
      setCourseData(courses);
    }
  }, [courses]);

  if (isCourseLoading || !courses) return <Loading />;

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
          {coursesSelect &&
            coursesSelect.map((course) => (
              <CourseHistoryCard
                key={course.id}
                courseData={course}
                isSee={course.isSee}
                handleIsSee={handleIsSee}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseHistoryPage;
