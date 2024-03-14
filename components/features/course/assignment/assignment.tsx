'use client';

import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { columns as assignmentColumns } from '@/components/features/course/assignment/assignment-column';
import { AssignmentDataTable } from '@/components/features/course/assignment/assignment-table';
import { cloStaticColumn } from '@/components/features/course/outcome/clo-static-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import { columns as scoreColumns } from '@/components/features/course/score/score-column';
import { ScoreDataTable } from '@/components/features/course/score/score-table';
import ScatterChartCustom from '@/components/scatter-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useGetAssignmentByCourseId,
  useGetAssignmentById,
} from '@/hooks/assignment-hook';
import { useGetScoresByAssignmentId } from '@/hooks/score-hook';

type SelectedRowType = {
  name: string;
  id: string;
};

const Assignment = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [selectedRows, setSelectedRows] = useState<SelectedRowType>({
    name: '',
    id: '',
  });
  const getVales = (id: string, name: string) => {
    setSelectedRows({ name: name, id: id });
    router.push(`${pathName}/?assignmentId=${id}&clolength=&tab=assignment`);
  };
  const { id: courseId } = useParams<{ id: string }>();

  const { data: assignments } = useGetAssignmentByCourseId(courseId);
  const { data: assignment } = useGetAssignmentById(selectedRows.id);
  const { data: scores } = useGetScoresByAssignmentId(selectedRows.id);

  return (
    <div className="space-y-5">
      <h1 className="mb-5 text-2xl font-bold">Assignments</h1>
      <div className="">
        <AssignmentDataTable
          columns={assignmentColumns}
          getValues={getVales}
          data={assignments ?? []}
        />
      </div>
      {selectedRows.id !== '' ? (
        <>
          <div className="">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>
                  Course learning outcome of {selectedRows.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {' '}
                <CourseLearningOutcomeDataTable
                  columns={cloStaticColumn}
                  data={assignment?.courseLearningOutcomes ?? []}
                  disablePagination={true}
                  isAssignmentLink
                  cloId={assignment?.courseLearningOutcomes.map(
                    (clo) => clo.id,
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex w-full justify-between">
                  <div>Score of {selectedRows.name}</div>
                  <div>
                    submitted {scores?.submittedAmount} of{' '}
                    {scores?.enrolledAmount}
                  </div>
                </CardTitle>{' '}
              </CardHeader>
              <CardContent>
                <ScoreDataTable
                  columns={scoreColumns}
                  data={scores?.scores ?? []}
                  assignmentName={selectedRows?.name}
                  assignmentId={selectedRows?.id}
                />
              </CardContent>
            </Card>
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>
                    Score of {selectedRows.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScatterChartCustom />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center space-y-5">
          <Image
            priority
            src="/images/shiba.svg"
            alt="shiba"
            width={160}
            height={160}
            className="animate-pulse"
            placeholder="blur"
            blurDataURL="/images/shiba.svg"
          />
          <h1 className="mb-5 text-xl font-bold text-slate-700">
            Please select assignment to see score
          </h1>
        </div>
      )}
    </div>
  );
};

export default Assignment;
