'use client';

import { SkullIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CourseImporterDialog from '@/components/features/course/importer/course-importer-dialog';
import CourseSettingForm from '@/components/features/course/settings/course-setting-form';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useGetCourseById } from '@/hooks/course-hook';

const SettingPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseById(courseId);

  const [isImportOpen, setIsImportOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Information</h3>
        <p className="text-sm text-muted-foreground">Update your course information and settings.</p>

        <Button variant={'secondary'} className="my-5 space-x-3" onClick={() => setIsImportOpen(true)}>
          <SkullIcon className="h-5 w-5" />
          <div className="">Re-Import course</div>
        </Button>
        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <CourseImporterDialog />
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
