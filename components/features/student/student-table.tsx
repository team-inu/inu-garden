'use client';

import { DialogClose } from '@radix-ui/react-dialog';
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
import { TrashIcon } from 'lucide-react';
import * as React from 'react';

import StudentGradeForm from '@/components/features/student/student-grade-form';
import { StudentTableToolbar } from '@/components/features/student/student-table-toolbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Option, SelectorOption } from '@/components/ui/data-table-toolbar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeleteGrade, useGetGradeByStudentId } from '@/hooks/grade-hook';
import { useGetStudentWithOutcomes } from '@/hooks/student-hook';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const students: Option[] = [
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
    options: students,
    title: 'Admission',
    columnName: 'admission',
  },
];

const CollapsibleRowContent = ({ studentId }: { studentId: string }) => {
  const { data: grades } = useGetGradeByStudentId(studentId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [gradeId, setGradeId] = React.useState('');
  const { mutate } = useDeleteGrade();

  const { data: studentWithOutcomes } = useGetStudentWithOutcomes(studentId);
  console.log('x', studentWithOutcomes);
  const studentWithOutcome = studentWithOutcomes?.[0];

  const onDelete = (gradeId: string) => {
    mutate(gradeId);
  };
  return (
    <td colSpan={16} className="p-5">
      <Tabs>
        <TabsList>
          <TabsTrigger value="grade">Grades</TabsTrigger>
          <TabsTrigger value="overview-po">
            Overviews Program Outcome
          </TabsTrigger>
          <TabsTrigger value="overview-plo">
            Overviews Program Learning Outcome
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grade">
          <>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <StudentGradeForm studentId={studentId} />
            </Dialog>
            <div className="mt-5">
              <Button
                variant="default"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                Add Grade
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={1}>Semester</TableHead>
                    <TableHead colSpan={1}>Grade</TableHead>
                    <TableHead colSpan={1}></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades?.map((e, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {e.semester?.semesterSequence} / {e.semester?.year}
                        </TableCell>
                        <TableCell>{e.grade}</TableCell>
                        <TableCell>
                          <TrashIcon
                            onClick={() => {
                              setIsDeleteDialogOpen(true);
                              setGradeId(e.id);
                            }}
                            className="h-4 w-4 cursor-pointer hover:text-red-500"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are your sure to delete?</DialogTitle>
                  <DialogDescription>
                    {` You can't undo this action. This will permanently delete the.`}
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={() => onDelete(gradeId)}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        </TabsContent>
        <TabsContent value="overview-po">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program outcome</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Pass</TableHead>
              </TableRow>
            </TableHeader>

            {studentWithOutcome?.programOutcomes.map((e, i) => {
              return (
                <TableBody key={e.programOutcomeId} className="border-b">
                  <TableRow>
                    <TableCell colSpan={1} rowSpan={1}>
                      {/* PO */}
                      <TableRow>{e.name}</TableRow>
                    </TableCell>
                    <TableCell rowSpan={3} colSpan={1}>
                      {e.courses.map((course, i) => {
                        return (
                          <TableRow key={i}>
                            {course.code} - {course.name}
                          </TableRow>
                        );
                      })}
                    </TableCell>

                    <TableCell
                      rowSpan={3}
                      colSpan={1}
                      className="flex flex-col gap-5"
                    >
                      {e.courses.map((course, i) => {
                        return (
                          <div key={i}>
                            <Badge
                              variant={course.pass ? 'green' : 'destructive'}
                            >
                              {course.pass ? 'PASSED' : 'FAILED'}
                            </Badge>
                          </div>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </TabsContent>

        <TabsContent value="overview-plo">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program outcome</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Pass</TableHead>
              </TableRow>
            </TableHeader>

            {studentWithOutcome?.programLearningOutcomes.map((e, i) => {
              return (
                <TableBody
                  key={e.programLearningOutcomeId}
                  className="border-b"
                >
                  <TableRow>
                    <TableCell colSpan={1} rowSpan={1}>
                      {/* PO */}
                      <TableRow>{e.descriptionThai}</TableRow>
                    </TableCell>
                    <TableCell rowSpan={3} colSpan={1}>
                      {e.courses.map((course, i) => {
                        return <TableRow key={i}>{course.name}</TableRow>;
                      })}
                    </TableCell>

                    <TableCell
                      rowSpan={3}
                      colSpan={1}
                      className="flex flex-col gap-5"
                    >
                      {e.courses.map((course, i) => {
                        return (
                          <div key={i}>
                            <Badge
                              variant={course.pass ? 'green' : 'destructive'}
                            >
                              {course.pass ? 'PASSED' : 'FAILED'}
                            </Badge>
                          </div>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </TabsContent>
      </Tabs>
    </td>
  );
};

export function StudentDataTable<TData, TValue>({
  columns,
  data,
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

  return (
    <div className="space-y-4">
      <StudentTableToolbar table={table} selectorOptions={inputs} />
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
                        <CollapsibleRowContent studentId={row.getValue('id')} />
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
