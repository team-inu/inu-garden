'use client';

import { useParams } from 'next/navigation';

import { columns } from '@/components/features/course/enrollment/enrollment-column';
import { EnrollmentDataTable } from '@/components/features/course/enrollment/enrollment-table';
import Loading from '@/components/features/loading-screen';
import { useGetEnrollmentsByCourseId } from '@/hooks/enrollment-hook';
import { EnrollmentResultPloPo } from '@/types/schema/course-portfolio-schema';

const Enrollment = () => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data: enrollments, isLoading } =
    useGetEnrollmentsByCourseId(courseId);

  const mockData: EnrollmentResultPloPo[] = [
    {
      studentId: '63070501094',
      plo: [
        { ploName: 'PLO1', pass: true },
        { ploName: 'PLO2', pass: false },
      ],
      po: [
        { poName: 'PO1', pass: true },
        { poName: 'PO2', pass: false },
      ],
    },
  ];

  return (
    <>
      <div>
        <h1 className="mb-5 text-2xl font-bold">Student</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <EnrollmentDataTable
            outcomeData={mockData}
            columns={columns}
            data={
              enrollments?.map((enrollment) => {
                return {
                  ...enrollment,
                  collapsibleContent: '',
                };
              }) ?? []
            }
          />
        )}
      </div>
    </>
  );
};

export default Enrollment;
