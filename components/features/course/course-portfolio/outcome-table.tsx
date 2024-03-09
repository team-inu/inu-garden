'use client';

import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tabeeOutcomes } from '@/data/create-portfolio-example';

const OutcomeTable = () => {
  //prevent hydration error useState in useEffect
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: use real data
  const exampleTabeeOutcomes = tabeeOutcomes;

  if (!mounted) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>TABEE Outcome</TableHead>
          <TableHead> Course Outcome</TableHead>
        </TableRow>
      </TableHeader>
      {exampleTabeeOutcomes.map((tabeeOutcome, i) => (
        <TableBody key={i}>
          <TableRow className="">
            <TableCell className="w-1/5">{tabeeOutcome.name}</TableCell>
            {tabeeOutcome.courseOutcomes.map((courseOutcome, i) => (
              <TableRow className="w-4/5" key={i}>
                <TableCell className="w-96"> {courseOutcome.name}</TableCell>
                {courseOutcome.assessments.map((assessment, i) => (
                  <TableRow key={i}>
                    <TableHead>Assessment</TableHead>
                    <TableCell>{assessment.assessmentTask}</TableCell>
                    <TableHead>Passing Criteria</TableHead>
                    <TableCell> {assessment.passingCriteria}</TableCell>
                    <TableHead>Student Pass</TableHead>
                    <TableCell>{assessment.studentPassPercentage}</TableCell>
                  </TableRow>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableHead>Percentage of students with pass outcome</TableHead>
              <TableCell colSpan={2}>
                {tabeeOutcome.minimumPercentage}
              </TableCell>
            </TableRow>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default OutcomeTable;
