'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import AssignmentDialog from '@/components/features/course/assignment/assignment-add-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateAssignment } from '@/hooks/assignment-hook';
import { CreateAssignmentForm } from '@/types/schema/assignment-schema';

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

export function AssignmentTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  handleImport,
}: DataTableToolbarProps<TData>) {
  const assignmentGroupId = useSearchParams().get('assignmentGroupId');
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { mutate, isError } = useCreateAssignment();

  const HandleSubmitAssignment = (values: CreateAssignmentForm) => {
    if (!assignmentGroupId) {
      return toast.error('Assessment Group is required.', {
        description: 'Please select an assessment group to add an assessment.',
      });
    }
    mutate({
      assignmentGroupId: assignmentGroupId,
      assignment: values,
    });

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
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {isCreateEnabled && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex" onClick={() => setIsOpen(true)}>
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <AssignmentDialog onSubmit={HandleSubmitAssignment} />
            </Dialog>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
