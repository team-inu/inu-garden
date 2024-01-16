"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Assignement } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { AssigmentRowActions } from "./assignment-row-action";

export const columns: ColumnDef<Assignement>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "clo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="clo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("clo")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "plo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="plo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("plo")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "po",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="po" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("po")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "weigth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="weigth" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("weigth")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="dueDate" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue("dueDate")}
          </span>
        </div>
      );
    },

  },

  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="percentage" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {row.getValue("percentage")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AssigmentRowActions row={row} />,
  },
];
