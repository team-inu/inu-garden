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
import { UserCircle } from 'lucide-react';
import * as React from 'react';

import { LecturerTableToolbar } from '@/components/features/lecturer/lecturer-table-toolbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Lecturer } from '@/data/schema';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const lectureres: Option[] = [
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
    options: lectureres,
    title: 'Lecturer',
    columnName: 'lecturer',
  },
];

export function LecturerDataTable<
  TData extends {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    collapsibleContent: string;
  },
  TValue,
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false);
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

  const handleUploadStudent = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // const file = e.target.files?.[0];
    // if (!file) {
    //   return toast.error("Can not read file");
    // }

    // const buffer = await file.arrayBuffer();
    // const workBook = XLSX.read(buffer, { type: "buffer" });

    // const sheet = workBook.Sheets[workBook.SheetNames[1]];

    // const [studentTable] = await worksheetToTables(sheet);

    // const student = tableToObject(studentTable[0], studentTable.slice(1));

    // TODO: push to backend
    // console.log(student);

    e.target.value = '';
  };

  const mockData = [
    {
      code: 'CPE 100',
      name: 'Computer Concepts and Programming',
      student: 40,
      task: 2,
    },
    {
      code: 'CPE 101',
      name: 'Introduction to Computer Engineering and Information Technology',
      student: 41,
      task: 2,
    },
  ];

  var CollapsibleRowContent = ({ row }: { row: Lecturer }) => (
    <td colSpan={6} className="space-y-3 divide-y-2 divide-orange-400">
      {mockData.map((data, key) => (
        <div className="container" key={key}>
          <div className="flex w-full items-center p-5">
            <div className="w-3/4  space-y-2">
              <div className="">
                {data.code}: {data.name}
              </div>

              <div className="flex items-center space-x-2">
                <UserCircle className="h-5 w-5" />
                <div>{data.student}</div>
                <div>
                  <Badge variant={'green'}>Task {data.task}</Badge>
                </div>
              </div>
            </div>

            <div className="flex w-1/4 justify-end space-x-3">
              <Button size={'sm'}>Export file</Button>
              <Button size={'sm'} variant={'secondary'}>
                View Course
              </Button>
            </div>
          </div>
        </div>
      ))}
    </td>
  );

  return (
    <div className="space-y-4">
      <LecturerTableToolbar
        table={table}
        selectorOptions={[]}
        handleImport={handleUploadStudent}
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
                        <CollapsibleRowContent row={row.original} />
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
