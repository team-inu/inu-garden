'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import excel from 'exceljs';
import { FolderDotIcon, ImportIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import ScoreDialog from '@/components/features/course/score/score-dialog';
import ScoreImportDialog from '@/components/features/course/score/score-import-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useGetEnrollmentsByCourseId } from '@/hooks/enrollment-hook';
import { useCreateScore } from '@/hooks/score-hook';
import { CreateScoreForm } from '@/types/schema/score-schema';

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
  assignmentId?: string;
}

export function ScoreTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  assignmentId,
}: DataTableToolbarProps<TData>) {
  const { id: courseId } = useParams<{ id: string }>();
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { mutate, isError } = useCreateScore();

  const { data: enrollments, isLoading } =
    useGetEnrollmentsByCourseId(courseId);

  const handleScoreSubmit = (values: CreateScoreForm) => {
    if (assignmentId) {
      mutate({ score: values, assignmentId });
      if (!isError) {
        setIsOpen(false);
      }
    }
  };

  const generate = async () => {
    if (enrollments === undefined) {
      return;
    }

    const workbook = new excel.Workbook();

    const sheet = workbook.addWorksheet('score');

    const headers = ['_studentId', 'first name', 'last name', 'score'];
    const data = enrollments.map((e) => {
      return [e.studentId, e.firstName, e.lastName, null];
    });

    sheet.addRow(headers);
    sheet.addRows(data);

    sheet.getRow(1).eachCell((e) => {
      e.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      e.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFC6F03' },
      };
      e.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      e.border = {
        top: { style: 'thick' },
        left: { style: 'thick' },
        bottom: { style: 'thick' },
        right: { style: 'thick' },
      };
    });

    sheet.columns = [
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
    ];

    return workbook;
  };

  const onDownloadScoreTemplate = async () => {
    const workbook = await generate();

    if (workbook === undefined) {
      toast.error('Failed to generate template');
      return;
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = 'test.xlsx';
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
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {isCreateEnabled && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <ScoreDialog onSubmit={handleScoreSubmit} />
            </Dialog>
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsImportOpen(true)}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import
            </Button>

            <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
              <ScoreImportDialog
                open={isImportOpen}
                setIsOnOpenChange={setIsImportOpen}
              />
            </Dialog>
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={onDownloadScoreTemplate}
            >
              <div className="flex items-center">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </div>
            </Button>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
