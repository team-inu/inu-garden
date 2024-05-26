'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AssignmentGroupRowActions } from '@/components/features/course/assignment/group/assignment-group-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { AssignmentGroupColumn } from '@/types/schema/assignment-group-schema';

export const columns: ColumnDef<AssignmentGroupColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} className="hidden" hidden title="Task" />,
    cell: ({ row }) => <div className="hidden">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <span>{row.getValue('name')}</span>;
    },
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('weight')}</span>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <AssignmentGroupRowActions row={row} />,
  },
];
