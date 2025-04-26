'use client';

import { Cross2Icon, FileTextIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import excel from 'exceljs';
import { useState } from 'react';
import { toast } from 'sonner';

import PoDialog from '@/components/features/tabee/po/po-dialog';
import PoFilterDialog from '@/components/features/tabee/po/po-filter-dialog';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreatePo } from '@/hooks/po-hook';
import { CreatePoForm, GetCourseWithPo, GetPoResponse, PoReportFilter } from '@/types/schema/po-schema';

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
  pos: GetPoResponse[];
  poResults: GetCourseWithPo[];
}

export function PoTableToolbar<TData>({
  table,
  selectorOptions: something,
  isViewOptions = true,
  isCreateEnabled = true,
  pos,
  poResults,
}: DataTableToolbarProps<TData>) {
  const hasOption = something.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isFiltered = table.getState().columnFilters.length > 0;
  const { mutate, isError } = useCreatePo();

  const onSubmit = (value: CreatePoForm) => {
    mutate(value);
    if (!isError) {
      setIsOpen(false);
    }
  };

  const generate = async (filter: PoReportFilter) => {
    if (pos === undefined || pos.length == 0 || poResults === undefined || poResults.length == 0) {
      return;
    }

    const passingCriteria = filter.passingCriteria;

    const amount = pos.length;

    const workbook = new excel.Workbook();

    const poSheet = workbook.addWorksheet('PO Report');

    poSheet.addRow([`รหัส/รายชื่อวิชา\n(${filter.programme})`, 'ผลลัพธ์ของการศึกษาตามเกณฑ์ที่กำหนด']);

    let header = ['', 'ปี'];
    let columns = [{ width: 15 }, { width: 10 }];

    let coursePoMap = new Map();
    let courseMap = new Map();
    let footerMap = new Map();

    const records = pos.map((po, i) => {
      return {
        ...po,
        ...poResults.find((result) => {
          return result.programOutcomeId == po.id;
        }),
      };
    });
    records.forEach((po, i) => {
      header.push(po.code + '. ' + po.name);
      columns.push({ width: 7 });

      po.courses
        ?.filter((course) => {
          return (
            course.year >= filter.fromYear && course.year <= filter.toYear && course.curriculum == filter.programme
          );
        })
        .forEach((course) => {
          if (course.id == '') {
            return;
          }
          if (!footerMap.get(course.semesterSequence + '/' + course.year)) {
            footerMap.set(course.semesterSequence + '/' + course.year, [
              `จำนวนวิชาที่ผ่านเกณฑ์ (${passingCriteria}%)`,
              course.semesterSequence + '/' + course.year,
            ]);
            for (let i = 0; i < amount; i++) {
              footerMap.get(course.semesterSequence + '/' + course.year).push(0);
            }
          }
          if (course.passingPercentage > passingCriteria) {
            let footerArray = footerMap.get(course.semesterSequence + '/' + course.year);
            footerArray[2 + i] += 1;
          }
          if (!coursePoMap.get(course.code + ' ' + course.name + ',' + course.semesterSequence + ',' + course.year)) {
            coursePoMap.set(course.code + ' ' + course.name + ',' + course.semesterSequence + ',' + course.year, [
              [i + 1, course.passingPercentage],
            ]);
            if (!courseMap.get(course.code + ' ' + course.name)) {
              courseMap.set(course.code + ' ' + course.name, [
                course.code + ' ' + course.name + ',' + course.semesterSequence + ',' + course.year,
              ]);
            } else {
              courseMap
                .get(course.code + ' ' + course.name)
                .push(course.code + ' ' + course.name + ',' + course.semesterSequence + ',' + course.year);
            }
          } else {
            coursePoMap
              .get(course.code + ' ' + course.name + ',' + course.semesterSequence + ',' + course.year)
              .push([i + 1, course.passingPercentage]);
          }
        });
    });

    poSheet.addRow(header);

    if (courseMap.size == 0) {
      poSheet.addRow(['There are no records from the specified years range or curriculum']);
      return workbook;
    }

    poSheet.mergeCells('A1:A2');
    poSheet.mergeCells(1, 2, 1, 2 + amount);

    courseMap.forEach((values, key) => {
      let firstRowIndex = poSheet.rowCount + 1;

      values
        .sort((a: string, b: string) => {
          let aSemester = a.split(',')[1];
          let aYear = Number(a.split(',')[2]);
          let bSemester = b.split(',')[1];
          let bYear = Number(b.split(',')[2]);
          return aYear == bYear ? aSemester.charCodeAt(0) - bSemester.charCodeAt(0) : aYear - bYear;
        })
        .forEach((value: any) => {
          let row = [];
          let splittedValue = value.split(',');
          row.push(splittedValue[0], splittedValue[1] + '/' + splittedValue[2]);
          pos.forEach((_, i) => {
            let cell = '';
            coursePoMap.get(value).forEach((record: any) => {
              if (i + 1 == record[0]) {
                cell = record[1].toFixed(2);
              }
            });
            row.push(cell);
          });
          poSheet.addRow(row);
        });

      let lastRowIndex = poSheet.rowCount;

      poSheet.mergeCells(firstRowIndex, 1, lastRowIndex, 1);
    });

    let firstFooterIndex = poSheet.rowCount + 1;

    Array.from(footerMap.keys())
      .sort((a, b) => {
        let aSemester = a.split('/')[0];
        let aYear = Number(a.split('/')[1]);
        let bSemester = b.split('/')[0];
        let bYear = Number(b.split('/')[1]);
        return aYear == bYear ? aSemester.charCodeAt(0) - bSemester.charCodeAt(0) : aYear - bYear;
      })
      .forEach((key) => {
        poSheet.addRow(footerMap.get(key));
      });

    let lastFooterIndex = poSheet.rowCount;

    poSheet.mergeCells(firstFooterIndex, 1, lastFooterIndex, 1);

    poSheet.columns = columns;
    for (let i = 0; i <= lastFooterIndex; i++) {
      const row = poSheet.getRow(i);

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      });
    }

    return workbook;
  };

  const onDownloadOutcomesReport = async (value: PoReportFilter) => {
    const workbook = await generate(value);

    if (workbook === undefined) {
      toast.error('Failed to generate po report');
      return;
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = 'PO_report.xlsx';
    a.click();

    setIsFilterOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="type here for filter"
          value={searchValue ?? ''}
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
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {isCreateEnabled && (
          <div className="flex space-x-2">
            <Button
              className="ml-auto hidden h-8 bg-green-600 lg:flex"
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(true)}
            >
              <FileTextIcon className="mr-2 h-4 w-4" />
              Export Po Report
            </Button>

            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex" onClick={() => setIsOpen(true)}>
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <PoDialog onSubmit={onSubmit} />
            </Dialog>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PoFilterDialog onSubmit={onDownloadOutcomesReport} />
            </Dialog>
          </div>
        )}
        {isViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
