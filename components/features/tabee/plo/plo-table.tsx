'use client';

import { CircleIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { PloTableToolbar } from '@/components/features/tabee/plo/plo-table-toolbar';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Option, SelectorOption } from '@/components/ui/data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetPloWithCourse } from '@/hooks/plo-hook';

export const ploes: Option[] = [
  {
    value: 'โครงการ 2B',
    label: 'โครงการ 2B',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'โครงการ 3B',
    label: 'โครงการ 3B',
    icon: CircleIcon,
  },
];

const inputs: SelectorOption[] = [
  {
    options: ploes,
    title: 'Plo',
    columnName: 'plo',
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disableToolbar?: boolean;
  disablePagination?: boolean;
  getValues: (id: string, code: string) => void;
}

export function ProgramLearningOutcomeDataTable<TData, TValue>({
  columns,
  data,
  disableToolbar = false,
  disablePagination = false,
  getValues,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const { data: plos } = useGetPloWithCourse();

  const CollapsibleRowContent = ({ ploId }: { ploId: string }) => {
    if (!plos) {
      return <div>Loading</div>;
    }

    const plo = plos?.find((e) => e.programLearningOutcomeId === ploId);

    if (plo?.courses.every((e) => e.code === '')) {
      return (
        <td colSpan={8}>
          <div className="flex w-full justify-center p-5 text-lg font-bold">
            No courses found
          </div>
        </td>
      );
    }

    return (
      <td colSpan={8} className="space-y-3 divide-y-2 p-5">
        <div className="grid grid-cols-3 gap-5">
          {plo?.courses.map((data, key) => {
            if (data.code === '') {
              return;
            }

            return (
              <div className="flex justify-between border-2 p-5" key={key}>
                <div>
                  <div className="text-lg font-bold">
                    {' '}
                    {data.code}: {data.name}{' '}
                  </div>
                  <div>
                    {data.year} / {data.semesterSequence}
                  </div>
                </div>
                <Badge variant="green">{data.passingPercentage} %</Badge>
              </div>
            );
          })}
        </div>
      </td>
    );
  };

  return (
    <div className="space-y-4">
      {!disableToolbar && (
        <PloTableToolbar
          table={table}
          selectorOptions={[]}
          isCreateEnabled={true}
          isViewOptions={true}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Collapsible key={row.id} asChild>
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() =>
                        getValues(row.getValue('id'), row.getValue('code'))
                      }
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    <CollapsibleContent asChild className="bg-black">
                      <tr>
                        <CollapsibleRowContent ploId={row.getValue('id')} />
                      </tr>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!disablePagination && (
        <DataTablePagination table={table} isRowSelectionEnabled={false} />
      )}
    </div>
  );
}
