'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SubPLO } from '@/types/schema/sub-plo-schema';

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
];
