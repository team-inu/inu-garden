'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { StudentRowActions } from '@/components/features/student/student-row-action';
import { students } from '@/components/features/student/student-table';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { StudentColumn } from '@/types/schema/student-schema';

export const columns: ColumnDef<StudentColumn>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Results" />
    ),
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Student Id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'sticky right-0',
    },
  },
  // {
  //   accessorKey: 'admissionId',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Admission ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[80px]">{row.getValue('admissionId')}</div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('firstName')}
        </span>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('lastName')}</span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('email')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'departmentName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('departmentName')}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'programmeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Programme" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('programmeName')}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'admission',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admission" />
    ),
    cell: ({ row }) => {
      const admission = students.find(
        (label) => label.value === row.getValue('admission'),
      );

      if (!admission) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{admission.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'GPAX',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GPAX" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue('GPAX')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'mathGPA',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Math GPA" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('mathGPA')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'engGPA',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eng GPA" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('engGPA')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'sciGPA',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sci GPA" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('sciGPA')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'school',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="School" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('school')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('city')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'remark',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remarks" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('remark')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <StudentRowActions row={row} />,
  },
];
