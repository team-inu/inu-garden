'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SubPLO } from '@/data/schema';

export const subPloColumns: ColumnDef<SubPLO>[] = [
  {
    accessorKey: 'descriptionThai',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionThai" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue('descriptionThai')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'descriptionEnglish',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionEnglish" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue('descriptionEnglish')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
