'use client';

import { PlusCircleIcon } from 'lucide-react';
import { FormProvider, useFieldArray } from 'react-hook-form';

import ArrayInput from '@/components/features/course/course-portfolio/array-input-form';
import AttachedDocumentCheckbox from '@/components/features/course/course-portfolio/attached-doc-checkbox';
import CoursePortfolioHeader from '@/components/features/course/course-portfolio/course-portfolio-header';
import CourseStream from '@/components/features/course/course-portfolio/course-stream';
import { GradeTable } from '@/components/features/course/course-portfolio/grade-table';
import Information from '@/components/features/course/course-portfolio/information';
import OutcomeTable from '@/components/features/course/course-portfolio/outcome-table';
import { Overview } from '@/components/overview';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { coursePortfolioExample } from '@/data/create-portfolio-example';
import { useStrictForm } from '@/hooks/form-hook';
import { generatePortfolioDocument } from '@/libs/word/portfolio-document';
import {
  CreateCoursePortfolioFillableDefaultValues,
  CreateCoursePortfolioFillableSchema,
  CreateCoursePortfolioForm,
} from '@/types/schema/course-portfolio-schema';

const CoursePortfolioPage = () => {
  const form = useStrictForm(
    CreateCoursePortfolioFillableSchema,
    CreateCoursePortfolioFillableDefaultValues,
  );
  const {
    fields: teachingMethodFields,
    append: teachingAppend,
    remove: teachingRemove,
  } = useFieldArray({
    control: form.control,
    name: 'summary.teachingMethod',
  });

  const {
    fields: objectiveFields,
    append: objectiveAppend,
    remove: objectiveRemove,
  } = useFieldArray({
    control: form.control,
    name: 'summary.objective',
  });

  const {
    fields: planFields,
    append: planAppend,
    remove: planRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.plan',
  });

  const {
    fields: doFields,
    append: doAppend,
    remove: doRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.doAndCheck',
  });

  const {
    fields: actFields,
    append: actAppend,
    remove: actRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.act',
  });

  const {
    fields: upstreamFields,
    append: upstreamAppend,
    remove: upstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.subjectsComments.upstream',
  });
  const {
    fields: downstreamFields,
    append: downstreamAppend,
    remove: downstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.subjectsComments.downstream',
  });

  const onSubmit = (values: CreateCoursePortfolioFillableSchema) => {
    const test: CreateCoursePortfolioForm = {
      development: values.development,
      summary: values.summary,
      info: coursePortfolioExample.info,
      result: coursePortfolioExample.result,
    };

    generatePortfolioDocument(test);
  };

  return (
    <div className="container hidden  flex-col space-y-3 md:flex">
      <CoursePortfolioHeader />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" space-y-7  pt-6 text-lg ">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Course portfolio
              </h2>
              <p className="text-muted-foreground">
                Edit and submit your course portfolio.
              </p>
            </div>
            {/* information */}
            <div className="space-y-2 ">
              <div className="text-xl font-semibold">1. รายละเอียด</div>
              <Information label="ภาควิชา" value="วิศวกรรมคอมพิวเตอร์" />
              <Information label="หลักสูตร" value="ปกติ" />
              <div className="w-4/5 space-y-2">
                <div className="grid grid-cols-3">
                  <Information label="รหัสวิชา" value="CPEXXX" />
                  <Information label="ชื่อวิชา" value="Computer exploration" />
                  <Information label="จำนวนหน่วยกิต" value="3" />
                </div>
                <div className="grid grid-cols-3">
                  <Information label="นักศึกษาระดับ" value="ป.ตรี" />
                  <Information label="จำนวนนักศึกษา" value="100" />
                </div>
              </div>
              <Information
                label="ชื่ออาจารยฺ์ผู้สอน"
                value="นาย วิศวะ คอมพิวเตอร์"
              />
            </div>
            {/* Summary */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">2. สรุปผลการดำเนินงาน</div>
              <div className="flex items-center space-x-5 ">
                <Label className="text-lg">
                  2.1 วิธีการสอนและการประเมินผล{' '}
                </Label>
                <PlusCircleIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => teachingAppend({ name: '' })}
                />
              </div>
              {teachingMethodFields.map((item, index) => {
                return (
                  <ArrayInput
                    index={index}
                    remove={teachingRemove}
                    key={item.id}
                    fieldLength={teachingMethodFields.length}
                    fieldName={`summary.teachingMethod[${index}].name`}
                  />
                );
              })}
              <Label className="text-lg">2.2 ระบบออนไลน์</Label>
              <FormField
                control={form.control}
                name={`summary.onlineTool`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-5">
                <Label className="text-lg">2.3 วัตถุประสงค์การสอน</Label>
                <PlusCircleIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => objectiveAppend({ name: '' })}
                />
              </div>
              {objectiveFields.map((item, index) => {
                return (
                  <ArrayInput
                    index={index}
                    remove={objectiveRemove}
                    key={item.id}
                    fieldLength={objectiveFields.length}
                    fieldName={`summary.objective[${index}].name`}
                  />
                );
              })}
            </div>
            {/* Outcome */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">3. ผลการศึกษา</div>
              <div className="space-y-5">
                <Label className="text-lg font-semibold">3.1 เกรด</Label>
                <div className="mx-auto w-3/4 space-y-5">
                  <Overview />
                  <div className="mx-auto w-3/4">
                    <GradeTable />
                  </div>
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="text-lg font-semibold">
                  3.2 ผลลัพธ์การศึกษาของหลักสูตร
                </Label>
                <Input type="string" />
              </div>
              <div className="">
                <OutcomeTable />
              </div>
            </div>
            {/* Development */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">4. การพัฒนา</div>
              <div className="flex items-center space-x-5">
                <Label className="text-lg">
                  4.1 การพัฒนาจากรอบที่แล้ว (Plan)
                </Label>
                <PlusCircleIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => planAppend({ name: '' })}
                />
              </div>
              {planFields.map((item, index) => {
                return (
                  <ArrayInput
                    index={index}
                    remove={planRemove}
                    key={item.id}
                    fieldLength={planFields.length}
                    fieldName={`development.plan[${index}].name`}
                  />
                );
              })}
              <div className="flex items-center space-x-5">
                <Label className="text-lg">
                  4.2 การพัฒนาและปัญหาหลัก (Do & Check)
                </Label>
                <PlusCircleIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => doAppend({ name: '' })}
                />
              </div>
              {doFields.map((item, index) => {
                return (
                  <ArrayInput
                    index={index}
                    remove={doRemove}
                    key={item.id}
                    fieldLength={doFields.length}
                    fieldName={`development.doAndCheck[${index}].name`}
                  />
                );
              })}
              <div className="flex items-center space-x-5">
                <Label className="text-lg">
                  4.3 แนวทางการปรับปรุงในรอบหน้า (Act)
                </Label>
                <PlusCircleIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => actAppend({ name: '' })}
                />
              </div>
              {actFields.map((item, index) => {
                return (
                  <ArrayInput
                    index={index}
                    remove={actRemove}
                    key={item.id}
                    fieldLength={actFields.length}
                    fieldName={`development.act[${index}].name`}
                  />
                );
              })}
              <div className="mx-auto w-11/12 space-y-2">
                <Label className="text-lg font-semibold">
                  4.4 ความคิดเห็นสำหรับวิชาอื่น
                </Label>
                <div>
                  <Label className="text-lg">วิชา Upstream</Label>
                  <div className="grid grid-cols-3 gap-5">
                    {upstreamFields.map((item, index) => {
                      return (
                        <CourseStream
                          index={index}
                          remove={upstreamRemove}
                          key={item.id}
                          fieldLength={upstreamFields.length}
                          fieldCourseName={`development.subjectsComments.upstream[${index}].courseName`}
                          fieldCourseComment={`development.subjectsComments.upstream[${index}].comments`}
                        />
                      );
                    })}
                    <Button
                      variant={'ghost'}
                      type="button"
                      className="h-auto  w-full  border-2 border-dashed"
                      onClick={() => {
                        upstreamAppend({ courseName: '', comments: '' });
                      }}
                    >
                      Add section
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-lg">วิชา Downstream</Label>
                  <div className="grid grid-cols-3 gap-5">
                    {downstreamFields.map((item, index) => {
                      return (
                        <CourseStream
                          index={index}
                          remove={downstreamRemove}
                          key={item.id}
                          fieldLength={downstreamFields.length}
                          fieldCourseName={`development.subjectsComments.downstream[${index}].courseName`}
                          fieldCourseComment={`development.subjectsComments.downstream[${index}].comments`}
                        />
                      );
                    })}
                    <Button
                      variant={'ghost'}
                      type="button"
                      className="h-auto  w-full  border-2 border-dashed"
                      onClick={() => {
                        downstreamAppend({ courseName: '', comments: '' });
                      }}
                    >
                      Add section
                    </Button>
                  </div>
                </div>
                <Label className="text-lg">วิชาอื่นๆ (ถ้ามี)</Label>
                <FormField
                  control={form.control}
                  name={`development.subjectsComments.other`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="text-lg">ความคิดเห็นอื่นๆ (ถ้ามี)</Label>
              <FormField
                control={form.control}
                name={`development.otherComments`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Attached documents */}
            <div className="space-y-2">
              <div className="text-xl font-semibold ">5.เอกสารแนบ</div>
              <AttachedDocumentCheckbox lable="1. แบบประเมินผลการเรียนรู้" />
              <AttachedDocumentCheckbox lable="2. การประชุมรายวิชา(ผู้สอนหลายคน) บันทึกรายวิชา (ผู้สอนคนเดียว) ก่อนเปิดภาคการศึกษา" />
              <AttachedDocumentCheckbox lable="3. การประชุมรายวิชา(ผู้สอนหลายคน) บันทึกรายวิชา (ผู้สอนคนเดียว) สิ้นภาคการศึกษา" />
              <AttachedDocumentCheckbox lable="4. การประเมิณตาม TABEE Outcome" />
            </div>
            <Button className="w-full">Export course portfolio</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CoursePortfolioPage;
