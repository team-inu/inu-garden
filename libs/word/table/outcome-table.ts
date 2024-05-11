import { Paragraph, TableCell, TableRow, TextRun } from 'docx';
import { toast } from 'sonner';

import {
  Assessment,
  CourseOutcome,
  TabeeOutcome,
} from '@/types/schema/course-portfolio-schema';

export class OutcomeTable {
  public constructor(studentAmount: string) {
    this.tableHeader = [
      'PO/PLO',
      'Course learning outcomes',
      'Assessment Tasks',
      'Passing Criteria (%)',
      `Percentage of Students with PASS outcome (${studentAmount} total students)`,
    ];
  }

  private tableHeader: string[] = [];

  public generate(tabeeOutcomes: TabeeOutcome[]): TableRow[] {
    const contents = tabeeOutcomes.flatMap((tabeeOutcome) => {
      const assessmentCount = tabeeOutcome.courseOutcomes.flatMap(
        (course) => course.assessments,
      ).length;

      const courseRows = tabeeOutcome.courseOutcomes.flatMap(
        (course, courseIndex) => {
          if (!course.assessments) {
            toast.error('Please link the clo to assigment first');
            throw new Error('Please link the clo to assigment first');
          }
          let assessments = course.assessments.flatMap(
            (assessment, assessmentIndex) => {
              let rowNames: string[] = [];
              tabeeOutcome.plos.forEach((plo) => {
                let rowName = 'PLO ' + plo.code + ' (PLO ';
                plo.nested.forEach((splo) => {
                  rowName += splo.code + ' ';
                });
                rowName += ')';
                rowNames.push(rowName);
              });
              rowNames.push('PO ' + tabeeOutcome.code);
              return this.createRow(
                rowNames,
                course,
                tabeeOutcome.courseOutcomes.length,
                assessment,
                assessmentCount,
                courseIndex,
                assessmentIndex,
              );
            },
          );
          assessments.push(
            new TableRow({
              children: [
                this.createCell(
                  [
                    `Students passing ${course.expectedPassingAssignmentPercentage}% of this CLO's assessments`,
                  ],
                  true,
                  1,
                  2,
                ),
                this.createCell([course.passingCloPercentage.toString()], true),
              ],
            }),
          );
          return assessments;
        },
      );

      courseRows.push(
        new TableRow({
          children: [
            this.createCell(
              [
                `Students passing ${tabeeOutcome.expectedCloPercentage}% of this PO's CLOs`,
              ],
              true,
              1,
              3,
            ),
            this.createCell([tabeeOutcome.minimumPercentage.toString()], true),
          ],
        }),
      );

      return courseRows;
    });

    return [
      new TableRow({
        children: this.tableHeader.map((item) => this.createCell([item], true)),
      }),
      ...contents,
    ];
  }

  private createRow(
    tabeeOutcome: string[],
    course: CourseOutcome,
    courseLearningOutcomeCount: number,
    assessment: Assessment,
    assessmentCount: number,
    courseIndex: number,
    assessmentIndex: number,
  ) {
    const children = [];

    if (assessmentIndex === 0 && courseIndex === 0) {
      children.push(
        this.createCell(
          tabeeOutcome,
          true,
          assessmentCount + courseLearningOutcomeCount + 1,
        ),
      );
    }

    if (assessmentIndex === 0) {
      children.push(
        this.createCell(
          [course.code + ': ' + course.name],
          false,
          course.assessments.length + 1,
        ),
      );
    }

    children.push(
      this.createCell([assessment.assessmentTask], false),
      this.createCell([assessment.passingCriteria.toString()], false),
      this.createCell([assessment.studentPassPercentage.toString()], false),
    );

    return new TableRow({ children });
  }

  private createCell(
    texts: string[],
    bold: boolean,
    rowSpan: number = 1,
    colSpan: number = 1,
  ) {
    return new TableCell({
      children: [
        new Paragraph({
          children: texts.map((text, i) => {
            return new TextRun({
              break: i > 0 ? 1 : 0,
              text: text,
              bold: bold,
            });
          }),
        }),
      ],
      rowSpan: rowSpan,
      columnSpan: colSpan,
    });
  }
}
