import Excel from 'exceljs';

import {
  AssignmentInfoSchema,
  AssignmentPercentageInfoSchema,
  CloInfoSchema,
  CorseInfoSchema,
  PercentageThresholdInfoSchema,
  PercentageThresholdTableSchema,
} from '@/libs/spreadsheet/plansheet/schema';

export class PlanSheet {
  public constructor() {}

  public parseOutcomeSheet(sheet: Excel.Worksheet) {
    const result = this.parseGenericSheet(sheet);

    const courseInfo = result[0][0];
    const clo = result[1];
    const assignmentPercentage = result[2];
    const percentageThreshold = result[3];

    const percentageTable = PercentageThresholdTableSchema.parse(percentageThreshold);

    const percentageData = PercentageThresholdInfoSchema.parse({
      PassingScoreThres: percentageTable.find((e) => e.Item === 'PassingScoreThres')?.Value,
      PassingStudentThres: percentageTable.find((e) => e.Item === 'PassingStudentThres')?.Value,
      PassingItemsThres: percentageTable.find((e) => e.Item === 'PassingItemsThres')?.Value,
      PassingCLOsThres: percentageTable.find((e) => e.Item === 'PassingCLOsThres')?.Value,
    });

    return {
      courseInfo: CorseInfoSchema.parse(courseInfo),
      cloInfo: CloInfoSchema.parse(clo),
      assignmentPercentage: AssignmentPercentageInfoSchema.parse(assignmentPercentage),
      percentageThreshold: percentageData,
    };
  }

  public parseWeeklyPlanSheet(sheet: Excel.Worksheet) {
    const result = this.parseGenericSheet(sheet);

    const assignments = result[0];

    return { assignmentInfo: AssignmentInfoSchema.parse(assignments) };
  }

  public parseScoreSheet(sheet: Excel.Worksheet) {
    const result = this.parseGenericSheet(sheet);

    const scores = result[0];

    return {
      scoresInfo: scores as {
        ID: string;
        Name: string;
        [key: string]: number | string;
      }[],
    };
  }

  private parseGenericSheet(sheet: Excel.Worksheet): any[] {
    const rows = sheet.getRows(1, sheet.rowCount);
    if (rows === undefined) {
      console.log('cannot get rows');
      return [];
    }

    const tables: any[] = [];
    let table: any[] = [];

    let currentHeader: Excel.CellValue[] | { [key: string]: Excel.CellValue } = [];

    for (const { values: rawValues } of rows) {
      if (!Array.isArray(rawValues)) {
        continue;
      }

      const values = rawValues.slice(1);

      if (currentHeader.length === 0) {
        currentHeader = this.filterBeforeEmpty(values);
        continue;
      }

      if (values.length === 0 || values.slice(0, currentHeader.length).every((e) => e === undefined)) {
        tables.push(table);

        currentHeader = [];
        table = [];
        continue;
      }

      const data: any = {};

      currentHeader.forEach((header, i) => {
        const value = values[i];

        data[header as string] = value;
      });

      table.push(data);
    }

    tables.push(table);

    return tables;
  }

  /**
   * @example
   * returns [1, 2, 3, 4, 5]
   * filterBeforeEmpty([1, 2, 3, 4, undefined, 5, 6])
   */
  private filterBeforeEmpty<T>(originals: T[]): T[] {
    const filtered: T[] = [];

    for (const original of originals) {
      if (original === undefined) {
        break;
      }

      filtered.push(original);
    }

    return filtered;
  }
}
