'use client';

import { ColumnDef } from '@tanstack/react-table';

import { PloRowActions } from '@/components/features/tabee/plo/plo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { PLO } from '@/data/schema';

export const columns: ColumnDef<PLO>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <div className="hidden">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div>{row.getValue('code')}</div>
        </>
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
      return <div>{row.getValue('descriptionThai')}</div>;
    },
  },
  {
    accessorKey: 'descriptionEng',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionEng" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('descriptionEng')}</div>;
    },
  },
  {
    accessorKey: 'programYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="programYear" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('programYear')}</div>;
    },
  },
  {
    accessorKey: 'programmeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="programmeId" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('programmeId')}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <PloRowActions row={row} />,
  },
];
