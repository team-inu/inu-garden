'use client';

import { useState } from 'react';

import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { PLO, PO, SubPLO } from '@/data/schema';

const mockPO: PO[] = [
  {
    id: '01HG65WNM1S9FSG1710P9E25BM',
    name: 'PO1',
    description: 'PO1 description',
  },
  {
    id: '01HG65WNM2SFQ2EB05BQQCJN0A',
    name: 'PO2',
    description: 'PO2 description',
  },
  {
    id: '01HG65WNM21C1YQMMEY5DAVKG7',
    name: 'PO3',
    description: 'PO3 description',
  },
];
export const mockPLO: PLO[] = [
  {
    id: '01HG65WNM26ZY60SC0CYC4V4TK',
    name: 'PLO1',
    description: 'PLO1 description',
  },
  {
    id: '01HG65WNM2H6NET91P8N61MQ8Z',
    name: 'PLO2',
    description: 'PLO2 description',
  },
  {
    id: '01HG65WNM2A6PP0PY1EV3CWST1',
    name: 'PLO3',
    description: 'PLO3 description',
  },
];
export const mockSubPLO: SubPLO[] = [
  {
    id: '01HG65WNM2DZATRKR411FN3MXW',
    descriptionThai: 'Sub PLO1 description',
    descriptionEnglish: 'Sub PLO1 description',
  },
  {
    id: '01HG65WNM2FNF5AEKKHBSV7WV7',
    descriptionThai: 'Sub PLO1 description',
    descriptionEnglish: 'Sub PLO1 description',
  },
  {
    id: '01HG65WNM275BMAJSTWJEN2TPP',
    descriptionThai: 'Sub PLO1 description',
    descriptionEnglish: 'Sub PLO1 description',
  },
];

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const getVales = (id: string) => {
    setSelectedRows(id);
  };
  return (
    <div className="">
      <div className="grid-row-2 grid gap-3 ">
        <div>
          <h1 className="mb-5 text-2xl font-bold">Program Outcome</h1>
          <ProgramOutcomeDataTable columns={poColumns} data={mockPO} />
        </div>
        <div className="my-2 border"></div>
        <div className="">
          <h1 className="mb-5 text-2xl font-bold ">Program Learning Outcome</h1>
          <ProgramLearningOutcomeDataTable
            columns={ploColumns}
            data={mockPLO}
            getValues={getVales}
          />
        </div>
      </div>
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
    </div>
  );
};

export default TABEE;
