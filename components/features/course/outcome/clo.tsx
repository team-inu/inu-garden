'use client';

import { useEffect, useState } from 'react';

import { columns } from '@/components/features/course/outcome/clo-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import Loading from '@/components/features/loading-screen';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { SubPLO } from '@/data/schema';
import { useGetCloById, useGetCloList } from '@/hooks/clo-hook';

export const mockCLO = [
  {
    id: '01HG65WNM2H6NET91P8N61MQ8Z',
    code: 'CLO1',
    description: 'string',
    weight: 0,
    programOutcomeId: '-',
    expectedPassingAssignmentPercentage: 0,
    expectedScorePercentage: 0,
    expectedPassingStudentPercentage: 0,
    courseId: '1',
    programLearningOutcomeId: '1',
  },
];

export const mockSubPLO: SubPLO[] = [
  {
    id: '01HG65WNM2DZATRKR411FN3MXW',
    code: '1.1',
    descriptionThai: 'Sub PLO1 description',
    descriptionEng: 'Sub PLO1 description',
    programLearningOutcomeId: 'Sub PLO1 description',
  },
  {
    id: '01HG65WNM2DZATRKR411FN3MXW',
    code: '2.2',
    descriptionThai: 'Sub PLO2 description',
    descriptionEng: 'Sub PLO2 description',
    programLearningOutcomeId: 'Sub PLO2 description',
  },
  {
    id: '01HG65WNM2DZATRKR411FN3MXW',
    code: '3.1',
    descriptionThai: 'Sub PLO3 description',
    descriptionEng: 'Sub PLO3 description',
    programLearningOutcomeId: 'Sub PLO3 description',
  },
];

const CourseLearningOutcome = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const getVales = (id: string) => {
    setSelectedRows(id);
  };
  const { data: clos, isLoading } = useGetCloList();
  const { data: clo, isLoading: isLoading2 } = useGetCloById(selectedRows);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

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
            {isLoading2 ? (
              <Loading />
            ) : (
              <SubProgramLearningOutcomeDataTable
                columns={subPloColumns}
                data={clo?.subProgramLearningOutcomes ?? []}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseLearningOutcome;
