'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { FolderDotIcon, ImportIcon } from 'lucide-react';
import { useState } from 'react';

import GradeImportDialog from '@/components/features/student/grade-import-dialog';
import StudentDialog from '@/components/features/student/student-dialog';
import StudentFilesUploader from '@/components/features/student/student-files-uploader';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateStudent } from '@/hooks/student-hook';
import { CreateStudentForm } from '@/types/schema/student-schema';

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
}

export function StudentTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isImportStudentOpen, setIsImportStudentOpen] = useState(false);
  const [isImportGradeOpen, setIsImportGradeOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const { mutate, isError } = useCreateStudent();
  const onSubmit = (value: CreateStudentForm) => {
    mutate(value);
    if (!isError) {
      setIsOpen(false);
    }
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
              Add Student
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <StudentDialog onSubmit={onSubmit} />
            </Dialog>

            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsImportStudentOpen(true)}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import Student
            </Button>

            <Dialog
              open={isImportStudentOpen}
              onOpenChange={setIsImportStudentOpen}
            >
              <StudentFilesUploader />
            </Dialog>

            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsImportGradeOpen(true)}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import Grade
            </Button>

            <Dialog
              open={isImportGradeOpen}
              onOpenChange={setIsImportGradeOpen}
            >
              <GradeImportDialog />
            </Dialog>

            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/student.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Student Template
              </a>
            </Button>

            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/grade.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Grade Template
              </a>
            </Button>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
