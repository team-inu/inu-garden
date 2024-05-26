import { CharacterSet, Document, IParagraphOptions, Packer, Paragraph, TextRun } from 'docx';

import { CreateCoursePortfolioForm } from '@/types/schema/course-portfolio-schema';

const INDENT = 300;

export async function generatePortfolioDocument({ info, summary, result, development }: CreateCoursePortfolioForm) {
  const font = await fetch('/fonts/THSarabunNew/THSarabunNew.ttf');
  const buff = Buffer.from(await font.arrayBuffer());

  const doc = new Document({
    fonts: [{ name: 'THSarabunNew', data: buff, characterSet: CharacterSet.ANSI }],
    styles: {
      paragraphStyles: [
        {
          id: 'normalStyle',
          run: {
            size: 24,
            font: 'THSarabunNew',
          },
        },
        {
          id: 'boldStyle',
          basedOn: 'normalStyle',
          run: {
            bold: true,
            font: 'THSarabunNew',
          },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: 'bigList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.  ',
              alignment: 'numTab',
            },
          ],
        },
        {
          reference: 'summaryList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '1.%1  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'methodList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT * 2,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'objectiveList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT * 2,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'outcomeList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '2.%1  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'POList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT * 2,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'devList',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '3.%1  ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT,
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'documentList',
          levels: [
            {
              level: 0,
              format: 'bullet',
              text: '\u2610 ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT,
                  },
                },
              },
            },
            {
              level: 1,
              format: 'bullet',
              text: '\u2611 ',
              alignment: 'numTab',
              style: {
                paragraph: {
                  indent: {
                    left: INDENT,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          createParagraph({
            children: [new TextRun({ text: 'Course Portfolio', bold: true })],
            alignment: 'center',
          }),
          createParagraph({
            children: [new TextRun({ text: 'รายวิชา: \t', bold: true }), new TextRun({ text: info.courseName })],
          }),
          createParagraph({
            children: [
              new TextRun({ text: 'ผู้สอน: \t', bold: true }),
              new TextRun({ text: info.lecturers.join(', ') }),
            ],
          }),
          createParagraph({
            text: 'สรุปการดำเนินงาน',
            style: 'boldStyle',
            numbering: {
              reference: 'bigList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'การสอน',
            style: 'boldStyle',
            numbering: {
              reference: 'summaryList',
              level: 0,
            },
          }),

          // ...summary.teachingMethod.map((method) => {
          //   return createParagraph({
          //     text: method.name,
          //     style: 'boldStyle',
          //     numbering: {
          //       reference: 'methodList',
          //       level: 0,
          //     },
          //   });
          // }),

          createParagraph({
            text: summary.onlineTools,
            style: 'boldStyle',
            numbering: {
              reference: 'summaryList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'วัตถุประสงค์รายวิชา',
            style: 'boldStyle',
            numbering: {
              reference: 'summaryList',
              level: 0,
            },
          }),

          // ...summary.objective.map((objective) => {
          //   return createParagraph({
          //     text: objective.name,
          //     numbering: {
          //       reference: 'objectiveList',
          //       level: 0,
          //     },
          //   });
          // }),

          createParagraph({
            text: 'ผลการศึกษา',
            style: 'boldStyle',
            numbering: {
              reference: 'bigList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'เกรด',
            style: 'boldStyle',
            numbering: {
              reference: 'outcomeList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'รูป 2.1 เกรด',
            indent: {
              left: INDENT * 2,
            },
          }),
          // new GradeTable().generate(outcome.grade),
          // createParagraph({
          //   text: 'ตาราง 2.1 Grade Distribution',
          //   indent: {
          //     left: INDENT * 2,
          //   },
          // }),
          createParagraph({
            text: 'Program Outcome',
            style: 'boldStyle',
            numbering: {
              reference: 'outcomeList',
              level: 0,
            },
          }),

          // ...outcome.programOutcomes.map((programOutcome) => {
          //   return createParagraph({
          //     text: programOutcome.tabeeOutcome,
          //     numbering: {
          //       reference: 'POList',
          //       level: 0,
          //     },
          //   });
          // }),
          createParagraph({
            text: 'ตาราง 2.2 ผลการประเมิน TABEE Outcome',
            indent: {
              left: INDENT * 2,
            },
          }),
          // new OutcomeTable().generate(outcome.programOutcomes),
          createParagraph({
            text: 'การพัฒนา',
            style: 'boldStyle',
            numbering: {
              reference: 'bigList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'แนวทางการพัฒนาจากรอบที่แล้ว (Plan)',
            style: 'boldStyle',
            numbering: {
              reference: 'devList',
              level: 0,
            },
          }),

          ...development.plans.map((plan) => {
            return createParagraph({
              text: plan.name,
              bullet: {
                level: 0,
              },
            });
          }),
          createParagraph({
            text: 'การพัฒนาและปัญหาหลัก (Do & Check)',
            style: 'boldStyle',
            numbering: {
              reference: 'devList',
              level: 0,
            },
          }),

          ...development.doAndChecks.map((doAndCheck) => {
            return createParagraph({
              text: doAndCheck.name,
              bullet: {
                level: 0,
              },
            });
          }),
          createParagraph({
            text: 'แนวทางการปรับปรุงหลักในรอบหน้า (Act)',
            style: 'boldStyle',
            numbering: {
              reference: 'devList',
              level: 0,
            },
          }),

          ...development.acts.map((act) => {
            return createParagraph({
              text: act.name,
              bullet: {
                level: 0,
              },
            });
          }),
          createParagraph({
            text: 'ความเห็นสำหรับวิชาอื่น',
            style: 'boldStyle',
            numbering: {
              reference: 'devList',
              level: 0,
            },
          }),
          createParagraph({
            text: 'วิชา Upstream',
            style: 'boldStyle',
            indent: {
              left: INDENT * 2,
            },
          }),

          ...development.subjectComments.upstreamSubjects.map((upstreamSubject) => {
            return createParagraph({
              text: `${upstreamSubject.courseName}: ${upstreamSubject.comments}`,
              bullet: {
                level: 1,
              },
            });
          }),
          createParagraph({
            text: 'วิชา Downstream',
            style: 'boldStyle',
            indent: {
              left: INDENT * 2,
            },
          }),

          ...development.subjectComments.downstreamSubjects.map((downstream) => {
            return createParagraph({
              text: `${downstream.courseName}: ${downstream.comments}`,
              bullet: {
                level: 1,
              },
            });
          }),
          createParagraph({
            text: 'วิชาอื่นๆ (ถ้ามี)',
            style: 'boldStyle',
            indent: {
              left: INDENT * 2,
            },
          }),

          // ...development.subjectsComments.other.map((other) => {
          //   return createParagraph({
          //     text: other,
          //     bullet: {
          //       level: 1,
          //     },
          //   });
          // }),
          createParagraph({
            text: development.subjectComments.other,
            bullet: {
              level: 1,
            },
          }),

          createParagraph({
            text: 'ความเห็นอื่นๆ (ถ้ามี)',
            style: 'boldStyle',
            numbering: {
              reference: 'devList',
              level: 0,
            },
          }),
          // ...development.otherComments.map((otherComment) => {
          //   return createParagraph({
          //     text: otherComment,
          //     bullet: {
          //       level: 0,
          //     },
          //   });
          // }),
          createParagraph({
            text: development.otherComment,
            bullet: {
              level: 0,
            },
          }),

          createParagraph({
            text: 'เอกสารแนบ',
            style: 'boldStyle',
            numbering: {
              reference: 'bigList',
              level: 0,
            },
          }),

          createParagraph({
            numbering: {
              reference: 'documentList',
              level: 0,
            },
            children: [new TextRun('not submitted docs')],
          }),
          createParagraph({
            numbering: {
              reference: 'documentList',
              level: 1,
            },
            children: [new TextRun('submitted docs')],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = 'my.docx';
  link.click();
}

let createParagraph = (options: IParagraphOptions): Paragraph => {
  return new Paragraph({
    ...options,
    style: options.style ? options.style : 'normalStyle',
  });
};
