'use client';

import { useParams } from 'next/navigation';

import { columns } from '@/components/features/course/enrollment/enrollment-column';
import { EnrollmentDataTable } from '@/components/features/course/enrollment/enrollment-table';
import Loading from '@/components/features/loading-screen';
import { useGetEnrollmentsByCourseId } from '@/hooks/enrollment-hook';

const Enrollment = () => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data: enrollments, isLoading } =
    useGetEnrollmentsByCourseId(courseId);

  return (
    <>
      <div>
        <h1 className="mb-5 text-4xl font-bold">Student</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <EnrollmentDataTable columns={columns} data={enrollments ?? []} />
        )}
      </div>
    </>
  );
};

export default Enrollment;
