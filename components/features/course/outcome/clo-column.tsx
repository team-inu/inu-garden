'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CloRowActions } from '@/components/features/course/outcome/clo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CLO } from '@/data/schema';

export const columns: ColumnDef<CLO>[] = [
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="id" />
  //   ),
  //   cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('name')}</span>
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
    id: 'actions',
    cell: ({ row }) => <CloRowActions row={row} />,
  },
];
