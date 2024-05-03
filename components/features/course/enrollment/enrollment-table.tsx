'use client';

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
import { PlusCircleIcon, XIcon } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { EnrollmentTableToolbar } from '@/components/features/course/enrollment/enrollment-table-toolbar';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import { EnrollmentResultPloPo } from '@/types/schema/course-portfolio-schema';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isCreateEnabled?: boolean;
  outcomeData: EnrollmentResultPloPo[];
}

export const studentStatus: Option[] = [
  {
    label: 'ENROLL',
    value: 'ENROLL',
    icon: PlusCircleIcon,
  },
  {
    label: 'WITHDRAW',
    value: 'WITHDRAW',
    icon: XIcon,
  },
];

const inputs: SelectorOption[] = [
  {
    options: studentStatus,
    title: 'Status',
    columnName: 'status',
  },
];

export function EnrollmentDataTable<TData, TValue>({
  columns,
  data,
  isCreateEnabled = true,
  outcomeData,
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

  const handleUploadEnrollment = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const sheet = workBook.Sheets[workBook.SheetNames[1]];

    const [studentTable] = await worksheetToTables(sheet);

    const student = tableToObject(studentTable[0], studentTable.slice(1));

    e.target.value = '';
  };

  // {student?.plo.map((plo) => (
  //   <div key={plo.ploName} className="flex justify-between">
  //     <span>{plo.ploName}</span>
  //     <span>{plo.pass ? 'Pass' : 'Fail'}</span>
  //   </div>
  // ))}
  // {student?.po.map((po) => (
  //   <div key={po.poName} className="flex justify-between">
  //     <span>{po.poName}</span>
  //     <span>{po.pass ? 'Pass' : 'Fail'}</span>
  //   </div>
  // ))}

  const CollapsibleRowContent = ({ studentId }: { studentId: string }) => {
    const student = outcomeData.find(
      (student) => student.studentId === studentId,
    );
    return (
      <td colSpan={7} className="space-y-3 divide-y-2 divide-orange-400">
        <div className="p-5">
          <Tabs defaultValue="plo" className="space-y-4">
            <TabsList>
              <TabsTrigger value="plo">Program Learning Outcome</TabsTrigger>
              <TabsTrigger value="po">Program Outcome</TabsTrigger>
            </TabsList>

            <TabsContent
              value="plo"
              className=" space-y-3 rounded-xl bg-secondary p-3"
            >
              <div className="flex flex-col justify-center gap-5">
                {/* make it nice table */}
                {student ? (
                  student.programLearningOutcomes.map((plo) => (
                    <div key={plo.id} className="flex  gap-5  ">
                      <span className="text-lg ">
                        PLO{plo.code}-{plo.descriptionThai}:{' '}
                      </span>
                      <Badge
                        className="text-lg"
                        variant={plo.pass ? 'green' : 'destructive'}
                      >
                        {plo.pass ? 'Pass' : 'Fail'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center text-lg ">
                    No data
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent
              value="po"
              className="space-y-3 rounded-xl bg-secondary p-3 "
            >
              <div className="flex flex-col justify-center gap-5">
                {student ? (
                  student.programOutcomes.map((po) => (
                    <div key={po.id} className="flex gap-5">
                      <span className="text-lg ">{po.name}: </span>
                      <Badge
                        className="text-lg"
                        variant={po.pass ? 'green' : 'destructive'}
                      >
                        {po.pass ? 'Pass' : 'Fail'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center text-lg ">
                    No data
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </td>
    );
  };

  return (
    <div className="space-y-4">
      <EnrollmentTableToolbar
        table={table}
        selectorOptions={inputs}
        handleImport={handleUploadEnrollment}
        isCreateEnabled={isCreateEnabled}
      />
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
                        <CollapsibleRowContent
                          studentId={row.getValue('studentId')}
                        />
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
      <DataTablePagination table={table} />
    </div>
  );
}
