'use client';

import { ColumnDef } from '@tanstack/react-table';

import { SubPloRowActions } from '@/components/features/tabee/sub-plo/sub-plo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SubPLO } from '@/data/schema';

export const columns: ColumnDef<SubPLO>[] = [
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
    accessorKey: 'descriptionThai',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description Thai" />
    ),
    cell: ({ row }) => <div>{row.getValue('descriptionThai')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'descriptionEnglish',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description English" />
    ),
    cell: ({ row }) => <div>{row.getValue('descriptionEnglish')}</div>,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <SubPloRowActions row={row} />,
  },
];
