'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CloUnlinkAssignment } from '@/components/features/course/outcome/clo-unlink-assignment';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CloColumn } from '@/types/schema/clo-shema';

export const cloStaticColumn: ColumnDef<CloColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => {
      return <span className="truncate font-medium">{row.getValue('code')}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => {
      return <span className="truncate font-medium">{row.getValue('description')}</span>;
    },
  },

  {
    accessorKey: 'expectedPassingAssignmentPercentage',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expected Passing Assessments %" />,
    cell: ({ row }) => {
      return <span className="truncate font-medium">{row.getValue('expectedPassingAssignmentPercentage')}</span>;
    },
  },

  {
    accessorKey: 'expectedPassingStudentPercentage',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expected Passing Students %" />,
    cell: ({ row }) => {
      return <span className="truncate font-medium">{row.getValue('expectedPassingStudentPercentage')}</span>;
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return <span className="">{row.getValue('status')}</span>;
    },
  },

  {
    id: 'actions',
    cell: ({ row, column }) => <CloUnlinkAssignment row={row} column={column} />,
  },
];
