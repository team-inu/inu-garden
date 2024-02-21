'use client';

import { columns } from '@/components/features/lecturer/lecturer-column';
import { LecturerDataTable } from '@/components/features/lecturer/lecturer-table';
import Loading from '@/components/features/loading-screen';
import { useGetLecturerList } from '@/hooks/lecturer-hook';

const LecturerPage = () => {
  const { data: lecturers, isLoading } = useGetLecturerList();
  return (
    <div className="mx-auto w-10/12 py-8">
      <div>
        <h1 className="mb-5 text-4xl font-bold">Lecturer</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <LecturerDataTable columns={columns} data={lecturers ?? []} />
        )}
      </div>
    </div>
  );
};

export default LecturerPage;
