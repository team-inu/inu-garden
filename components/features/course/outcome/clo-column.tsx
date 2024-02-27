'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CloRowActions } from '@/components/features/course/outcome/clo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CLO } from '@/data/schema';

export const columns: ColumnDef<CLO>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('code')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },

  {
    accessorKey: 'expectedPassingAssignmentPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="expectedPassingAssignmentPercentage"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('expectedPassingAssignmentPercentage')}
        </span>
      );
    },
  },

  {
    accessorKey: 'expectedPassingStudentPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="expectedPassingStudentPercentage"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('expectedPassingStudentPercentage')}
        </span>
      );
    },
  },

  {
    accessorKey: 'expectedScorePercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="expectedScorePercentage" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('expectedScorePercentage')}
        </span>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <CloRowActions row={row} />,
  },
];
