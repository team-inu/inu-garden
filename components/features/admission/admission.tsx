'use client';

import { AdmissionDataTable } from '@/components/features/admission/admission-table';
import { columns } from '@/components/features/admission/admisson-column';
import Loading from '@/components/features/loading-screen';
import { useGetStudentList } from '@/hooks/student-hook';

const Admission = () => {
  const { data: students, isLoading } = useGetStudentList();
  return (
    <>
      <div>
        <h1 className="mb-5 text-4xl font-bold">Admission</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <AdmissionDataTable columns={columns} data={students ?? []} />
        )}
      </div>
    </>
  );
};

export default Admission;
