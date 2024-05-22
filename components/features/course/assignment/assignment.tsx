'use client';

import Image from 'next/image';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { columns as assignmentColumns } from '@/components/features/course/assignment/assignment-column';
import { AssignmentDataTable } from '@/components/features/course/assignment/assignment-table';
import { columns as assignmentGroupColumns } from '@/components/features/course/assignment/group/assignment-group-column';
import { AssignmentGroupTable } from '@/components/features/course/assignment/group/assignment-group-table';
import { cloStaticColumn } from '@/components/features/course/outcome/clo-static-column';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import { columns as scoreColumns } from '@/components/features/course/score/score-column';
import { ScoreDataTable } from '@/components/features/course/score/score-table';
import ScatterChartCustom from '@/components/scatter-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAssignmentGroupsByCourseId } from '@/hooks/assignment-group-hook';
import { useGetAssignmentByGroupId, useGetAssignmentById } from '@/hooks/assignment-hook';
import { useGetScoresByAssignmentId } from '@/hooks/score-hook';

type SelectedGroupRowType = {
  groupName: string;
  groupId: string;
};

type SelectedAssignmentRowType = {
  assignmentName: string;
  assignmentId: string;
};

const Assignment = () => {
  const router = useRouter();
  const pathName = usePathname();
  //get assignmentGroupId
  const assignmentGroupId = useSearchParams().get('assignmentGroupId');
  const assignmentId = useSearchParams().get('assignmentId');
  const [selectedAssignmentGroup, setSelectedAssignmentGroup] = useState<string>(assignmentGroupId ?? '');
  const [selectedAssignment, setSelectedAssignment] = useState<string>(assignmentId ?? '');

  const [selectedAssignmentRows, setSelectedAssignmentRows] = useState<SelectedAssignmentRowType>({
    assignmentName: '',
    assignmentId: '',
  });
  const getAssignmentValues = (id: string, name: string) => {
    if (selectedAssignment !== id) {
      setSelectedAssignmentGroup('');
    }
    setSelectedAssignmentRows({ assignmentName: name, assignmentId: id });
    router.push(`${pathName}/?assignmentId=${id}&clolength=&tab=assignment`, { scroll: false });

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const [selectedAssignmentGroupRows, setSelectedAssignmentGroupRows] = useState<SelectedGroupRowType>({
    groupName: '',
    groupId: '',
  });
  const getAssignmentGroupValues = (groupId: string, groupName: string) => {
    if (selectedAssignmentGroup !== groupId) {
      setSelectedAssignmentRows({ assignmentName: '', assignmentId: '' });
    }
    setSelectedAssignmentGroupRows({
      groupName,
      groupId,
    });
    router.push(`${pathName}/?assignmentGroupId=${groupId}&clolength=&tab=assignment`, { scroll: false });

    //scroll smooth to bottom wait 1 sec for the table to render
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const { id: courseId } = useParams<{ id: string }>();

  const { data: assignmentGroups } = useGetAssignmentGroupsByCourseId(courseId);

  const { data: assignments } = useGetAssignmentByGroupId(selectedAssignmentGroupRows.groupId);
  const { data: assignment } = useGetAssignmentById(selectedAssignmentRows.assignmentId);
  const { data: scores } = useGetScoresByAssignmentId(selectedAssignmentRows.assignmentId);

  return (
    <div className="space-y-5">
      <h1 className="mb-5 text-2xl font-bold">Assessment Groups</h1>
      <div className="">
        <AssignmentGroupTable
          columns={assignmentGroupColumns}
          getValues={getAssignmentGroupValues}
          data={assignmentGroups ?? []}
        />
      </div>
      {selectedAssignmentGroupRows.groupId ? (
        <>
          <h1 className="mb-5 text-2xl font-bold">Assessments</h1>
          <div className="">
            <AssignmentDataTable columns={assignmentColumns} getValues={getAssignmentValues} data={assignments ?? []} />
          </div>
        </>
      ) : (
        <>
          <div className="mt-10 flex flex-col items-center justify-center space-y-5">
            <Image
              priority
              src="/images/inu.png"
              alt="shiba"
              width={160}
              height={160}
              className="animate-pulse"
              placeholder="blur"
              blurDataURL="/images/inu.png"
            />
            <h1 className="mb-5 text-xl font-bold text-slate-700">
              Please select assessment group to see each assessment
            </h1>
          </div>
        </>
      )}

      {selectedAssignmentRows.assignmentId !== '' ? (
        <>
          <div className="">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Course learning outcome of {selectedAssignmentRows.assignmentName}</CardTitle>
              </CardHeader>
              <CardContent>
                {' '}
                <CourseLearningOutcomeDataTable
                  columns={cloStaticColumn}
                  data={assignment?.courseLearningOutcomes ?? []}
                  disablePagination={true}
                  isAssignmentLink
                  cloId={assignment?.courseLearningOutcomes.map((clo) => clo.id)}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex w-full justify-between">
                  <div>Score of {selectedAssignmentRows.assignmentName}</div>
                  <div>
                    submitted {scores?.submittedAmount} of {scores?.enrolledAmount}
                  </div>
                </CardTitle>{' '}
              </CardHeader>
              <CardContent>
                <ScoreDataTable
                  columns={scoreColumns}
                  data={scores?.scores ?? []}
                  assignmentName={selectedAssignmentRows?.assignmentName}
                  assignmentId={selectedAssignmentRows?.assignmentId}
                />
              </CardContent>
            </Card>
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Sorted Scores (Full Score = {assignment?.maxScore})</CardTitle>
                  <CardDescription>Score of {selectedAssignmentRows.assignmentName}</CardDescription>
                </CardHeader>
                <CardContent>{scores && scores.scores.length != 0 && <ScatterChartCustom data={scores} />}</CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {selectedAssignmentGroupRows.groupId !== '' && (
            <div className="mt-10 flex flex-col items-center justify-center space-y-5">
              <Image
                priority
                src="/images/inu.png"
                alt="shiba"
                width={160}
                height={160}
                className="animate-pulse"
                placeholder="blur"
                blurDataURL="/images/inu.png"
              />
              <h1 className="mb-5 text-xl font-bold text-slate-700">Please select assessment to see score</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Assignment;
