'use client';

import { ColumnDef } from '@tanstack/react-table';

import { PloRowActions } from '@/components/features/tabee/plo/plo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { PLO } from '@/data/schema';

export const columns: ColumnDef<PLO>[] = [
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
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('code')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'descriptionThai',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionThai" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue('descriptionThai')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'descriptionEng',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionEng" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue('descriptionEng')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'programYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="programYear" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue('programYear')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'programmeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="programmeId" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue('programmeId')}
          </span>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <PloRowActions row={row} />,
  },
];
