'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ScoreRowActions } from '@/components/features/course/score/score-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ScoreColumn } from '@/types/schema/score-schema';

export const columns: ColumnDef<ScoreColumn>[] = [
  {
    accessorKey: 'studentId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Id" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('studentId')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('firstName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('lastName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'score',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('score')}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ScoreRowActions row={row} />,
  },
];
