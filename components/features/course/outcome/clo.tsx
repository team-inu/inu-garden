'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { columns } from '@/components/features/course/outcome/clo-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import Loading from '@/components/features/loading-screen';
import { subPloStaticColumn } from '@/components/features/tabee/sub-plo/sub-plo-static-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { useGetCloByCourseId, useGetCloById } from '@/hooks/clo-hook';

const CourseLearningOutcome = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const getVales = (id: string) => {
    setSelectedRows(id);
  };

  const { id: courseId } = useParams<{ id: string }>();

  const { data: clos, isLoading } = useGetCloByCourseId(courseId);
  const { data: clo, isLoading: isCloLoading } = useGetCloById(selectedRows);

  return (
    <>
      <h1 className="font- mb-5 text-2xl ">Course learning outcome</h1>{' '}
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <CourseLearningOutcomeDataTable
            columns={columns}
            data={clos ?? []}
            getValues={getVales}
          />
        )}
      </div>
      <div>
        {selectedRows && (
          <div>
            <h1 className="mb-5 text-2xl font-bold ">
              Sub program learning outcome of {selectedRows}
            </h1>
            {isCloLoading ? (
              <Loading />
            ) : (
              <SubProgramLearningOutcomeDataTable
                columns={subPloStaticColumn}
                data={clo?.subProgramLearningOutcomes ?? []}
                subPloId={
                  clo?.subProgramLearningOutcomes.map((subPlo) => subPlo.id) ??
                  []
                }
                isTabee={false}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseLearningOutcome;
