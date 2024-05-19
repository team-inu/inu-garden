'use client';

import { ColumnDef } from '@tanstack/react-table';

import { SubPloRowActions } from '@/components/features/tabee/sub-plo/sub-plo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SubPloColumn } from '@/types/schema/sub-plo-schema';

export const columns: ColumnDef<SubPloColumn>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number" />,
    cell: ({ row }) => <div className="">{row.getValue('code')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'descriptionThai',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thai Description" />,
    cell: ({ row }) => <div>{row.getValue('descriptionThai')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'descriptionEng',
    header: ({ column }) => <DataTableColumnHeader column={column} title="English Description" />,
    cell: ({ row }) => <div>{row.getValue('descriptionEng')}</div>,
    enableSorting: false,
  },
  // {
  //   accessorKey: 'programLearningOutcomeId',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="programLearningOutcomeId" />
  //   ),
  //   cell: ({ row }) => <div className="">{row.getValue('programLearningOutcomeId')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    id: 'actions',
    cell: ({ row }) => <SubPloRowActions row={row} />,
  },
];

//dynamic subPloRowActions
