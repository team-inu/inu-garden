'use client';

import { PlusCircleIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

import ArrayInput from '@/components/features/course/course-portfolio/array-input-form';
import CoursePortfolioHeader from '@/components/features/course/course-portfolio/course-portfolio-header';
import CourseStream from '@/components/features/course/course-portfolio/course-stream';
import GradeTable from '@/components/features/course/course-portfolio/grade-table';
import Information from '@/components/features/course/course-portfolio/information';
import OutcomeTable from '@/components/features/course/course-portfolio/outcome-table';
import Loading from '@/components/features/loading-screen';
import Overview from '@/components/overview';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useGetCoursePortfolio,
  useUpdateCoursePortfolio,
} from '@/hooks/course-portfolio-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { useScreenshot } from '@/hooks/screenshot-hook';
import { generatePortfolioDocument } from '@/libs/word/portfolio-document';
import {
  CourseResult,
  CreateCoursePortfolioFillableDefaultValues,
  CreateCoursePortfolioFillableSchema,
  CreateCoursePortfolioForm,
} from '@/types/schema/course-portfolio-schema';

const CoursePortfolioPage = () => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data, isLoading } = useGetCoursePortfolio(courseId);
  const { mutate } = useUpdateCoursePortfolio();

  //convert data array of string to realData array of object
  let realData: CreateCoursePortfolioFillableSchema =
    CreateCoursePortfolioFillableDefaultValues;

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
    name: 'summary.teachingMethods',
  });

  const {
    fields: objectiveFields,
    append: objectiveAppend,
    remove: objectiveRemove,
  } = useFieldArray({
    control: form.control,
    name: 'summary.objectives',
  });

  const {
    fields: planFields,
    append: planAppend,
    remove: planRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.plans',
  });

  const {
    fields: doFields,
    append: doAppend,
    remove: doRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.doAndChecks',
  });

  const {
    fields: actFields,
    append: actAppend,
    remove: actRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.acts',
  });

  const {
    fields: upstreamFields,
    append: upstreamAppend,
    remove: upstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.subjectComments.upstreamSubjects',
  });
  const {
    fields: downstreamFields,
    append: downstreamAppend,
    remove: downstreamRemove,
  } = useFieldArray({
    control: form.control,
    name: 'development.subjectComments.downstreamSubjects',
  });

  const onSubmit = async (values: CreateCoursePortfolioFillableSchema) => {
    const image = await takeScreenshot(ref.current);

    if (!data) {
      toast.error('data was not completed');
      return;
    }

    if (!image) {
      toast.error('cannot generate grade distribution image');
      return;
    }

    const courseResult: CourseResult = data.result;
    courseResult.gradeDistributionImage = image;

    const coursePortfolio: CreateCoursePortfolioForm = {
      development: values.development,
      summary: values.summary,
      info: data.info,
      result: courseResult,
    };

    generatePortfolioDocument(coursePortfolio);
  };

  const onSaved = () => {
    //get data from form
    const values = form.getValues();
    //call mutation
    console.log(values);
    mutate({ courseId, data: values });
  };

  useEffect(() => {
    if (data) {
      realData.development = {
        plans: data?.development.plans?.map((e) => ({ name: e })) ?? [],
        doAndChecks:
          data?.development.doAndChecks?.map((e) => ({ name: e })) ?? [],
        acts: data?.development.acts?.map((e) => ({ name: e })) ?? [],
        subjectComments: {
          other: data?.development.subjectComments.other ?? '',
          upstreamSubjects:
            data?.development.subjectComments.upstreamSubjects?.map((e) => ({
              courseName: e.courseName,
              comments: e.comments,
            })) ?? [],
          downstreamSubjects:
            data?.development.subjectComments.downstreamSubjects?.map((e) => ({
              courseName: e.courseName,
              comments: e.comments,
            })) ?? [],
        },
        otherComment: data?.development.otherComment ?? '',
      };

      realData.summary = {
        teachingMethods:
          data?.summary.teachingMethods?.map((e) => ({ name: e })) ?? [],
        objectives: data?.summary.objectives?.map((e) => ({ name: e })) ?? [],
        onlineTools: data?.summary.onlineTools ?? '',
      };
      form.reset(realData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot({});

  if (isLoading) return <Loading />;
  if (data === undefined) return <div>error</div>;

  return (
    <div className="container hidden flex-col  space-y-3 py-5 md:flex">
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
            <div className="space-y-2 rounded-lg ">
              <div className="text-xl font-semibold">1. รายละเอียด</div>
              <Information label="ภาควิชา" value="วิศวกรรมคอมพิวเตอร์" />
              <Information label="หลักสูตร" value="ปกติ" />
              <div className="w-4/5 space-y-2">
                <div className="grid grid-cols-3">
                  <Information
                    label="รหัสวิชา"
                    value={data?.info.courseCode ?? '-'}
                  />
                  <Information
                    label="ชื่อวิชา"
                    value={data?.info.courseName ?? '-'}
                  />
                  <Information label="จำนวนหน่วยกิต" value="3" />
                </div>
                <div className="grid grid-cols-3">
                  <Information label="นักศึกษาระดับ" value="ป.ตรี" />
                  <Information
                    label="จำนวนนักศึกษา"
                    value={data.result.gradeDistribution.studentAmount}
                  />
                </div>
              </div>
              <Information
                label="ชื่ออาจารย์ผู้สอน"
                value={data?.info.lecturers[0] ?? '-'}
              />
            </div>
            {/* Summary */}
            <div className="space-y-2 rounded-lg ">
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
                    fieldName={`summary.teachingMethods[${index}].name`}
                  />
                );
              })}
              <Label className="text-lg">2.2 ระบบออนไลน์</Label>
              <FormField
                control={form.control}
                name={`summary.onlineTools`}
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
                    fieldName={`summary.objectives[${index}].name`}
                  />
                );
              })}
            </div>
            {/* Outcome */}
            <div className="space-y-2">
              <div className="text-xl font-semibold">3. ผลการศึกษา</div>
              <div className="space-y-5">
                <Label className="text-lg font-semibold">3.1 เกรด</Label>
                <div className="">
                  <div ref={ref}>
                    <Overview
                      data={data.result.gradeDistribution.scoreFrequencies}
                    />
                  </div>
                  <div className="mx-auto w-3/4">
                    <GradeTable
                      gradeDistribution={data.result.gradeDistribution}
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="text-lg font-semibold">
                  3.2 ผลลัพธ์การศึกษาของหลักสูตร
                </Label>
                <div className="ml-5 flex flex-col">
                  {data.result.pos.map((po) => (
                    <Label key={po.code} className="text-lg">
                      <span className="font-semibold">PO{po.code}:</span>{' '}
                      {po.name}
                    </Label>
                  ))}

                  {data.result.plos.map((plo, i) => (
                    <div className="flex flex-col" key={i}>
                      <Label className="text-lg ">
                        <span className="font-semibold">PLO{plo.code}:</span>{' '}
                        {plo.name}
                      </Label>
                      {plo.nested.map((subPlo) => (
                        <Label key={subPlo.code} className="text-lg">
                          <span className="font-semibold">
                            {' '}
                            PLO ย่อย{subPlo.code}:
                          </span>{' '}
                          {subPlo.name}
                        </Label>
                      ))}
                    </div>
                  ))}

                  {data.result.clos.map((clo) => (
                    <Label key={clo.code} className="text-lg">
                      <span className="font-semibold">{clo.code}:</span>{' '}
                      {clo.name}
                    </Label>
                  ))}
                </div>
              </div>
              <div className="">
                <OutcomeTable tabeeOutcomes={data.result.tabeeOutcomes} />
              </div>
            </div>
            {/* Development */}
            <div className="space-y-2 rounded-lg ">
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
                    fieldName={`development.plans[${index}].name`}
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
                    fieldName={`development.doAndChecks[${index}].name`}
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
                    fieldName={`development.acts[${index}].name`}
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
                          fieldCourseName={`development.subjectComments.upstreamSubjects[${index}].courseName`}
                          fieldCourseComment={`development.subjectComments.upstreamSubjects[${index}].comments`}
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
                          fieldCourseName={`development.subjectComments.downstreamSubjects[${index}].courseName`}
                          fieldCourseComment={`development.subjectComments.downstreamSubjects[${index}].comments`}
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
                  name={`development.subjectComments.other`}
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
                name={`development.otherComment`}
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
            {/* <div className="space-y-2">
              <div className="text-xl font-semibold ">5.เอกสารแนบ</div>
              <AttachedDocumentCheckbox lable="1. แบบประเมินผลการเรียนรู้" />
              <AttachedDocumentCheckbox lable="2. การประชุมรายวิชา(ผู้สอนหลายคน) บันทึกรายวิชา (ผู้สอนคนเดียว) ก่อนเปิดภาคการศึกษา" />
              <AttachedDocumentCheckbox lable="3. การประชุมรายวิชา(ผู้สอนหลายคน) บันทึกรายวิชา (ผู้สอนคนเดียว) สิ้นภาคการศึกษา" />
              <AttachedDocumentCheckbox lable="4. การประเมิณตาม TABEE Outcome" />
            </div> */}
            <div className="">
              <Button className="w-full">Export course portfolio</Button>
            </div>
          </div>
        </form>
      </FormProvider>
      <Button className="" variant={'default'} onClick={onSaved}>
        Save draft
      </Button>
    </div>
  );
};

export default CoursePortfolioPage;
