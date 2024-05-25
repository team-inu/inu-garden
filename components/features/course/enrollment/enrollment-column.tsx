'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { EnrollmentRowActions } from '@/components/features/course/enrollment/enrollment-row-action';
import { studentStatus } from '@/components/features/course/enrollment/enrollment-table';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { EnrollmentColumn } from '@/types/schema/enrollment-schema';

export const columns: ColumnDef<EnrollmentColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Enrollment Id" className="hidden" />,
    cell: ({ row }) => <div className="hidden w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'studentId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Id" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('studentId')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="First Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('firstName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('lastName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = studentStatus.find((status) => status.value === row.getValue('status'));

      if (!status) {
        return null;
      }
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{status.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="truncate font-medium">{row.getValue('email')}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: 'outcome',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Outcome" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <CollapsibleTrigger>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <EnrollmentRowActions row={row} />,
  },
];
