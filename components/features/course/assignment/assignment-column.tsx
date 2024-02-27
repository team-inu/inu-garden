'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AssigmentRowActions } from '@/components/features/course/assignment/assignment-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { AssignmentColumn } from '@/types/schema/assignment-schema';

export const columns: ColumnDef<AssignmentColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="hidden"
        hidden
        title="Task"
      />
    ),
    cell: ({ row }) => <div className="hidden">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue('name')}</span>;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue('description')}</span>;
    },
  },
  {
    accessorKey: 'maxScore',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Score" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue('maxScore')}</span>;
    },
  },
  {
    accessorKey: 'courseLearningOutcomesId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="clo" />
    ),
    cell: ({ row }) => {
      //TODO: get clo name from id
      return <span></span>;
    },
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('weight')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'expectedPassingStudentPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ExpectedPassingStudent%" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue('expectedPassingStudentPercentage')}</span>;
    },
  },
  {
    accessorKey: 'expectedScorePercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ExpecteScore%" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue('expectedScorePercentage')}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <AssigmentRowActions row={row} />,
  },
];
