'use client';

import { columns } from '@/components/features/course/enrollment/enrollment-column';
import { EnrollmentDataTable } from '@/components/features/course/enrollment/enrollment-table';
import Loading from '@/components/features/loading-screen';
import { useGetEnrollmentList } from '@/hooks/enrollment-hook';

const Enrollment = () => {
  const { data: enrollments, isLoading } = useGetEnrollmentList();

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
