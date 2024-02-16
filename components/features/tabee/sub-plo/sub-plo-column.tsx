"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SubPLO } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { SubPloRowActions } from "./sub-plo-row-action";


export const columns: ColumnDef<SubPLO>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "descriptionThai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionThai" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("descriptionThai")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "descriptionEnglish",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="descriptionEnglish" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("descriptionEnglish")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "actions",
    cell: ({ row }) => <SubPloRowActions row={row} />,
  },
];
