'use client';

import Loading from '@/components/features/loading-screen';
import { columns } from '@/components/features/semester/semester-column';
import { SemesterDataTable } from '@/components/features/semester/semester-table';
import { useGetSemesterList } from '@/hooks/semester-hook';

const Semester = () => {
  const { data: semesters, isLoading } = useGetSemesterList();

  return (
    <>
      <div>
        <h1 className="mb-5 text-4xl font-bold">Semester</h1>
      </div>
      <div className="">
        {isLoading && semesters ? (
          <Loading />
        ) : (
          <SemesterDataTable columns={columns} data={semesters ?? []} />
        )}
      </div>
    </>
  );
};

export default Semester;
