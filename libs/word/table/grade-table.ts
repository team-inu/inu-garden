import { TableRow } from 'docx';

import { createCell } from '@/libs/word/utils';
import {
  GradeDistribution,
  GradeFrequency,
} from '@/types/schema/course-portfolio-schema';

export class GradeTable {
  public generate(grade: GradeDistribution) {
    const rows: TableRow[] = [];

    rows.push(
      new TableRow({
        children: [
          createCell('No. of Student', 1, 2),
          createCell(String(grade.studentAmount)),
        ],
      }),
    );

    rows.push(
      new TableRow({
        children: [createCell('GPA', 1, 2), createCell(String(grade.GPA))],
      }),
    );

    rows.push(
      new TableRow({
        children: [
          createCell('Grade'),
          createCell('Grade Score'),
          createCell(''),
        ],
      }),
    );

    const gradeRows = grade.gradeFrequencies.map((e) => this.createGradeRow(e));

    return [...rows, ...gradeRows];
  }

  private createGradeRow(grade: GradeFrequency) {
    return new TableRow({
      children: [
        createCell(grade.name),
        createCell(`≥ ${grade.gradeScore}`),
        createCell(String(grade.frequency)),
      ],
    });
  }
}
