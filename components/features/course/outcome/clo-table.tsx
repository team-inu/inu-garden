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

import { CloTableToolbar } from '@/components/features/course/outcome/clo-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Option, SelectorOption } from '@/components/ui/data-table-toolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  getValues?: (id: string, code: string) => void;
  isAssignmentLink?: boolean;
  cloId?: string[];
}

export function CourseLearningOutcomeDataTable<TData, TValue>({
  columns,
  data,
  disableToolbar = false,
  disablePagination = false,
  isAssignmentLink = false,
  getValues,
  cloId,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
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

  return (
    <div className="space-y-4">
      {!disableToolbar && (
        <CloTableToolbar
          table={table}
          selectorOptions={[]}
          isCreateEnabled={true}
          isViewOptions={true}
          isAssignmentLink={isAssignmentLink}
          cloId={cloId}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className="font-bold text-primary">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    if (getValues) {
                      getValues(row.getValue('id'), row.getValue('code'));
                    }
                  }}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!disablePagination && <DataTablePagination table={table} isRowSelectionEnabled={false} />}
    </div>
  );
}
