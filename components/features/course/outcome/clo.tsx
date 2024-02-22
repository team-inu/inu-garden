'use client';

import { useState } from 'react';

import { columns } from '@/components/features/course/outcome/clo-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { SubPLO } from '@/data/schema';

const mockCLO = [
  {
    id: '01HG65WNM26ZY60SC0CYC4V4TK',
    name: 'CLO1',
    description: 'CLO1 description',
  },
  {
    id: '01HG65WNM2H6NET91P8N61MQ8Z',
    name: 'CLO2',
    description: 'CLO2 description',
  },
  {
    id: '01HG65WNM2A6PP0PY1EV3CWST1',
    name: 'CLO3',
    description: 'CLO3 description',
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
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">Course learning outcome</h1>{' '}
      <CourseLearningOutcomeDataTable
        columns={columns}
        data={mockCLO}
        getValues={getVales}
      />
      <div>
        {selectedRows && (
          <div>
            <h1 className="mb-5 text-2xl font-bold ">
              Sub program learning outcome of {selectedRows}
            </h1>
            <SubProgramLearningOutcomeDataTable
              columns={subPloColumns}
              data={mockSubPLO}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CourseLearningOutcome;
