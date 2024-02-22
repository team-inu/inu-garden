'use client';

import { ColumnDef } from '@tanstack/react-table';

import { PoRowActions } from '@/components/features/tabee/po/po-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { PO } from '@/data/schema';

export const columns: ColumnDef<PO>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <div className="hidden">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <PoRowActions row={row} />,
  },
];
