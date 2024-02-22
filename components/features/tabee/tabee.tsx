'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/features/loading-screen';
import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { SubPLO } from '@/data/schema';
import { useGetPloList } from '@/hooks/plo-hook';
import { useGetPoList } from '@/hooks/po-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const { data: plos, isLoading: isPloLoading } = useGetPloList();
  const { data: splos, isLoading: isSubPloLoading } = useGetSubPloList();
  const { data: pos, isLoading: isPoLoading } = useGetPoList();

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
          {isPoLoading ? (
            <Loading />
          ) : (
            <ProgramOutcomeDataTable columns={poColumns} data={pos} />
          )}
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
