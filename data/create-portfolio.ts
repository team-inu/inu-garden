import { CreateCoursePortfolioSchemaType } from '@/types/schema/course-portfolio-schema';

export const coursePortfolioFetch: Pick<
  CreateCoursePortfolioSchemaType,
  'info' | 'outcome'
> = {
  info: {
    courseName: 'วิชาไรไม่รู้',
    courseCode: 'CPE100',
    user: ['นายไก่ ไข่', 'นายงู จาน'],
  },

  outcome: {
    grade: {
      studentAmount: '98',
      GPA: '2.88',
      gradeFrequencies: [
        {
          name: 'A',
          gradeScore: '82',
          frequency: '20',
        },
        {
          name: 'B+',
          gradeScore: '78',
          frequency: '8',
        },
        {
          name: 'B',
          gradeScore: '69',
          frequency: '27',
        },
        {
          name: 'C+',
          gradeScore: '61',
          frequency: '22',
        },
        {
          name: 'C',
          gradeScore: '53',
          frequency: '16',
        },
        {
          name: 'D+',
          gradeScore: '48',
          frequency: '3',
        },
        {
          name: 'D',
          gradeScore: '43',
          frequency: '2',
        },
        {
          name: 'F',
          gradeScore: '0',
          frequency: '0',
        },
        {
          name: 'W',
          gradeScore: '-',
          frequency: '0',
        },
      ],
    },
    programOutcomes: [
      {
        minimumPercentage: 'minimumPercentage',
        tabeeOutcome: 'TABEEOutcomes1',
        courses: [
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask1.1.1',
                passingCriteria: 'passingCriteria1.1.1',
                studentPassPercentage: 'studentPassPercentage1.1.1',
              },
              {
                assessmentTask: 'assessmentTask1.1.2',
                passingCriteria: 'passingCriteria1.1.2',
                studentPassPercentage: 'studentPassPercentage1.1.2',
              },
              {
                assessmentTask: 'assessmentTask1.1.3',
                passingCriteria: 'passingCriteria1.1.3',
                studentPassPercentage: 'studentPassPercentage1.1.3',
              },
            ],
            courseOutcome: 'courseOutcome1.1',
          },
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask1.2.1',
                passingCriteria: 'passingCriteria1.2.1',
                studentPassPercentage: 'studentPassPercentage1.2.1',
              },
            ],
            courseOutcome: 'courseOutcome1.2',
          },
        ],
      },
      {
        minimumPercentage: 'minimumPercentage',
        tabeeOutcome: 'TABEEOutcomes2',
        courses: [
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask2.1.1',
                passingCriteria: 'passingCriteria2.1.1',
                studentPassPercentage: 'studentPassPercentage2.1.1',
              },
              {
                assessmentTask: 'assessmentTask2.1.2',
                passingCriteria: 'passingCriteria2.1.2',
                studentPassPercentage: 'studentPassPercentage2.1.2',
              },
              {
                assessmentTask: 'assessmentTask2.1.3',
                passingCriteria: 'passingCriteria2.1.3',
                studentPassPercentage: 'studentPassPercentage2.1.3',
              },
            ],
            courseOutcome: 'courseOutcome2.1',
          },
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask2.2.1',
                passingCriteria: 'passingCriteria2.2.1',
                studentPassPercentage: 'studentPassPercentage2.2.1',
              },
              {
                assessmentTask: 'assessmentTask2.2.2',
                passingCriteria: 'passingCriteria2.2.2',
                studentPassPercentage: 'studentPassPercentage2.2.2',
              },
            ],
            courseOutcome: 'courseOutcome2.2',
          },
        ],
      },
      {
        minimumPercentage: 'minimumPercentage',
        tabeeOutcome: 'TABEEOutcomes3',
        courses: [
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask3.1.1',
                passingCriteria: 'passingCriteria3.1.1',
                studentPassPercentage: 'studentPassPercentage3.1.1',
              },
            ],
            courseOutcome: 'courseOutcome3.1',
          },
          {
            assessments: [
              {
                assessmentTask: 'assessmentTask3.2.1',
                passingCriteria: 'passingCriteria3.2.1',
                studentPassPercentage: 'studentPassPercentage3.2.1',
              },
            ],
            courseOutcome: 'courseOutcome3.2',
          },
        ],
      },
    ],
    gradeDistibutionImage: {},
  },
};
