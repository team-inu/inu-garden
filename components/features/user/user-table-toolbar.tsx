'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { FolderDotIcon, ImportIcon } from 'lucide-react';
import { useState } from 'react';

import LecturerDialog from '@/components/features/user/user-dialog';
import LecturerImportDialog from '@/components/features/user/user-import-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateLecturer, useCreateManyLecturers } from '@/hooks/user-hook';
import {
  CreateLecturerForm,
  CreateManyLecturerForm,
} from '@/types/schema/user-schema';

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

export function LecturerTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  handleImport,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isAddLecturerOpen, setIsAddLecturerOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const { mutate: createLecturer, isError: isCreateLecturerError } =
    useCreateLecturer();
  const { mutate: createManyLecturers, isError: isCreateManyLecturerError } =
    useCreateManyLecturers();

  const onSubmitAddLecturer = (value: CreateLecturerForm) => {
    console.log('hihi');
    createLecturer(value);
    if (!isCreateLecturerError) {
      setIsAddLecturerOpen(false);
    }
  };

  const onSubmitImport = (value: CreateManyLecturerForm) => {
    createManyLecturers(value);
    if (!isCreateManyLecturerError) {
      setIsImportOpen(false);
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
              onClick={() => setIsAddLecturerOpen(true)}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog
              open={isAddLecturerOpen}
              onOpenChange={setIsAddLecturerOpen}
            >
              <LecturerDialog onSubmit={onSubmitAddLecturer} />
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
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/lecturer.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>
            <LecturerImportDialog
              open={isImportOpen}
              isOnOpenChange={setIsImportOpen}
              onSubmit={onSubmitImport}
            />
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
