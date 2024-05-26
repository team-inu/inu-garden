'use client';

import { FolderDotIcon, SkullIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CourseImporterDialog from '@/components/features/course/importer/course-importer-dialog';
import CourseSettingForm from '@/components/features/course/settings/course-setting-form';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useGetCourseById } from '@/hooks/course-hook';
import { useImportCourse } from '@/hooks/importer-hook';
import { ImportCourse } from '@/types/schema/importer-schema';

const SettingPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseById(courseId);

  const [isImportOpen, setIsImportOpen] = useState(false);
  const { mutate, isError } = useImportCourse();
  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitImport = async (value: ImportCourse) => {
    mutate(value);
    if (!isError) {
      setIsImportOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Information</h3>
        <p className="text-sm text-muted-foreground">Update your course information and settings.</p>
        <div className="flex flex-row gap-1">
          <Button variant={'secondary'} className="my-5 space-x-3" onClick={() => setIsImportOpen(true)}>
            <SkullIcon className="h-5 w-5" />
            <div className="">Re-Import course</div>
          </Button>
          <Button variant={'secondary'} className="my-5 space-x-3">
            <a className="flex items-center" href="/template/CPE_course_import_template.xlsx">
              <FolderDotIcon className="mr-2 h-4 w-4" />
              Template
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
    </div>
  );
};

export default SettingPage;
