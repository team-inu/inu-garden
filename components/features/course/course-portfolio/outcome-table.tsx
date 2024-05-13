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
import { TabeeOutcome } from '@/types/schema/course-portfolio-schema';

type OutcomeTableProps = {
  tabeeOutcomes: TabeeOutcome[];
};

const OutcomeTable: React.FC<OutcomeTableProps> = ({ tabeeOutcomes }) => {
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
          <TableHead>PLO/PO</TableHead>
          <TableHead> Course Learning Outcome</TableHead>
        </TableRow>
      </TableHeader>

      {tabeeOutcomes.map((tabeeOutcome, i) => (
        <TableBody key={i}>
          <TableRow className="">
            <TableCell className="w-1/5">
              {tabeeOutcome.plos.map((plo) => {
                return (
                  <>
                    PLO {plo.code} (PLO{' '}
                    {plo.nested.map((splo) => {
                      return <>{splo.code} </>;
                    })}
                    )
                    <br />
                  </>
                );
              })}
              PO {tabeeOutcome.code}
            </TableCell>
            {tabeeOutcome.courseOutcomes.map((courseOutcome, i) => (
              <TableRow className="w-4/5 border-b" key={i}>
                <TableCell className="max-w-xs border">
                  <TableRow>
                    {courseOutcome.code}: {courseOutcome.name}
                  </TableRow>
                </TableCell>
                <TableBody>
                  {courseOutcome.assessments &&
                    courseOutcome.assessments.map((assessment, i) => (
                      <TableRow key={i}>
                        <TableHead>Assessment</TableHead>
                        <TableCell className="truncate">
                          {assessment.assessmentTask}
                        </TableCell>
                        <TableHead>Passing Criteria</TableHead>
                        <TableCell> {assessment.passingCriteria}%</TableCell>
                        <TableHead>Student Pass</TableHead>
                        <TableCell>
                          {assessment.studentPassPercentage}%
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableRow>
                    <TableHead className="truncate  bg-primary-foreground/20">
                      Students passing{' '}
                      {courseOutcome.expectedPassingAssignmentPercentage}% of
                      {" this CLO's assessments"}
                    </TableHead>
                    <TableCell colSpan={2}>
                      {courseOutcome.passingCloPercentage}%
                    </TableCell>
                  </TableRow>
                </TableBody>

                {/* <TableCell rowSpan={1}>
                  {courseOutcome.assessments &&
                    courseOutcome.assessments.map((assessment, i) => (
                      <TableRow key={i}>
                        <TableHead>Assessment</TableHead>
                        <TableCell className="truncate">
                          {assessment.assessmentTask}
                        </TableCell>
                        <TableHead>Passing Criteria</TableHead>
                        <TableCell> {assessment.passingCriteria}%</TableCell>
                        <TableHead>Student Pass</TableHead>
                        <TableCell>
                          {assessment.studentPassPercentage}%
                        </TableCell>
                      </TableRow>
                    ))}
                </TableCell> */}
              </TableRow>
            ))}
            <TableRow>
              <TableHead className="truncate  bg-primary/20">
                Students passing {tabeeOutcome.expectedCloPercentage}% of this
                {"  PO's CLOs"}
              </TableHead>
              <TableCell colSpan={2}>
                {tabeeOutcome.minimumPercentage}%
              </TableCell>
            </TableRow>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default OutcomeTable;
