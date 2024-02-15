"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { useRef, useState } from "react";
import { ImportIcon } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import StudentDialog from "./student-dialog";
export type Option = {
  value: string;
  label: string;
  icon?: any;
};

export type SelectorOption = {
  options: Option[];
  title: string;
  columnName: string;
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectorOptions: SelectorOption[];
  isViewOptions?: boolean;
  isCreateEnabled?: boolean;
  handleImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StudentTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  handleImport,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const isFiltered = table.getState().columnFilters.length > 0;
  const fileImportRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="type here for filter"
          value={searchValue ?? ""}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
            setSearchValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {hasOption &&
          something.map((input, i) => {
            return (
              table.getColumn(input.columnName) && (
                <DataTableFacetedFilter
                  column={table.getColumn(input.columnName)}
                  title={input.title}
                  options={input.options}
                  key={i}
                />
              )
            );
          })}

        {hasOption && isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-x-2 flex">
        {isCreateEnabled && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <StudentDialog onSubmit={() => {}} />
            </Dialog>

            <Input
              type="file"
              className="hidden"
              ref={fileImportRef}
              onChange={handleImport}
            />
            <Button
              className="ml-auto hidden h-8 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => fileImportRef.current?.click()}
            >
              <ImportIcon className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
