'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CloRowActions } from '@/components/features/course/outcome/clo-row-action';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CloColumn } from '@/types/schema/clo-shema';

export const cloColumn: ColumnDef<CloColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="hidden" title="Id" />
    ),
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
        <span className=" truncate font-medium">{row.getValue('code')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="CLO Description"
        className=""
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-20 font-medium">{row.getValue('description')}</span>
      );
    },
  },

  {
    accessorKey: 'expectedPassingAssignmentPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Expected Passing Assessments %"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className=" flex items-center justify-center font-medium">
          {row.getValue('expectedPassingAssignmentPercentage')}
        </span>
      );
    },
  },

  {
    accessorKey: 'expectedPassingStudentPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Expected Passing Students %"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="flex items-center justify-center font-medium">
          {row.getValue('expectedPassingStudentPercentage')}
        </span>
      );
    },
  },

  {
    accessorKey: 'programOutcomeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PO" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate">{row.getValue('programOutcomeName')}</span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <span className="">{row.getValue('status')}</span>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <CloRowActions row={row} />,
  },
];
