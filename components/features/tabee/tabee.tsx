'use client';

import { FilePlusIcon } from '@radix-ui/react-icons';
import { FolderDotIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Loading from '@/components/features/loading-screen';
import PloImportDialog from '@/components/features/tabee/plo-import-dialog';
import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import TabeeImportDialog from '@/components/features/tabee/tabee-import-dialog';
import { Button } from '@/components/ui/button';
import { SubPLO } from '@/data/schema';
import { useCreateManyPlos, useGetPloList } from '@/hooks/plo-hook';
import { useCreateManyPos, useGetPoList } from '@/hooks/po-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';
import { CreateManyPloType } from '@/types/schema/plo-schema';
import { CreateManyPoType } from '@/types/schema/po-schema';
import { CreateManySubPloType } from '@/types/schema/sub-plo-schema';

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const { data: plos, isLoading: isPloLoading } = useGetPloList();
  const { data: splos, isLoading: isSubPloLoading } = useGetSubPloList();
  const { data: pos, isLoading: isPoLoading } = useGetPoList();
  const fileImportRef = useRef<HTMLInputElement>(null);
  const [isPloImportOpen, setIsPloImportOpen] = useState(false);
  const [isTabeeImportOpen, setIsTabeeImportOpen] = useState(false);
  const [sploValues, setSploValues] = useState<CreateManySubPloType>();
  const { mutate: createManyPlos, isError: isCreateManyPlosError } =
    useCreateManyPlos();
  const { mutate: createManyPos, isError: isCreateManyPosError } =
    useCreateManyPos();

  const getVales = (id: string, code: string) => {
    setSelectedRows(id);
    setSelectedCode(code);
  };

  const onSubmitPloImport = (value: CreateManyPloType) => {
    createManyPlos({ plos: value, splos: sploValues! });
    if (!isCreateManyPlosError) {
      setIsPloImportOpen(false);
    }
  };

  const onSubmitSubPloImport = (value: CreateManySubPloType) => {
    setSploValues(value);
  };

  const onSubmitPoImport = (value: CreateManyPoType) => {
    createManyPos(value);
    if (!isCreateManyPosError) {
      setIsTabeeImportOpen(false);
    }
  };

  useEffect(() => {
    console.log(selectedCode);
    console.log(selectedRows);
  }, [selectedCode, selectedRows]);

  return (
    <div className="">
      <div className="grid-row-2 grid gap-3 ">
        <div className="mx-auto flex w-full items-center justify-between space-x-3">
          <h1 className="mb-5 text-2xl font-bold">Program Learning Outcome</h1>
          <div className="w-1/10 flex flex-row space-x-2">
            <Button
              className="ml-auto hidden h-10 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/plo.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>

            <Button
              variant={'default'}
              className="text-base font-bold"
              onClick={() => setIsPloImportOpen(true)}
            >
              <FilePlusIcon className="mr-2 h-4 w-4" />
              Import File
            </Button>
          </div>
        </div>
        <div>
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
        <div className="my-2 border"></div>
        <div className="mx-auto flex w-full items-center justify-between space-x-3">
          <h1 className="mb-5 text-2xl font-bold ">Program Outcome</h1>
          <div className="w-1/10 flex flex-row space-x-2">
            <Button
              className="ml-auto hidden h-10 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/po.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>

            <Button
              variant={'default'}
              className="text-base font-bold"
              onClick={() => setIsTabeeImportOpen(true)}
            >
              <FilePlusIcon className="mr-2 h-4 w-4" />
              Import File
            </Button>
          </div>
        </div>
        <div>
          {isPoLoading ? (
            <Loading />
          ) : (
            <ProgramOutcomeDataTable columns={poColumns} data={pos ?? []} />
          )}
        </div>
      </div>
      <PloImportDialog
        onPloSubmit={onSubmitPloImport}
        onSubPloSubmit={onSubmitSubPloImport}
        open={isPloImportOpen}
        isOnOpenChange={setIsPloImportOpen}
      />
      <TabeeImportDialog
        onSubmit={onSubmitPoImport}
        open={isTabeeImportOpen}
        isOnOpenChange={setIsTabeeImportOpen}
      />
    </div>
  );
};

export default TABEE;
