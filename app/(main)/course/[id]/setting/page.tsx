'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { AxiosError } from 'axios';
import excel from 'exceljs';
import { FileOutputIcon, FolderDotIcon, ImportIcon, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CourseImporterDialog from '@/components/features/course/importer/course-importer-dialog';
import CourseSettingForm from '@/components/features/course/settings/course-setting-form';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteCourse, useGetCourseById } from '@/hooks/course-hook';
import { useImportCourse } from '@/hooks/importer-hook';
import { assignmentGroupService } from '@/services/assignment-groups-service';
import { assignmentService } from '@/services/assignment-service';
import { cloService } from '@/services/clo-service';
import { poService } from '@/services/po-service';
import { scoreService } from '@/services/score-service';
import { ImportCourse } from '@/types/schema/importer-schema';

const SettingPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseById(courseId);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { mutate, isError } = useImportCourse();
  const { mutate: deleteCourse, isSuccess } = useDeleteCourse();

  const [isExporting, setIsExporting] = useState(false);
  const [exportButtonMessage, setExportButtonMessage] = useState('Export to Excel');

  useEffect(() => {
    if (isSuccess) {
      router.push('/course');
    }
  }, [isSuccess, router]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  const handleSubmitImport = async (value: ImportCourse) => {
    mutate(value);
    if (!isError) {
      setIsImportOpen(false);
    }
  };

  const onDelete = () => {
    deleteCourse(courseId);
  };

  type PoSheet = {
    course: {
      id: string;
      title: string;
      curriculum: string;
      semester: string;
      academicYear: number;
      graduateYear: number;
      programYear: number;
    };
    clos: {
      name: string;
      description: string;
      type: string;
      po: string;
      plo: string;
    }[];
    assignmentGroups: {
      name: string;
      description: string;
      value: number;
    }[];
    thresholds: {
      name: string;
      description: string;
      value: number;
    }[];
  };

  type WeeklyPlanSheet = {
    assignments: {
      lecture: string;
      topics: string;
      clo: string;
      assessment: string;
      item: string;
      include: boolean;
      evidence: string;
      score: number;
      description: string;
      assessmentType: string;
      learningActivity: string;
    }[];
  };

  type RawScoreSheet = {
    scoreByAssignmentByStudent: Map<string, Map<string, number>>;
  };

  const toExcel = (
    poSheetData: PoSheet,
    weeklyPlanSheetData: WeeklyPlanSheet,
    rawScoreSheetData: RawScoreSheet,
  ): excel.Workbook => {
    const workbook = new excel.Workbook();

    // po sheet
    const poSheet = workbook.addWorksheet('(IN) PO and CLO');

    poSheet.addTable({
      name: 'course_data',
      ref: 'A1',
      columns: ['CourseID', 'CourseTitle', 'Curriculum', 'Semester', 'AcademicYear', 'GraduateYear', 'ProgramYear'].map(
        (e) => {
          return { name: e };
        },
      ),
      rows: [
        [
          poSheetData.course.id,
          poSheetData.course.title,
          poSheetData.course.curriculum,
          poSheetData.course.semester.split('/')[1],
          poSheetData.course.academicYear,
          poSheetData.course.graduateYear,
          poSheetData.course.programYear,
        ],
      ],
    });

    poSheet.addTable({
      name: 'course_learning_outcomes',
      ref: 'A4',
      columns: ['No.', 'Course Learning Outcomes (CLOs)', 'Type', 'TABEE PO', 'KMUTT PLO'].map((e) => {
        return { name: e };
      }),
      rows: poSheetData.clos.map((e) => [e.name, e.description, 'NO_DATA', e.po, e.plo]),
    });

    poSheet.addTable({
      name: 'assignment_groups',
      ref: `A${4 + poSheetData.clos.length + 2}`,
      columns: ['Item', 'Description', 'Value'].map((e) => {
        return { name: e };
      }),
      rows: poSheetData.assignmentGroups.map((e) => [e.name, e.description, e.value]),
    });

    poSheet.addTable({
      name: 'thresholds',
      ref: `A${4 + poSheetData.clos.length + 2 + poSheetData.assignmentGroups.length + 2}`,
      columns: ['Item', 'Description', 'Value'].map((e) => {
        return { name: e };
      }),
      rows: poSheetData.thresholds.map((e) => [e.name, e.description, e.value]),
    });
    poSheet.columns = [
      { width: 25 },
      { width: 72 },
      { width: 16 },
      { width: 15 },
      { width: 17 },
      { width: 17 },
      { width: 18 },
    ];
    poSheet.properties.defaultRowHeight = 20;

    // student sheet

    const studentSheet = workbook.addWorksheet('(IN) StudentList');
    studentSheet.addTable({
      name: 'student_list',
      ref: `A1`,
      columns: ['Seq No.', 'Student Code', 'Student Name'].map((e) => {
        return { name: e };
      }),

      rows: Array.from(rawScoreSheetData.scoreByAssignmentByStudent.entries()).map(
        ([student, scoreByAssignment], index) => {
          // return [
          //   student,
          //   'NO_DATA',
          //   ...Array.from(scoreByAssignment.values()).map((score) => {
          //     return score;
          //   }),
          // ];
          return [index + 1, student, 'NO_DATA'];
        },
      ),
    });
    studentSheet.columns = [{ width: 10 }, { width: 19 }, { width: 40 }];
    studentSheet.properties.defaultRowHeight = 15;

    // weekly plan sheet

    const weeklyPlanSheet = workbook.addWorksheet('(IN) WeeklyPlan');
    weeklyPlanSheet.addTable({
      name: 'weekly_plan',
      ref: `A1`,
      columns: [
        'Lecture',
        'Topics',
        'CLO',
        'Assessment',
        'Item',
        'Include',
        'Evidence',
        'Raw full score',
        'Description',
        'AssessmentType',
        'Learning Activity',
      ].map((e) => {
        return { name: e };
      }),
      rows: weeklyPlanSheetData.assignments.map((e) => [
        e.lecture,
        e.topics,
        e.clo,
        e.assessment,
        e.item,
        e.include ? 'YES' : 'NO',
        e.evidence,
        e.score,
        e.description,
        e.assessmentType,
        e.learningActivity,
      ]),
    });
    weeklyPlanSheet.columns = [
      { width: 11 },
      { width: 33 },
      { width: 8 },
      { width: 16 },
      { width: 12 },
      { width: 10 },
      { width: 20 },
      { width: 17 },
      { width: 34 },
      { width: 20 },
      { width: 40 },
    ];
    weeklyPlanSheet.properties.defaultRowHeight = 15;

    const assignmentNames: string[] = [];

    x: for (let [student, scoreByAssignment] of rawScoreSheetData.scoreByAssignmentByStudent) {
      for (let [assignmentName, score] of scoreByAssignment) {
        assignmentNames.push(assignmentName);
      }
      break x;
    }

    // rawScoreSheetData.scoreByAssignmentByStudent.entries();

    // raw score sheet
    let rawScoreColumns = [{ width: 15 }, { width: 31 }];
    const rawScoreSheet = workbook.addWorksheet('(IN) RawScores');
    rawScoreSheet.addTable({
      name: 'raw_score',
      ref: `A1`,
      columns: ['ID', 'Name', ...assignmentNames].map((e) => {
        rawScoreColumns.push({ width: 7 });
        return { name: e };
      }),

      rows: Array.from(rawScoreSheetData.scoreByAssignmentByStudent.entries()).map(
        ([student, scoreByAssignment], index) => {
          // return [
          //   student,
          //   'NO_DATA',
          //   ...Array.from(scoreByAssignment.values()).map((score) => {
          //     return score;
          //   }),
          // ];
          return [student, 'NO_DATA', ...assignmentNames.map((name) => scoreByAssignment.get(name))];
        },
      ),
    });
    rawScoreSheet.columns = rawScoreColumns;
    rawScoreSheet.properties.defaultRowHeight = 15;

    workbook.addWorksheet('Course Catalogue');
    workbook.addWorksheet('Assessment techniques');
    workbook.addWorksheet('Learning techniques');

    return workbook;
  };

  const downloadExcel = async () => {
    if (!courseData) {
      throw new Error('course data not found');
    }

    try {
      setIsExporting(true);

      setExportButtonMessage('[1/9] retrieving course learning outcomes');
      const clos = await cloService.getCloByCourseId(courseId);

      setExportButtonMessage('[2/9] retrieving full clos info');
      const fullClosPromises = clos.map((e) => cloService.getCloById(e.id));
      const fullClos = await Promise.all(fullClosPromises);

      setExportButtonMessage('[3/9] retrieving program outcome');
      const programOutcomes = await poService.getPoList();

      setExportButtonMessage('[4/9] retrieving assignment groups');
      const assignmentGroups = await assignmentGroupService.getAssignmentGroupsByCourseId(courseId);

      setExportButtonMessage('[5/9] retrieving assignments');
      const assignments = await assignmentService.getAssignmentsByCourseId(courseId);

      setExportButtonMessage('[6/9] retrieving full assignments clo');
      const fullAssignmentsPromises = assignments.map((e) => assignmentService.getAssignmentById(e.id));
      const fullAssignments = await Promise.all(fullAssignmentsPromises);

      setExportButtonMessage('[7/9] retrieving scores');
      const fullScoresPromises = assignments.map((assignment) => scoreService.getScoresByAssignmentId(assignment.id));
      const fullScores = await Promise.all(fullScoresPromises);

      setExportButtonMessage('[8/9] writing data to excel');
      const po: PoSheet = {
        course: {
          id: courseData.code,
          title: courseData.name,
          academicYear: courseData.academicYear,
          graduateYear: courseData.graduateYear,
          programYear: courseData.programYear,
          curriculum: courseData.curriculum,
          semester: `${courseData.semester.year}/${courseData.semester.semesterSequence}`,
        },
        clos: fullClos.map((e) => {
          const po = programOutcomes.find((po) => po.id === e.programOutcomeId);
          if (po === undefined) {
            throw new Error('ssss');
          }

          return {
            name: e.code,
            description: e.description,
            po: po.code,
            plo: e.subProgramLearningOutcomes[0].code,
            type: 'NO_DATA',
          };
        }),
        assignmentGroups: assignmentGroups.map((e) => {
          return { name: e.name, description: 'NO_DATA', value: e.weight };
        }),
        thresholds: [
          {
            name: 'PassingScoreThres',
            description: 'Minimum percentage of score for students to pass each assessment',
            value: assignments[0].expectedScorePercentage,
          },
          {
            name: 'PassingStudentThres',
            description: 'Minimum percentage of passing students to succeed each assessment.',
            value: assignments[0].expectedPassingStudentPercentage,
          },
          {
            name: 'PassingItemsThres',
            description: 'Minimum percentage of passing items in CLO for a student to meet CLO.',
            value: clos[0].expectedPassingAssignmentPercentage,
          },
          {
            name: 'PassingCLOsThres',
            description: 'Minimum percentage of CLOs in PO for a student to meet PO',
            value: courseData.expectedPassingCloPercentage,
          },
        ],
      };

      const weeklyPlan: WeeklyPlanSheet = {
        assignments: fullAssignments.map((e, i) => {
          const assignmentGroup = assignmentGroups.find((ag) => ag.id === e.assignmentGroupId);
          if (assignmentGroup === undefined) {
            throw new Error('xxxxxxxxxx');
          }

          return {
            lecture: 'NO_DATA',
            topics: e.description,
            clo: e.courseLearningOutcomes[0].code,
            assessment: assignmentGroup.name,
            item: e.name,
            include: e.isIncludedInClo,
            evidence: 'NO_DATA',
            score: e.maxScore,
            description: 'NO_DATA',
            assessmentType: 'NO_DATA',
            learningActivity: 'NO_DATA',
          };
        }),
      };

      const scoreByAssignmentByStudent = new Map<string, Map<string, number>>();

      fullScores.forEach((assignment) => {
        assignment.scores.forEach((score) => {
          const assignment = fullAssignments.find((a) => a.id === score.assignmentId);
          if (!assignment) {
            throw new Error('sdfsfdasfd');
          }

          if (!scoreByAssignmentByStudent.get(score.studentId)) {
            scoreByAssignmentByStudent.set(
              score.studentId,
              new Map<string, number>().set(assignment.name, score.score),
            );
          } else {
            scoreByAssignmentByStudent.get(score.studentId)!.set(assignment.name, score.score);
          }
        });
      });

      const rawScore: RawScoreSheet = {
        scoreByAssignmentByStudent,
      };

      setExportButtonMessage('[9/9] DONE');

      const workbook = toExcel(po, weeklyPlan, rawScore);

      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const a = document.createElement('a');
      setIsExporting(false);
      setExportButtonMessage('Export to Excel');
      a.href = URL.createObjectURL(blob);
      a.download = 'PLO_report.xlsx';
      a.click();
    } catch (e) {
      setIsExporting(false);
      setExportButtonMessage('Export to Excel');
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }

      toast.error('unexpected error :(', e as any);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-5  flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Course Information</h3>
            <p className="text-sm text-muted-foreground">Update your course information and settings.</p>
          </div>
          <Button variant={'destructive'} className=" space-x-3" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2Icon className="h-5 w-5" />
            <div className="">Delete course</div>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Button variant={'secondary'} className="  space-x-3" onClick={() => setIsImportOpen(true)}>
            <ImportIcon className="h-5 w-5" />
            <div className="">Import From Excel</div>
          </Button>
          <Button variant={'secondary'} className="space-x-3" onClick={() => downloadExcel()} disabled={isExporting}>
            <FileOutputIcon className="h-5 w-5" />
            <div className="">{exportButtonMessage}</div>
          </Button>
          <Button variant={'secondary'} className=" grow ">
            <a className="flex  items-center space-x-3" href="/template/CPE_course_import_template.xlsx">
              <FolderDotIcon className="h-5 w-5 " />
              <div className="taunca">Download Example Template</div>
            </a>
          </Button>
        </div>

        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <CourseImporterDialog onSubmit={handleSubmitImport} />
        </Dialog>
      </div>
      {courseData === undefined ? (
        <Loading />
      ) : (
        <CourseSettingForm
          defaultValues={{
            code: courseData.code,
            name: courseData.name,
            description: courseData.description,
            curriculum: courseData.curriculum,
            expectedPassingCloPercentage: courseData.expectedPassingCloPercentage,
            academicYear: courseData.academicYear,
            graduateYear: courseData.graduateYear,
            programYear: courseData.programYear,
            criteriaGradeA: courseData.criteriaGradeA,
            criteriaGradeBP: courseData.criteriaGradeBP,
            criteriaGradeB: courseData.criteriaGradeB,
            criteriaGradeCP: courseData.criteriaGradeCP,
            criteriaGradeC: courseData.criteriaGradeC,
            criteriaGradeDP: courseData.criteriaGradeDP,
            criteriaGradeD: courseData.criteriaGradeD,
            criteriaGradeF: courseData.criteriaGradeF,
            IsPortfolioCompleted: courseData.isPortfolioCompleted,
          }}
        />
      )}

      {/* Delete course */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete this course?</DialogTitle>
            <DialogDescription>{`You can't undo this action. This will permanently delete `}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingPage;
