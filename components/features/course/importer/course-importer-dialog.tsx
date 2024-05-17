import { DialogClose } from '@radix-ui/react-dialog';
import Excel from 'exceljs';
import { ImportIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStrictForm } from '@/hooks/form-hook';
import { useImportCourse } from '@/hooks/importer-hook';
import { PlanSheet } from '@/libs/spreadsheet/plansheet/PlanSheet';
import { CreateEnrollmentPayloadDefaultValues } from '@/types/schema/enrollment-schema';
import {
  ImportAssignment,
  ImportAssignmentGroup,
  ImportCourse,
  ImportCourseDefaultValue,
  ImportCourseLearningOutcome,
  ImportCourseSchema,
} from '@/types/schema/importer-schema';

// const onSubmit = () => {};

const convertFileToBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const buffer = event.target?.result as ArrayBuffer;
      resolve(buffer);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const CourseImporterDialog = () => {
  const fileImportRef = useRef<HTMLInputElement>(null);

  const { id: courseId } = useParams<{ id: string }>();
  const form = useStrictForm(ImportCourseSchema, ImportCourseDefaultValue);

  const { mutate } = useImportCourse();

  const handleUploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.warning('Parsing the file to data....');
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return toast.error('Can not read file');
      }

      // parse file things
      const buffer = await convertFileToBuffer(file);

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(buffer);

      const [outcomeSheet, _, weeklyPlanSheet, scoreSheet] = workbook.worksheets;

      const planSheet = new PlanSheet();

      const { assignmentPercentage, cloInfo, courseInfo, percentageThreshold } =
        planSheet.parseOutcomeSheet(outcomeSheet);
      const { scoresInfo } = planSheet.parseScoreSheet(scoreSheet);
      const { assignmentInfo } = planSheet.parseWeeklyPlanSheet(weeklyPlanSheet);

      // begin prepare for payload
      console.time('prepare payload');
      const assignmentGroupByGroupName: Map<string, ImportAssignmentGroup> = new Map();
      const assignmentByAssignmentName: Map<string, ImportAssignment> = new Map();

      // course learning outcome
      const courseLearningOutcomes: ImportCourseLearningOutcome[] = [];
      // const courseLearningOutcomeByCode: Map<string, ImportCourseLearningOutcome> = new Map();
      for (let clo of cloInfo) {
        courseLearningOutcomes.push({
          code: clo['No.'],
          courseId: courseId,
          description: clo['Course Learning Outcomes (CLOs)'],
          expectedPassingAssignmentPercentage: percentageThreshold.PassingItemsThres,
          expectedPassingStudentPercentage: percentageThreshold.PassingCLOsThres,
          status: 'from curriculum',

          subProgramLearningOutcomeCodes: [clo['KMUTT PLO']],
          programOutcomeCode: clo['TABEE PO'],
        });
      }
      console.log(courseLearningOutcomes);

      // assignment and assignment group
      for (let assignment of assignmentInfo) {
        if (
          assignment.Assessment === undefined ||
          assignment.Topics === undefined ||
          assignment['Raw full score'] === undefined ||
          assignment.Item === undefined ||
          assignment.CLO === undefined
        ) {
          continue;
        }

        let assignmentGroup = assignmentGroupByGroupName.get(assignment.Assessment);
        if (assignmentGroup === undefined) {
          const value = assignmentPercentage.find((e) => e.Item === assignment.Assessment)?.Value;
          if (value === undefined) {
            toast.error(`Assignment percentage of '${assignment.Assessment}' not found`);
            return;
          }
          assignmentGroup = {
            name: assignment.Assessment,
            weight: value,
            assignments: [],
          };

          assignmentGroupByGroupName.set(assignment.Assessment, assignmentGroup);
        }

        if (!courseLearningOutcomes.find((e) => e.code === assignment.CLO)) {
          toast.error(
            `clo of ${assignment.CLO} in assignment ${assignment['Item']} not found in "PO and PLO" sheet excel`,
          );
          return;
        }

        const insertedAssignment = {
          courseLearningOutcomeCodes: [assignment.CLO],
          description: assignment.Topics,
          expectedPassingStudentPercentage: percentageThreshold.PassingStudentThres,
          expectedScorePercentage: percentageThreshold.PassingScoreThres,
          isIncludedInClo: assignment.Include === 'Yes',
          maxScore: assignment['Raw full score'],
          name: assignment['Item'],
          scores: [],
        };

        assignmentGroup.assignments.push(insertedAssignment);
        assignmentByAssignmentName.set(assignment['Item'], insertedAssignment);
      }

      // score
      for (let score of scoresInfo) {
        for (let [assignmentName, _] of assignmentByAssignmentName.entries()) {
          const assignment = assignmentByAssignmentName.get(assignmentName)!;

          const studentScore = score[assignmentName];

          if (studentScore === undefined) {
            toast.error(`assignment ${assignmentName} not found while parsing score of ${score.Name} `);
            console.log(assignmentName, score);
            return;
          }

          assignment.scores.push({
            score: studentScore as number,
            studentId: score.ID,
          });
        }
      }

      // students
      const studentIds = scoresInfo.map((e) => e.ID);

      console.timeEnd('prepare payload');
      const assignmentGroups: ImportAssignmentGroup[] = [];
      for (let [_, value] of assignmentGroupByGroupName.entries()) {
        assignmentGroups.push(value);
      }

      console.log(assignmentGroups);

      const data: ImportCourse = {
        courseId: courseId,
        programYear: courseInfo.ProgramYear,
        assignmentGroups: assignmentGroups,
        studentIds: studentIds,
        courseLearningOutcomes: courseLearningOutcomes,
      };
      form.reset(data);

      toast.success('parse data from excel file successfully');
    } catch (e) {
      if (e instanceof ZodError) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };

  const handleSubmitImport = async (value: ImportCourse) => {
    mutate(value);
  };

  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>ඞ Re-Import course ඞ</DialogTitle>
        <DialogDescription>
          สามารถนำเข้าไฟล์ Excel นำข้อมูลมา import ได้อีกครั้ง ระบบจะนำข้อมูลใน Excel มาเขียนทับข้อมูลเก่าที่มีอยู่ ඞ
          โปรดระวังว่าข้อมูลทุกอย่างจะถูกเขียนทับใหม่หมด **ยกเว้น** ข้อมูลในหน้า course setting. ตรงส่วนนั้นต้องกรอกเอง
        </DialogDescription>
      </DialogHeader>
      <Input type="file" className="hidden" ref={fileImportRef} onChange={handleUploadExcel} />
      <Button className="w-full" variant="outline" onClick={() => fileImportRef.current?.click()}>
        <ImportIcon className="mr-2 h-4 w-4" />
        Import
      </Button>

      <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono">
        <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
      </ScrollArea>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitImport)}></form>
      </Form>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => {
            form.reset(CreateEnrollmentPayloadDefaultValues);
          }}
        >
          Clear data
        </Button>
        <DialogClose asChild>
          <Button
            onClick={() => {
              form.reset(CreateEnrollmentPayloadDefaultValues);
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" onClick={form.handleSubmit(handleSubmitImport)}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CourseImporterDialog;
