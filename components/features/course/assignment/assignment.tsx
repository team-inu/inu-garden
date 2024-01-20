"use client";

import { useState } from "react";
import { columns as assignmentColumns } from "./assignment-column";
import { columns as scoreColumns } from "../score/score-column";
import { AssignmentDataTable } from "./assignment-table";
import { ScoreDataTable } from "../score/score-table";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScatterChartCustom from "@/components/scatter-chart";
import { isNullOrUndefined } from "util";

type SelectedRowType = {
  name: string;
  id: string;
};

const Assignment = () => {
  const [selectedRows, setSelectedRows] = useState<SelectedRowType>();
  const getVales = (id: string, name: string) => {
    setSelectedRows({ name: name, id: id });
  };
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold mb-5">Assignments</h1>
      <div className="">
        <AssignmentDataTable
          columns={assignmentColumns}
          getValues={getVales}
          data={[
            {
              id: "1",
              name: "Lomuto",
              clo: "CLO1, CLO2",
              plo: "PLO1",
              po: "PO1",
              dueDate: "20/10/2021",
              percentage: "20%",
              weigth: "20%",
            },
            {
              id: "2",
              name: "Assignment 2",
              clo: "CLO2",
              plo: "PLO2",
              po: "PO2",
              dueDate: "20/10/2021",
              percentage: "20%",
              weigth: "20%",
            },
            {
              id: "3",
              name: "Assignment 3",
              clo: "CLO3",
              plo: "PLO3",
              po: "PO3",
              dueDate: "20/10/2021",
              percentage: "20%",
              weigth: "20%",
            },
          ]}
        />
      </div>
      {selectedRows ? (
        <div className="grid gap-3 grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreDataTable
                columns={scoreColumns}
                data={[
                  {
                    id: "1",
                    studentId: "600612345",
                    firstName: "John",
                    lastName: "Doe",
                    score: 100,
                  },
                ]}
                assignmentName={selectedRows.name}
                assignmentId={selectedRows.id}
              />
            </CardContent>
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
        <div className="flex flex-col space-y-5 mt-10 items-center justify-center">
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
          <h1 className="text-xl font-bold mb-5 text-slate-700">
            Please select assignment to see score
          </h1>
        </div>
      )}
    </div>
  );
};

export default Assignment;
