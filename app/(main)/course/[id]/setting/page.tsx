'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { FolderDotIcon, ImportIcon, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import { ImportCourse } from '@/types/schema/importer-schema';

const SettingPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseById(courseId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const { mutate, isError } = useImportCourse();
  const { mutate: deleteCourse, isSuccess } = useDeleteCourse();

  useEffect(() => {
    if (isSuccess) {
      router.push('/course');
    }
  }, [isSuccess, router]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitImport = async (value: ImportCourse) => {
    mutate(value);
    if (!isError) {
      setIsImportOpen(false);
    }
  };

  const onDelete = () => {
    deleteCourse(courseId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Information</h3>
        <p className="text-sm text-muted-foreground">Update your course information and settings.</p>
        <div className="flex flex-row gap-1">
          <Button variant={'secondary'} className="my-5 space-x-3" onClick={() => setIsImportOpen(true)}>
            <ImportIcon className="h-5 w-5" />
            <div className="">Re-Import course</div>
          </Button>
          <Button variant={'secondary'} className="my-5 space-x-3">
            <a className="flex items-center" href="/template/CPE_course_import_template.xlsx">
              <FolderDotIcon className="mr-2 h-4 w-4" />
              Template
            </a>
          </Button>
          <Button
            variant={'destructive'}
            className="my-5 ml-auto space-x-3"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2Icon className="h-5 w-5" />
            <div className="">Delete course</div>
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
