'use client';

import { ColumnDef } from '@tanstack/react-table';

import { SubPloUnlinkClo } from '@/components/features/tabee/sub-plo/sub-plo-unlink-clo';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SubPloColumn } from '@/types/schema/sub-plo-schema';

export const subPloStaticColumn: ColumnDef<SubPloColumn>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('code')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'descriptionThai',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description Thai" />
    ),
    cell: ({ row }) => <div>{row.getValue('descriptionThai')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'descriptionEng',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description English" />
    ),
    cell: ({ row }) => <div>{row.getValue('descriptionEng')}</div>,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <SubPloUnlinkClo row={row} />,
  },
];

//dynamic subPloRowActions
