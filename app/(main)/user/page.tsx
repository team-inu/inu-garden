'use client';

import Loading from '@/components/features/loading-screen';
import { columns } from '@/components/features/user/user-column';
import { LecturerDataTable } from '@/components/features/user/user-table';
import { useGetLecturerList } from '@/hooks/user-hook';

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
          <LecturerDataTable
            columns={columns}
            data={
              lecturers?.map((lecturer) => ({
                ...lecturer,
                collapsibleContent: 'test',
              })) ?? []
            }
          />
        )}
      </div>
    </div>
  );
};

export default LecturerPage;
