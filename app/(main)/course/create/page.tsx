'use client';

import { FormProvider } from 'react-hook-form';

import CreateCourseHeader from '@/components/features/course/course-form/create-course-header';
import CourseForm from '@/components/features/course/course-form/form';
import CourseFormHeader from '@/components/features/course/course-form/form-header';
import { Button } from '@/components/ui/button';
import { useCreateCourse } from '@/hooks/course-hook';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateCourseSchema,
  CreateCourseSchemaDefaultValues,
  CreateCourseSchemaValues,
} from '@/types/schema/course-schema';

const CreateCoursePage = () => {
  const form = useStrictForm(
    CreateCourseSchema,
    CreateCourseSchemaDefaultValues,
  );
  const { mutate, isPending: isSubmitting } = useCreateCourse();
  const onSubmit = (values: CreateCourseSchemaValues) => {
    checkGrade(values);
    mutate(values);
  };

  const checkGrade = (values: CreateCourseSchemaValues) => {
    const grade = values.criteriaGrade;
    if (grade.criteriaGradeA < grade.criteriaGradeBP) {
      throw new Error('A grade must be greater than B+ grade');
    }
    if (grade.criteriaGradeBP < grade.criteriaGradeB) {
      throw new Error('B+ grade must be greater than B grade');
    }
    if (grade.criteriaGradeB < grade.criteriaGradeCP) {
      throw new Error('B grade must be greater than C+ grade');
    }
    if (grade.criteriaGradeCP < grade.criteriaGradeC) {
      throw new Error('C+ grade must be greater than C grade');
    }
    if (grade.criteriaGradeC < grade.criteriaGradeDP) {
      throw new Error('C grade must be greater than D+ grade');
    }
    if (grade.criteriaGradeDP < grade.criteriaGradeD) {
      throw new Error('D+ grade must be greater than D grade');
    }
    if (grade.criteriaGradeD < grade.criteriaGradeF) {
      throw new Error('D grade must be greater than F grade');
    }
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="container space-y-5 ">
            <CreateCourseHeader />
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="mb-5">
                <h1 className="text-4xl font-bold ">Create Course</h1>
                <span className="text-gray-400">define your course</span>
              </div>
              <div>
                <CourseFormHeader />
              </div>
            </div>
            {/* Form */}
            <div className="space-y-5">
              <CourseForm />
              <Button type="submit" className={'w-full'}>
                Create Course
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateCoursePage;
