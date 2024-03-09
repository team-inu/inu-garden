import { Paragraph, TableCell, TableRow, TextRun } from 'docx';

import {
  Assessment,
  CourseOutcome,
  TabeeOutcome,
} from '@/types/schema/course-portfolio-schema';

export class OutcomeTable {
  private readonly tableHeader = [
    'TABEE outcomes',
    'Course outcomes',
    'Assessment Tasks',
    'Passing Criteria (%)',
    'Percentage of Students with PASS outcome (98 total students)',
  ];

  public generate(tabeeOutcomes: TabeeOutcome[]): TableRow[] {
    const contents = tabeeOutcomes.flatMap(
      ({ courseOutcomes, name, minimumPercentage }) => {
        const assessmentCount = courseOutcomes.flatMap(
          (course) => course.assessments,
        ).length;

        const courseRows = courseOutcomes.flatMap((course, courseIndex) => {
          return course.assessments.flatMap((assessment, assessmentIndex) => {
            return this.createRow(
              name,
              course,
              assessment,
              assessmentCount,
              courseIndex,
              assessmentIndex,
            );
          });
        });

        courseRows.push(
          new TableRow({
            children: [
              this.createCell(
                'percentage of students with PASS outcome for at least one assessment task',
                true,
                1,
                3,
              ),
              this.createCell(minimumPercentage, true),
            ],
          }),
        );

        return courseRows;
      },
    );

    return [
      new TableRow({
        children: this.tableHeader.map((item) => this.createCell(item, true)),
      }),
      ...contents,
    ];
  }

  private createRow(
    tabeeOutcome: string,
    course: CourseOutcome,
    assessment: Assessment,
    assessmentCount: number,
    courseIndex: number,
    assessmentIndex: number,
  ) {
    const children = [];

    if (assessmentIndex === 0 && courseIndex === 0) {
      children.push(this.createCell(tabeeOutcome, true, assessmentCount + 1));
    }

    if (assessmentIndex === 0) {
      children.push(
        this.createCell(course.name, false, course.assessments.length),
      );
    }

    children.push(
      this.createCell(assessment.assessmentTask, false),
      this.createCell(assessment.passingCriteria, false),
      this.createCell(assessment.studentPassPercentage, false),
    );

    return new TableRow({ children });
  }

  private createCell(
    text: string,
    bold: boolean,
    rowSpan: number = 1,
    colSpan: number = 1,
  ) {
    return new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: text, bold: bold })],
        }),
      ],
      rowSpan: rowSpan,
      columnSpan: colSpan,
    });
  }
}
