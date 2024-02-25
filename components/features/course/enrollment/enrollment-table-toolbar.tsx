'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { FolderDotIcon, ImportIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import EnrollmentAddDialog from '@/components/features/course/enrollment/enrollment-add-dialog';
import EnrollmentImportDialog from '@/components/features/course/enrollment/enrollment-import-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateEnrollment } from '@/hooks/enrollment-hook';
import {
  CreateEnrollmentType,
  CreateManyEnrollmentType,
} from '@/types/schema/enrollment-schema';

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

export function EnrollmentTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  handleImport,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { mutate, isSuccess } = useCreateEnrollment();
  const { id: courseId } = useParams<{ id: string }>();

  const onSubmit = (value: CreateEnrollmentType) => {
    mutate(value);
    if (isSuccess) {
      setIsAddDialogOpen(false);
    }
  };

  const onSubmitImport = (value: CreateManyEnrollmentType) => {
    mutate(value);
    if (isSuccess) {
      setIsImportDialogOpen(false);
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

            <Input
              type="file"
              className="hidden"
              ref={fileImportRef}
              onChange={handleImport}
            />
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsImportDialogOpen(true)}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Dialog
              open={isImportDialogOpen}
              onOpenChange={setIsImportDialogOpen}
            >
              <EnrollmentImportDialog
                open={isImportDialogOpen}
                setIsOnOpenChange={setIsImportDialogOpen}
                onSubmit={onSubmitImport}
              />
            </Dialog>
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
            >
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
