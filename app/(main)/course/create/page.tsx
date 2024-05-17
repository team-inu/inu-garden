'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const rounter = useRouter();
  const form = useStrictForm(
    CreateCourseSchema,
    CreateCourseSchemaDefaultValues,
  );
  const { mutate, isSuccess } = useCreateCourse();

  useEffect(() => {
    if (isSuccess) {
      rounter.push('/course');
    }
  }, [form, isSuccess, rounter]);
  const onSubmit = (values: CreateCourseSchemaValues) => {
    checkGrade(values);
    mutate(values);
  };

  const checkGrade = (values: CreateCourseSchemaValues) => {
    if (values.criteriaGradeA < values.criteriaGradeBP) {
      throw new Error('A grade must be greater than B+ grade');
    }
    if (values.criteriaGradeBP < values.criteriaGradeB) {
      throw new Error('B+ grade must be greater than B grade');
    }
    if (values.criteriaGradeB < values.criteriaGradeCP) {
      throw new Error('B grade must be greater than C+ grade');
    }
    if (values.criteriaGradeCP < values.criteriaGradeC) {
      throw new Error('C+ grade must be greater than C grade');
    }
    if (values.criteriaGradeC < values.criteriaGradeDP) {
      throw new Error('C grade must be greater than D+ grade');
    }
    if (values.criteriaGradeDP < values.criteriaGradeD) {
      throw new Error('D+ grade must be greater than D grade');
    }
    if (values.criteriaGradeD < values.criteriaGradeF) {
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
