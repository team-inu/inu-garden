import {
  CreateCoursePortfolioForm,
  TabeeOutcome,
} from '@/types/schema/course-portfolio-schema';

export const tabeeOutcomes: TabeeOutcome[] = [
  {
    name: 'knowledge of basic and engineering sciences',
    courseOutcomes: [
      {
        name: 'Can apply knowledge of mathematics, science, and engineering to solve engineering problems. ',
        assessments: [
          {
            assessmentTask: 'การบ้านครั้งที่ 1',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'Final',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
        ],
      },
      {
        name: 'course outcome 2',
        assessments: [
          {
            assessmentTask: 'Midterm',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'การสอบย่อยครั้งที่ 1',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'การสอบย่อยครั้งที่ 15',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
        ],
      },
    ],
    minimumPercentage: '10',
  },
  {
    name: 'Analysis and synthesis of complex engineering problems',
    courseOutcomes: [
      {
        name: 'course outcome 1',
        assessments: [
          {
            assessmentTask: 'การบ้านครั้งที่ 1',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'Final',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
        ],
      },
      {
        name: 'course outcome 2',
        assessments: [
          {
            assessmentTask: 'Midterm',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'การสอบย่อยครั้งที่ 1',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
          {
            assessmentTask: 'การสอบปลายภาค',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
        ],
      },
      {
        name: 'course outcome 3',
        assessments: [
          {
            assessmentTask: 'กระบวนปราณวารี',
            passingCriteria: '50',
            studentPassPercentage: '10',
          },
        ],
      },
    ],
    minimumPercentage: '10',
  },
];

export const coursePortfolioExample: Pick<
  CreateCoursePortfolioForm,
  'info' | 'result'
> = {
  info: {
    courseName: 'วิชาไรไม่รู้',
    courseCode: 'CPE100',
    lecturers: ['นายไก่ ไข่', 'นายงู จาน'],
  },

  result: {
    gradeDistribution: {
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
    tabeeOutcomes: tabeeOutcomes,
    gradeDistributionImage: {},
  },
};
