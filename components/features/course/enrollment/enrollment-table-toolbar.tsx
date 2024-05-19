'use client';

import { Cross2Icon, FileTextIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import excel from 'exceljs';
import { FolderDotIcon, ImportIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import EnrollmentAddDialog from '@/components/features/course/enrollment/enrollment-add-dialog';
import EnrollmentImportDialog from '@/components/features/course/enrollment/enrollment-import-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateEnrollment } from '@/hooks/enrollment-hook';
import { EnrollmentResults } from '@/types/schema/course-portfolio-schema';
import { CreateEnrollmentForm, CreateEnrollmentPayload } from '@/types/schema/enrollment-schema';

export type Option = {
  value: string;
  label: string;
  icon?: any;
};

export type SelectorOption = {
  options: Option[];
  title: string;
  columnName: string;
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectorOptions: SelectorOption[];
  isViewOptions?: boolean;
  isCreateEnabled?: boolean;
  handleImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outcomeData: EnrollmentResults[];
}

export function EnrollmentTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  handleImport,
  outcomeData,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { mutate, isSuccess } = useCreateEnrollment();
  const { id: courseId } = useParams<{ id: string }>();

  useEffect(() => {
    if (isSuccess) {
      setIsAddDialogOpen(false);
    }
  }, [isSuccess]);

  const onSubmit = (value: CreateEnrollmentForm) => {
    mutate(value);
  };

  const onSubmitImport = (value: CreateEnrollmentPayload) => {
    mutate(value);
  };

  const generate = async () => {
    if (outcomeData === undefined || outcomeData.length == 0) {
      return;
    }

    const workbook = new excel.Workbook();

    const cloSheet = workbook.addWorksheet('CLO');
    const ploSheet = workbook.addWorksheet('PLO');
    const poSheet = workbook.addWorksheet('PO');

    const cloHeaders = ['Student Id'];
    const ploHeaders = ['Student Id'];
    const poHeaders = ['Student Id'];

    const cloData: string[][] = [];
    const ploData: string[][] = [];
    const poData: string[][] = [];

    const cloWidth: { width: number }[] = [];
    const ploWidth: { width: number }[] = [];
    const poWidth: { width: number }[] = [];

    outcomeData
      .sort((a, b) => {
        return Number(a.studentId) - Number(b.studentId);
      })
      .forEach((outcome, i) => {
        let cloRow: string[] = [];
        cloRow.push(outcome.studentId);
        outcome.courseLearningOutcomes
          .sort((a, b) => {
            return Number(a.code.split('CLO').pop()) - Number(b.code.split('CLO').pop());
          })
          .forEach((clo) => {
            if (i == 0) {
              cloHeaders.push(clo.code + ' - ' + clo.description);
              cloWidth.push({ width: 15 });
            }
            cloRow.push(clo.pass ? '1' : '0');
          });
        cloData.push(cloRow);

        let ploRow: string[] = [];
        ploRow.push(outcome.studentId);
        outcome.programLearningOutcomes
          .sort((a, b) => {
            return Number(a.code) - Number(b.code);
          })
          .forEach((plo) => {
            if (i == 0) {
              ploWidth.push({ width: 15 });
              ploHeaders.push('PLO' + plo.code + ' - ' + plo.descriptionThai);
            }
            ploRow.push(plo.pass ? '1' : '0');
          });
        ploData.push(ploRow);

        let poRow: string[] = [];
        poRow.push(outcome.studentId);
        outcome.programOutcomes
          .sort((a, b) => {
            return Number(a.code) - Number(b.code);
          })
          .forEach((po) => {
            if (i == 0) {
              poWidth.push({ width: 15 });
              poHeaders.push('PO' + po.code + ' - ' + po.name);
            }
            poRow.push(po.pass ? '1' : '0');
          });
        poData.push(poRow);
      });

    cloSheet.addRow(cloHeaders);
    cloSheet.addRows(cloData);
    cloSheet.columns = cloWidth;

    ploSheet.addRow(ploHeaders);
    ploSheet.addRows(ploData);
    ploSheet.columns = ploWidth;

    poSheet.addRow(poHeaders);
    poSheet.addRows(poData);
    poSheet.columns = poWidth;

    return workbook;
  };

  const onDownloadOutcomesReport = async () => {
    const workbook = await generate();

    if (workbook === undefined) {
      toast.error('Failed to generate outcomes report');
      return;
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = 'outcomes_report.xlsx';
    a.click();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="type here for filter"
          value={searchValue ?? ''}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
            setSearchValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {hasOption &&
          something.map((input, i) => {
            return (
              table.getColumn(input.columnName) && (
                <DataTableFacetedFilter
                  column={table.getColumn(input.columnName)}
                  title={input.title}
                  options={input.options}
                  key={i}
                />
              )
            );
          })}

        {hasOption && isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {isCreateEnabled && (
          <div className="flex space-x-2">
            <Button
              className="ml-auto hidden h-8 bg-green-600 lg:flex"
              variant="outline"
              size="sm"
              onClick={onDownloadOutcomesReport}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              Export Outcomes Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <EnrollmentAddDialog
                onSubmit={onSubmit}
                defaultValues={{
                  status: 'ENROLL',
                  courseId: courseId,
                  studentId: '',
                }}
              />
            </Dialog>

            <Input type="file" className="hidden" ref={fileImportRef} onChange={handleImport} />
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsImportDialogOpen(true)}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <EnrollmentImportDialog
                open={isImportDialogOpen}
                setIsOnOpenChange={setIsImportDialogOpen}
                onSubmit={onSubmitImport}
              />
            </Dialog>
            <Button className="ml-auto hidden h-8 lg:flex" variant="outline" size="sm">
              <a className="flex items-center" href="/template/enrollment.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
