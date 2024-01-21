import { CreateCoursePortfolioSchemaType } from "@/types/schema/course-portfolio-schema";

const coursePortfolio: CreateCoursePortfolioSchemaType = {
  info: {
    courseName: "วิชาไรไม่รู้",
    courseCode: "CPE100",
    lecturer: ["นายไก่ ไข่", "นายงู จาน"],
  },
  summary: {
    teachingMethod: [{ name: "teachingMethod1" }, "teachingMethod2"],
    onlineTool: "zooommmmmmmmm",
    objective: ["สามารถ1", "สามารถ2", "สามารถ3", "สามารถ4", "สามารถ5"],
  },
  development: {
    plan: ["plan1", "plan2"],
    doAndCheck: ["doAndCheck1", "doAndCheck2"],
    act: ["act1", "act2"],
    subjectsComments: {
      upstream: ["upstream1", "upstream2"],
      downstream: ["downstream1", "downstream2"],
      other: ["other1", "other2"],
    },
    otherComments: ["otherComments1", "otherComments2"],
  },
  outcome: {
    grade: {
      studentAmount: "100",
      GPA: "2.3",
      gradeFrequencies: [
        {
          name: "A",
          gradeScore: "1.2",
          frequency: "21",
        },
        {
          name: "B",
          gradeScore: "2.2",
          frequency: "22",
        },
        {
          name: "C",
          gradeScore: "3.2",
          frequency: "23",
        },
        {
          name: "D",
          gradeScore: "4.2",
          frequency: "24",
        },
        {
          name: "E",
          gradeScore: "5.2",
          frequency: "25",
        },
        {
          name: "F",
          gradeScore: "6.2",
          frequency: "26",
        },
      ],
    },
    programOutcomes: [
      {
        minimumPercentage: "minimumPercentage",
        tabeeOutcome: "TABEEOutcomes1",
        courses: [
          {
            assessments: [
              {
                assessmentTask: "assessmentTask1.1.1",
                passingCriteria: "passingCriteria1.1.1",
                studentPassPercentage: "studentPassPercentage1.1.1",
              },
              {
                assessmentTask: "assessmentTask1.1.2",
                passingCriteria: "passingCriteria1.1.2",
                studentPassPercentage: "studentPassPercentage1.1.2",
              },
              {
                assessmentTask: "assessmentTask1.1.3",
                passingCriteria: "passingCriteria1.1.3",
                studentPassPercentage: "studentPassPercentage1.1.3",
              },
            ],
            courseOutcome: "courseOutcome1.1",
          },
          {
            assessments: [
              {
                assessmentTask: "assessmentTask1.2.1",
                passingCriteria: "passingCriteria1.2.1",
                studentPassPercentage: "studentPassPercentage1.2.1",
              },
            ],
            courseOutcome: "courseOutcome1.2",
          },
        ],
      },
      {
        minimumPercentage: "minimumPercentage",
        tabeeOutcome: "TABEEOutcomes2",
        courses: [
          {
            assessments: [
              {
                assessmentTask: "assessmentTask2.1.1",
                passingCriteria: "passingCriteria2.1.1",
                studentPassPercentage: "studentPassPercentage2.1.1",
              },
              {
                assessmentTask: "assessmentTask2.1.2",
                passingCriteria: "passingCriteria2.1.2",
                studentPassPercentage: "studentPassPercentage2.1.2",
              },
              {
                assessmentTask: "assessmentTask2.1.3",
                passingCriteria: "passingCriteria2.1.3",
                studentPassPercentage: "studentPassPercentage2.1.3",
              },
            ],
            courseOutcome: "courseOutcome2.1",
          },
          {
            assessments: [
              {
                assessmentTask: "assessmentTask2.2.1",
                passingCriteria: "passingCriteria2.2.1",
                studentPassPercentage: "studentPassPercentage2.2.1",
              },
              {
                assessmentTask: "assessmentTask2.2.2",
                passingCriteria: "passingCriteria2.2.2",
                studentPassPercentage: "studentPassPercentage2.2.2",
              },
            ],
            courseOutcome: "courseOutcome2.2",
          },
        ],
      },
      {
        minimumPercentage: "minimumPercentage",
        tabeeOutcome: "TABEEOutcomes3",
        courses: [
          {
            assessments: [
              {
                assessmentTask: "assessmentTask3.1.1",
                passingCriteria: "passingCriteria3.1.1",
                studentPassPercentage: "studentPassPercentage3.1.1",
              },
            ],
            courseOutcome: "courseOutcome3.1",
          },
          {
            assessments: [
              {
                assessmentTask: "assessmentTask3.2.1",
                passingCriteria: "passingCriteria3.2.1",
                studentPassPercentage: "studentPassPercentage3.2.1",
              },
            ],
            courseOutcome: "courseOutcome3.2",
          },
        ],
      },
    ],
    gradeDistibutionImage: {},
  },
};
