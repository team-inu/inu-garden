import { Paragraph, Table, TableCell, TableRow } from 'docx';

import { createCell } from '@/libs/word/utils';
import {
  AssessmentType,
  CourseType,
  ProgramOutcomeType,
} from '@/types/schema/course-portfolio-schema';

export class OutcomeTable {
  private readonly tableHeader = [
    'TABEE outcomes',
    'Course outcomes',
    'Assessment Tasks',
    'Passing Criteria (%)',
    'Percentage of Students with PASS outcome (98 total students)',
  ];

  public generate(programOutcomes: ProgramOutcomeType[]): Table {
    const contents = programOutcomes.flatMap(
      ({ courses, tabeeOutcome, minimumPercentage }) => {
        const assessmentCount = courses.flatMap(
          (course) => course.assessments,
        ).length;

        const courseRows = courses.flatMap((course, courseIndex) => {
          return course.assessments.flatMap((assessment, assessmentIndex) => {
            return this.createRow(
              tabeeOutcome,
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
              createCell(
                'percentage of students with PASS outcome for at least one assessment task',
                1,
                3,
              ),
              createCell(minimumPercentage),
            ],
          }),
        );

        return courseRows;
      },
    );

    const fuckingTable = new Table({
      rows: [
        new TableRow({
          children: this.tableHeader.map((item) => createCell(item)),
        }),
        ...contents,
      ],
    });

    return fuckingTable;
  }

  private createRow(
    tabeeOutcome: string,
    course: CourseType,
    assessment: AssessmentType,
    assessmentCount: number,
    courseIndex: number,
    assessmentIndex: number,
  ) {
    const children = [];

    if (assessmentIndex === 0 && courseIndex === 0) {
      children.push(createCell(tabeeOutcome, assessmentCount + 1));
    }

    if (assessmentIndex === 0) {
      children.push(
        createCell(course.courseOutcome, course.assessments.length),
      );
    }

    children.push(
      createCell(assessment.assessmentTask),
      createCell(assessment.passingCriteria),
      createCell(assessment.studentPassPercentage),
    );

    return new TableRow({ children });
  }
}
