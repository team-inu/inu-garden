'use client';

import { ArrowBigLeftDashIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import CourseForm from '@/components/features/course/course-form/form';
import CourseFormHeader from '@/components/features/course/course-form/form-header';
import { Button } from '@/components/ui/button';
import { useCreateCourse } from '@/hooks/course-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { cn } from '@/libs/utils';
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
    if (
      values.grade.a < values.grade.b ||
      values.grade.a < values.grade.c ||
      values.grade.a < values.grade.d ||
      values.grade.b < values.grade.c ||
      values.grade.b < values.grade.d ||
      values.grade.c < values.grade.d
    ) {
      console.log('A must be greater than B,C,D');
    } else if (
      values.grade.b < values.grade.c ||
      values.grade.b < values.grade.d ||
      values.grade.b < values.grade.f
    ) {
      console.log('B must be greater than C,D,F');
    } else if (
      values.grade.c < values.grade.d ||
      values.grade.c < values.grade.f
    ) {
      console.log('C must be greater than D,F');
    } else if (values.grade.d < values.grade.f) {
      console.log('D must be greater than F');
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Button
          className="absolute mx-10 mt-5 self-start"
          onClick={() => window.history.back()}
        >
          <ArrowBigLeftDashIcon className="h-5 w-5" />
          Back
        </Button>
        <div className="container py-8 shadow-sm shadow-white">
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
  );
};

export default CreateCoursePage;
