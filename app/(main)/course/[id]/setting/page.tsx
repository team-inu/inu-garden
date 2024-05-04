'use client';

import { useParams } from 'next/navigation';

import CourseSettingForm from '@/components/features/course/settings/course-setting-form';
import Loading from '@/components/features/loading-screen';
import { useGetCourseById } from '@/hooks/course-hook';

const SettingPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseById(courseId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your course information and settings.
        </p>
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
            expectedPassingCloPercentage:
              courseData.expectedPassingCloPercentage,
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
