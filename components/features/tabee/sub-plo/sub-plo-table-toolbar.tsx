'use client';

import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import SubPloDialog from '@/components/features/tabee/sub-plo/sub-plo-dialog';
import SubPloLinkCloDialog from '@/components/features/tabee/sub-plo/sub-plo-link-clo-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLinkSubPlo } from '@/hooks/clo-hook';
import { useCreateSubPlo } from '@/hooks/sub-plo-hook';
import { CreateSubPloLinkCloType, CreateSubPloType } from '@/types/schema/sub-plo-schema';

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
  subPloId?: string[];
  currentPlo: string;
  isTabee: boolean;
}

export function SubPloTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  subPloId,
  currentPlo,
  isTabee,
}: DataTableToolbarProps<TData>) {
  const cloId = useSearchParams().get('cloId');
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const { mutate, isError } = useCreateSubPlo();
  const { mutate: mutateLink, isError: isLinkError } = useLinkSubPlo();

  const onSubmit = (value: CreateSubPloLinkCloType) => {
    const subPloId = value.subPlos.map((subPlo) => subPlo.value);
    if (cloId) {
      mutateLink({ cloId, subProgramLearningOutcomeId: subPloId });
    } else {
      toast.error('Failed to link Sub-PLO', {
        description: 'Please select a CLO first',
      });
    }
  };

  const onTabeeSubmit = (value: CreateSubPloType) => {
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
              {!isTabee ? (
                <SubPloLinkCloDialog onSubmit={onSubmit} subPloId={subPloId} />
              ) : (
                <SubPloDialog
                  defaultValues={{
                    code: '',
                    descriptionThai: '',
                    descriptionEng: '',
                    programLearningOutcomeId: currentPlo,
                  }}
                  onSubmit={onTabeeSubmit}
                />
              )}
            </Dialog>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
