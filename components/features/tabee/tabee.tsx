'use client';

import { FilePlusIcon } from '@radix-ui/react-icons';
import { FolderDotIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import Loading from '@/components/features/loading-screen';
import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubPLO } from '@/data/schema';
import { useGetPloList } from '@/hooks/plo-hook';
import { useGetPoList } from '@/hooks/po-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const { data: plos, isLoading: isPloLoading } = useGetPloList();
  const { data: splos, isLoading: isSubPloLoading } = useGetSubPloList();
  const { data: pos, isLoading: isPoLoading } = useGetPoList();
  const fileImportRef = useRef<HTMLInputElement>(null);

  const getVales = (id: string, code: string) => {
    setSelectedRows(id);
    setSelectedCode(code);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const ploSheet = workBook.Sheets[workBook.SheetNames[0]];
    const subPloSheet = workBook.Sheets[workBook.SheetNames[1]];
    const poSheet = workBook.Sheets[workBook.SheetNames[2]];

    const [infoTable, ploTable] = await worksheetToTables(ploSheet);
    const [subPloTable] = await worksheetToTables(subPloSheet);
    const [poTable] = await worksheetToTables(poSheet);

    const info = tableToObject(infoTable[0], infoTable.slice(1));
    const plos = tableToObject(ploTable[0], ploTable.slice(1));
    const splos = tableToObject(subPloTable[0], subPloTable.slice(1));
    const pos = tableToObject(poTable[0], poTable.slice(1));

    const ploPayload = plos.map((e) => {
      return {
        code: String(e._Code),
        descriptionThai: e.Description_Thai,
        descriptionEng: e.Description_Eng,
        programYear: info[0].Year,
        programmeId: info[0]._Curriculum,
      };
    });

    const sploPayload = splos.map((e) => {
      return {
        code: String(e._PLO) + '.' + String(e.Code),
        descriptionThai: e.Description_Thai,
        descriptionEng: e.Description_Eng,
      };
    });

    const poPayload = pos.map((e) => {
      return {
        code: String(e._Code),
        name: e.Name,
        description: e.Description,
      };
    });

    console.log(ploPayload);
    console.log(sploPayload);
    console.log(poPayload);

    e.target.value = '';
  };

  useEffect(() => {
    console.log(selectedCode);
    console.log(selectedRows);
  }, [selectedCode, selectedRows]);

  return (
    <div className="">
      <div className="grid-row-2 grid gap-3 ">
        <div className="mx-auto flex w-full items-center justify-between space-x-3">
          <h1 className="mb-5 text-2xl font-bold">Program Outcome</h1>
          <div className="w-1/10 flex flex-row space-x-2">
            <Button
              className="ml-auto hidden h-10 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/plo-po.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>

            <Input
              type="file"
              className="hidden"
              ref={fileImportRef}
              onChange={handleImport}
            />
            <Button
              variant={'default'}
              className="text-base font-bold"
              onClick={() => fileImportRef.current?.click()}
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
