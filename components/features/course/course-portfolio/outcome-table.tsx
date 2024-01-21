"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const outcomes = [
  {
    tabee: "knowledge of basic and engineering sciences",
    course: [
      {
        outcome:
          "Can apply knowledge of mathematics, science, and engineering to solve engineering problems. ",
        assessemt: [
          {
            name: "การบ้านครั้งที่ 1",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "Final",
            passingCriteria: "50",
            studentPass: "10",
          },
        ],
      },
      {
        outcome: "course outcome 2",
        assessemt: [
          {
            name: "Midterm",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "การสอบย่อยครั้งที่ 1",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "การสอบย่อยครั้งที่ 15",
            passingCriteria: "50",
            studentPass: "10",
          },
        ],
      },
    ],
    studentPass: "10",
  },
  {
    tabee: "Analysis and synthesis of complex engineering problems",
    course: [
      {
        outcome: "course outcome 1",
        assessemt: [
          {
            name: "การบ้านครั้งที่ 1",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "Final",
            passingCriteria: "50",
            studentPass: "10",
          },
        ],
      },
      {
        outcome: "course outcome 2",
        assessemt: [
          {
            name: "Midterm",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "การสอบย่อยครั้งที่ 1",
            passingCriteria: "50",
            studentPass: "10",
          },
          {
            name: "การสอบปลายภาค",
            passingCriteria: "50",
            studentPass: "10",
          },
        ],
      },
      {
        outcome: "course outcome 3",
        assessemt: [
          {
            name: "กระบวนปราณวารี",
            passingCriteria: "50",
            studentPass: "10",
          },
        ],
      },
    ],
    studentPass: "10",
  },
];
const OutcomeTable = () => {
  //prevent hydration error useState in useEffect
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>TABEE Outcome</TableHead>
          <TableHead> Course Outcome</TableHead>
        </TableRow>
      </TableHeader>
      {outcomes.map((outcome, i) => (
        <TableBody key={i}>
          <TableRow className="">
            <TableCell className="w-1/5">{outcome.tabee}</TableCell>
            {outcome.course.map((course, i) => (
              <TableRow className="w-4/5" key={i}>
                <TableCell className="w-96"> {course.outcome}</TableCell>
                {course.assessemt.map((assessemt, i) => (
                  <TableRow key={i}>
                    <TableHead>Assessment</TableHead>
                    <TableCell>{assessemt.name}</TableCell>
                    <TableHead>Passing Criteria</TableHead>
                    <TableCell> {assessemt.passingCriteria}</TableCell>
                    <TableHead>Student Pass</TableHead>
                    <TableCell>{assessemt.studentPass}</TableCell>
                  </TableRow>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableHead>Percentage of students with pass outcome</TableHead>
              <TableCell colSpan={2}>{outcome.studentPass}</TableCell>
            </TableRow>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default OutcomeTable;
