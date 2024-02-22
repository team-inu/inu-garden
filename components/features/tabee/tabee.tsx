'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/features/loading-screen';
import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { PO, SubPLO } from '@/data/schema';
import { useGetPloList } from '@/hooks/plo-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';

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

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const { data: plos, isLoading: isPloLoading } = useGetPloList();
  const { data: splos, isLoading: isSubPloLoading } = useGetSubPloList();

  const getVales = (id: string, code: string) => {
    setSelectedRows(id);
    setSelectedCode(code);
  };

  useEffect(() => {
    console.log(selectedCode);
    console.log(selectedRows);
  }, [selectedCode, selectedRows]);

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
          {isPloLoading ? (
            <Loading />
          ) : (
            <ProgramLearningOutcomeDataTable
              columns={ploColumns}
              data={plos ?? []}
              getValues={getVales}
            />
          )}
        </div>
      </div>
      <div>
        {selectedRows && (
          <div>
            <h1 className="mb-5 text-2xl font-bold ">
              Sub program learning outcome of PLO {selectedCode}
            </h1>
            {isSubPloLoading ? (
              <Loading />
            ) : (
              <SubProgramLearningOutcomeDataTable
                columns={subPloColumns}
                data={
                  splos.filter(
                    (splo: SubPLO) =>
                      splo.programLearningOutcomeId === selectedRows,
                  ) ?? []
                }
                // currentPlo={selectedRows}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TABEE;
