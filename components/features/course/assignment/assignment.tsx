'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { columns as assignmentColumns } from '@/components/features/course/assignment/assignment-column';
import { AssignmentDataTable } from '@/components/features/course/assignment/assignment-table';
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
import { Score } from '@/data/schema';

type SelectedRowType = {
  name: string;
  id: string;
};

const Assignment = () => {
  const [selectedRows, setSelectedRows] = useState<SelectedRowType>();
  const getVales = (id: string, name: string) => {
    setSelectedRows({ name: name, id: id });
  };

  const ScoreTable = useMemo(() => {
    let data: Score[] = [];
    switch (selectedRows?.id) {
      case '1':
        data = [
          {
            id: '1',
            studentId: '600612345',
            firstName: 'John',
            lastName: 'Doe',
            score: 100,
          },
          {
            id: '2',
            studentId: '600612345',
            firstName: 'Por',
            lastName: 'Ping',
            score: 100,
          },
        ];
        break;
      case '2':
        data = [
          {
            id: '1',
            studentId: '600612345',
            firstName: 'Annie',
            lastName: 'Rose',
            score: 85,
          },
          {
            id: '2',
            studentId: '600612344',
            firstName: 'Ling',
            lastName: 'Ping',
            score: 84,
          },
        ];
        break;

      default:
        break;
    }
    return (
      <ScoreDataTable
        columns={scoreColumns}
        data={data}
        assignmentName={selectedRows?.name}
        assignmentId={selectedRows?.id}
      />
    );
  }, [selectedRows]);

  return (
    <div className="space-y-5">
      <h1 className="mb-5 text-2xl font-bold">Assignments</h1>
      <div className="">
        <AssignmentDataTable
          columns={assignmentColumns}
          getValues={getVales}
          data={[
            {
              id: '1',
              name: 'Lomuto',
              clo: 'CLO1, CLO2',
              plo: 'PLO1',
              po: 'PO1',
              dueDate: new Date('2022-03-25'),
              percentage: '20%',
              weigth: '20%',
            },
            {
              id: '2',
              name: 'Assignment 2',
              clo: 'CLO2',
              plo: 'PLO2',
              po: 'PO2',
              dueDate: new Date('2022-03-25'),
              percentage: '20%',
              weigth: '20%',
            },
            {
              id: '3',
              name: 'Assignment 3',
              clo: 'CLO3',
              plo: 'PLO3',
              po: 'PO3',
              dueDate: new Date('2022-03-25'),
              percentage: '20%',
              weigth: '20%',
            },
          ]}
        />
      </div>
      {selectedRows ? (
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Score of {selectedRows.name}</CardTitle>
            </CardHeader>
            <CardContent>{ScoreTable}</CardContent>
          </Card>
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Summary</CardTitle>
                <CardDescription>Score of {selectedRows.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScatterChartCustom />
              </CardContent>
            </Card>
          </div>
        </div>
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
