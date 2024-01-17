"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStrictForm } from "@/hooks/form-hook";
import {
  CreateCourseSchema,
  CreateCourseSchemaDefaultValues,
  CreateCourseSchemaValues,
} from "@/types/schema/course-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CourseFormLink from "./form-link";
import { FormProvider, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CourseFormGrade from "./form-grade";
import { useState } from "react";
import { ProgramLearningOutcomeDataTable } from "../../tabee/plo/plo-table";
import { mockPLO, mockSubPLO } from "../../tabee/tabee";

import { SubProgramLearningOutcomeDataTable } from "../../tabee/sub-plo/sub-plo-table";
import { sub } from "date-fns";
import { ploColumns } from "./plo-showcase";
import { subPloColumns } from "./subplo-showcase";

const CourseForm = () => {
  const [selectedRows, setSelectedRows] = useState<string>("");
  const getVales = (id: string) => {
    setSelectedRows(id);
  };

  const form = useStrictForm(
    CreateCourseSchema,
    CreateCourseSchemaDefaultValues
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courseLearningOutcome",
  });

  const checkGrade = (values: CreateCourseSchemaValues) => {
    if (
      values.grade.a < values.grade.b ||
      values.grade.a < values.grade.c ||
      values.grade.a < values.grade.d ||
      values.grade.b < values.grade.c ||
      values.grade.b < values.grade.d ||
      values.grade.c < values.grade.d
    ) {
      console.log("A must be greater than B,C,D");
    } else if (
      values.grade.b < values.grade.c ||
      values.grade.b < values.grade.d ||
      values.grade.b < values.grade.f
    ) {
      console.log("B must be greater than C,D,F");
    } else if (
      values.grade.c < values.grade.d ||
      values.grade.c < values.grade.f
    ) {
      console.log("C must be greater than D,F");
    } else if (values.grade.d < values.grade.f) {
      console.log("D must be greater than F");
    }
  };

  const onSubmit = (values: CreateCourseSchemaValues) => {
    checkGrade(values);
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lecturer"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lecturer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an lecturer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"a"}>นายเก ไม่รู้ลืม</SelectItem>
                      <SelectItem value={"b"}>นายบี สีข้าวสาร</SelectItem>
                      <SelectItem value={"c"}>นายซี สี่ไม่ยั้ง</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Semester</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>1</SelectItem>
                      <SelectItem value={"2"}>2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course introduction and description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-5">Define your course grade</div>
          <CourseFormGrade />

          <div className="pt-5">Course Learning Outcome</div>
          <div className="grid grid-cols-3 gap-y-8  items-center">
            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <CourseFormLink
                    index={index}
                    remove={remove}
                    courseFormLinkLength={fields.length}
                  />
                </div>
              );
            })}
            <Button
              variant={"ghost"}
              type="button"
              className="w-80 h-96 border-2 border-dashed"
              onClick={() => {
                append({
                  code: "",
                  weight: "",
                  description: "",
                  subProgramLearningOutcome: "",
                  programOutcome: "",
                });
              }}
            >
              Add section
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-5 ">
            <div className="space-y-3">
              <h1 className="">Program Learning Outcome</h1>
              <ProgramLearningOutcomeDataTable
                columns={ploColumns}
                data={mockPLO}
                getValues={getVales}
                disableToolbar
                disablePagination
              />
            </div>

            {selectedRows && (
              <div className="space-y-3">
                <h1 className=" ">
                  Sub program learning outcome of {selectedRows}
                </h1>
                <SubProgramLearningOutcomeDataTable
                  columns={subPloColumns}
                  data={mockSubPLO}
                  disableToolbar
                  disablePagination
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create Course
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CourseForm;
