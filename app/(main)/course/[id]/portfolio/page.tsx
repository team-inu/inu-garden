"use client";
import ArrayInput from "@/components/features/course/course-portfolio/array-input-form";
import AttachedDocumentCheckbox from "@/components/features/course/course-portfolio/attached-doc-checkbox";
import CourseStream from "@/components/features/course/course-portfolio/course-stream";
import { GradeTable } from "@/components/features/course/course-portfolio/grade-table";
import Information from "@/components/features/course/course-portfolio/information";
import OutcomeTable from "@/components/features/course/course-portfolio/outcome-table";
import { Overview } from "@/components/overview";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coursePortfolioFetch } from '@/data/create-portfolio';
import { useStrictForm } from "@/hooks/form-hook";
import { generatePortfolioDocument } from '@/libs/word/portfolio-document';
import {
  CreateCoursePortfolioFillableSchema,
  CreateCoursePortfolioFillableSchemaDefaultValues,
  CreateCoursePortfolioFillableSchemaType,
  CreateCoursePortfolioSchemaType,
} from "@/types/schema/course-portfolio-schema";
import { ArrowBigLeftDashIcon, PlusCircleIcon } from "lucide-react";
import { FormProvider, useFieldArray } from "react-hook-form";

const CoursePortfolioPage = () => {
  const form = useStrictForm(
    CreateCoursePortfolioFillableSchema,
    CreateCoursePortfolioFillableSchemaDefaultValues
  );
  const {
    fields: teachingMethodFields,
    append: teachingAppend,
    remove: teachingRemove,
  } = useFieldArray({
    control: form.control,
    name: "summary.teachingMethod",
  });

  const {
    fields: objectiveFields,
    append: objectiveAppend,
    remove: objectiveRemove,
  } = useFieldArray({
    control: form.control,
    name: "summary.objective",
  });

  const {
    fields: planFields,
    append: planAppend,
    remove: planRemove,
  } = useFieldArray({
    control: form.control,
    name: "development.plan",
  });

  const {
    fields: doFields,
    append: doAppend,
    remove: doRemove,
  } = useFieldArray({
    control: form.control,
    name: "development.doAndCheck",
  });

  const {
    fields: actFields,
    append: actAppend,
    remove: actRemove,
  } = useFieldArray({
    control: form.control,
    name: "development.act",
  });

  const {
    fields: upstreamFields,
    append: upstreamAppend,
    remove: upstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: "development.subjectsComments.upstream",
  });
  const {
    fields: downstreamFields,
    append: downstreamAppend,
    remove: downstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: "development.subjectsComments.downstream",
  });

  const onSubmit = (values: CreateCoursePortfolioFillableSchemaType) => {
    console.log('hi gus')

    const test: CreateCoursePortfolioSchemaType = {
      development: values.development,
      summary: values.summary,
      info: coursePortfolioFetch.info,
      outcome: coursePortfolioFetch.outcome,
    }

    generatePortfolioDocument(test);
  };

  return (
    <div className="hidden flex-col md:flex">
      <Button
        variant="secondary"
        className="self-start mx-10 mt-5 absolute"
        onClick={() => window.history.back()}
      >
        <ArrowBigLeftDashIcon className="w-5 h-5" />
        Back
      </Button>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container p-8 pt-6 text-lg space-y-7 shadow-sm shadow-white">
            {/* button back to before page */}
            <h2 className="text-3xl py-3   text-center font-bold tracking-tight bg-primary">
              Course Portfolio
            </h2>
            {/* information */}
            <div className="space-y-2 ">
              <div className="text-xl font-semibold">1. รายละเอียด</div>
              <Information lable="ภาควิชา" value="วิศวกรรมคอมพิวเตอร์" />
              <Information lable="หลักสูตร" value="ปกติ" />
              <div className="w-4/5 space-y-2">
                <div className="grid grid-cols-3">
                  <Information lable="รหัสวิชา" value="CPEXXX" />
                  <Information lable="ชื่อวิชา" value="Computer exploration" />
                  <Information lable="จำนวนหน่วยกิต" value="3" />
                </div>
                <div className="grid grid-cols-3">
                  <Information lable="นักศึกษาระดับ" value="ป.ตรี" />
                  <Information lable="จำนวนนักศึกษา" value="100" />
                </div>
              </div>
              <Information
                lable="ชื่ออาจารยฺ์ผู้สอน"
                value="นาย วิศวะ คอมพิวเตอร์"
              />
            </div>
            {/* Summary */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">2. สรุปผลการดำเนินงาน</div>
              <div className="flex space-x-5 items-center ">
                <Label className="text-lg">
                  2.1 วิธีการสอนและการประเมินผล{" "}
                </Label>
                <PlusCircleIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => teachingAppend({ name: "" })}
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
              <div className="flex space-x-5 items-center">
                <Label className="text-lg">2.3 วัตถุประสงค์การสอน</Label>
                <PlusCircleIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => objectiveAppend({ name: "" })}
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
                <div className="w-3/4 mx-auto space-y-5">
                  <Overview />
                  <div className="w-3/4 mx-auto">
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
              <div className="flex space-x-5 items-center">
                <Label className="text-lg">
                  4.1 การพัฒนาจากรอบที่แล้ว (Plan)
                </Label>
                <PlusCircleIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => planAppend({ name: "" })}
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
              <div className="flex space-x-5 items-center">
                <Label className="text-lg">
                  4.2 การพัฒนาและปัญหาหลัก (Do & Check)
                </Label>
                <PlusCircleIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => doAppend({ name: "" })}
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
              <div className="flex space-x-5 items-center">
                <Label className="text-lg">
                  4.3 แนวทางการปรับปรุงในรอบหน้า (Act)
                </Label>
                <PlusCircleIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => actAppend({ name: "" })}
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
              <div className="w-11/12 mx-auto space-y-2">
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
                      variant={"ghost"}
                      type="button"
                      className="w-full  h-auto  border-2 border-dashed"
                      onClick={() => {
                        upstreamAppend({ courseName: "", comments: "" });
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
                      variant={"ghost"}
                      type="button"
                      className="w-full  h-auto  border-2 border-dashed"
                      onClick={() => {
                        downstreamAppend({ courseName: "", comments: "" });
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
