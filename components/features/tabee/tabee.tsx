'use client';

import { FilePlusIcon } from '@radix-ui/react-icons';
import { FolderDotIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import Loading from '@/components/features/loading-screen';
import PloImportDialog from '@/components/features/tabee/plo-import-dialog';
import { columns as ploColumns } from '@/components/features/tabee/plo/plo-column';
import { ProgramLearningOutcomeDataTable } from '@/components/features/tabee/plo/plo-table';
import { columns as poColumns } from '@/components/features/tabee/po/po-column';
import { ProgramOutcomeDataTable } from '@/components/features/tabee/po/po-table';
import { columns as subPloColumns } from '@/components/features/tabee/sub-plo/sub-plo-column';
import { SubProgramLearningOutcomeDataTable } from '@/components/features/tabee/sub-plo/sub-plo-table';
import TabeeImportDialog from '@/components/features/tabee/tabee-import-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCreateManyPlos, useGetPloList } from '@/hooks/plo-hook';
import { useCreateManyPos, useGetCourseWithPo, useGetPoList } from '@/hooks/po-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';
import { CreateManyPloForm } from '@/types/schema/plo-schema';
import { CreateManyPoForm } from '@/types/schema/po-schema';
import { CreateManySubPloType, SubPLO } from '@/types/schema/sub-plo-schema';

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [selectedPo, setSelectedPoId] = useState({
    id: '',
    name: '',
  });
  //useRef to get height of the table
  const subPloTableRef = useRef<HTMLDivElement>(null);
  const poTableRef = useRef<HTMLDivElement>(null);
  const { data: plos, isLoading: isPloLoading } = useGetPloList();
  const { data: splos, isLoading: isSubPloLoading } = useGetSubPloList();
  const { data: pos, isLoading: isPoLoading } = useGetPoList();
  const fileImportRef = useRef(null);
  const [isPloImportOpen, setIsPloImportOpen] = useState(false);
  const [isTabeeImportOpen, setIsTabeeImportOpen] = useState(false);
  const [sploValues, setSploValues] = useState<CreateManySubPloType>();
  const { mutate: createManyPlos, isError: isCreateManyPlosError } = useCreateManyPlos();
  const { mutate: createManyPos, isError: isCreateManyPosError } = useCreateManyPos();

  const { data: coursePo } = useGetCourseWithPo();

  const getVales = (id: string, code: string) => {
    setSelectedRows(id);
    setSelectedCode(code);

    //set time out to scroll to sub plo table
    setTimeout(() => {
      subPloTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const getValesPo = (id: string, name: string) => {
    setSelectedPoId({ id, name });
    setTimeout(() => {
      poTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const onSubmitPloImport = (value: CreateManyPloForm) => {
    createManyPlos({ plos: value, splos: sploValues! });
    if (!isCreateManyPlosError) {
      setIsPloImportOpen(false);
    }
  };

  const onSubmitSubPloImport = (value: CreateManySubPloType) => {
    setSploValues(value);
  };

  const onSubmitPoImport = (value: CreateManyPoForm) => {
    createManyPos(value);
    if (!isCreateManyPosError) {
      setIsTabeeImportOpen(false);
    }
  };

  return (
    <div className="">
      <div className="grid-row-2 grid gap-3 ">
        <div className="mx-auto flex w-full items-center justify-between space-x-3">
          <h1 className="mb-5 text-2xl font-bold">Program Learning Outcome</h1>
          <div className="w-1/10 flex flex-row space-x-2">
            <Button className="ml-auto hidden h-10 lg:flex" variant="outline" size="sm">
              <a className="flex items-center" href="/template/plo.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>

            <Button variant={'default'} className="text-base font-bold" onClick={() => setIsPloImportOpen(true)}>
              <FilePlusIcon className="mr-2 h-4 w-4" />
              Import File
            </Button>
          </div>
        </div>
        <div>
          {isPloLoading ? (
            <Loading />
          ) : (
            <ProgramLearningOutcomeDataTable columns={ploColumns} data={plos ?? []} getValues={getVales} />
          )}
        </div>
        <div>
          {selectedRows && (
            <div>
              <h1 className="mb-5 text-2xl font-bold " ref={subPloTableRef}>
                Sub program learning outcome of PLO {selectedCode}
              </h1>
              {isSubPloLoading ? (
                <Loading />
              ) : (
                <SubProgramLearningOutcomeDataTable
                  currentPlo={selectedRows}
                  columns={subPloColumns}
                  data={splos?.filter((splo: SubPLO) => splo.programLearningOutcomeId === selectedRows) ?? []}
                  isTabee={true}
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
            <Button className="ml-auto hidden h-10 lg:flex" variant="outline" size="sm">
              <a className="flex items-center" href="/template/po.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>

            <Button variant={'default'} className="text-base font-bold" onClick={() => setIsTabeeImportOpen(true)}>
              <FilePlusIcon className="mr-2 h-4 w-4" />
              Import File
            </Button>
          </div>
        </div>
        <div>
          {isPoLoading ? (
            <Loading />
          ) : (
            <ProgramOutcomeDataTable
              columns={poColumns}
              data={pos ?? []}
              poResult={coursePo ?? []}
              getValues={getValesPo}
            />
          )}

          {selectedPo.id && coursePo && (
            <div className="space-y-5">
              <div>
                <h1 className="mb-3 text-2xl font-bold " ref={poTableRef}>
                  Courses of Program Outcome {selectedPo.name}{' '}
                  <span className="text-lg text-gray-400">(passing percentage)</span>
                </h1>
                <div>
                  To show the courses that pass the program outcome, the passing percentage of the course should be more
                  than 50%.{' '}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {coursePo
                  .find((course) => course.programOutcomeId === selectedPo.id)
                  ?.courses.map((course) => (
                    <div key={course.id} className="rounded-lg border-2 border-white p-5 hover:bg-secondary">
                      <div className="flex justify-between">
                        <div className="text-lg font-bold">
                          {course.code ? course.code + ' - ' + course.name : 'No course available'}
                        </div>
                        <Badge variant={course.passingPercentage > 50 ? 'green' : 'destructive'}>
                          {course.passingPercentage}%
                        </Badge>
                      </div>
                      <div className="">{course.year ? course.semesterSequence + '/' + course.year : ''}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <PloImportDialog
        onPloSubmit={onSubmitPloImport}
        onSubPloSubmit={onSubmitSubPloImport}
        open={isPloImportOpen}
        isOnOpenChange={setIsPloImportOpen}
      />
      <TabeeImportDialog onSubmit={onSubmitPoImport} open={isTabeeImportOpen} isOnOpenChange={setIsTabeeImportOpen} />
    </div>
  );
};

export default TABEE;
