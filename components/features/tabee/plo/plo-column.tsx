'use client';

import { ColumnDef } from '@tanstack/react-table';

import { PloRowActions } from '@/components/features/tabee/plo/plo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { PloColumn } from '@/types/schema/plo-schema';

export const columns: ColumnDef<PloColumn>[] = [
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
      <DataTableColumnHeader column={column} title="Code" />
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
      <DataTableColumnHeader column={column} title="Thai Description" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('descriptionThai')}</div>;
    },
  },
  {
    accessorKey: 'descriptionEng',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="English Description" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('descriptionEng')}</div>;
    },
  },
  {
    accessorKey: 'programYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Year" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('programYear')}</div>;
    },
  },
  {
    accessorKey: 'programmeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curriculum" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('programmeName')}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <PloRowActions row={row} />,
  },
];
