"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import InputForm from "./input-form";
import * as z from "zod";
import { useState } from "react";
import LinkedSection from "./link-section";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  courseId: z.string().nonempty(),
  lecturer: z
    .string({
      required_error: "Lecturer is required",
    })
    .min(3, {
      message: "Lecturer must be at least 3 characters long",
    })
    .max(30, {
      message: "Lecturer must be at most 30 characters long",
    }),
  department: z.string(),
  programme: z.string(),
  faculty: z.string(),
  code: z.string(),
  name: z.string(),
  credit: z.string(),
  bachelorAmount: z.number(),
  masterAmount: z.number(),
  doctorAmount: z.number(),
  resultForm: z.array(
    z.object({
      po: z.string().nonempty({
        message: "PO is required",
      }),
      plo: z.string().nonempty({
        message: "PLO is required",
      }),
      clo: z.array(
        z.object({
          description: z.string(),
          assessment: z.array(
            z.object({
              description: z.string(),
              percentagePredict: z.string(),
              percentageActual: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

const initialLinkedSection = {
  po: "",
  plo: "",
  clo: [],
};

type FormValuesType = z.infer<typeof formSchema>;

export function ResultForm() {
  const [assessmentNumber, setAssessmentNumber] = useState<number[]>([]);
  const form = useForm<FormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: "",
      lecturer: "",
      department: "",
      programme: "",
      faculty: "",
      code: "",
      name: "",
      credit: "",
      bachelorAmount: 0,
      masterAmount: 0,
      doctorAmount: 0,
      resultForm: [],
    },
    mode: "onChange",
  });

  function onSubmit(values: FormValuesType) {
    console.log(values);
  }

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resultForm",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm
          name="courseId"
          lable="Course ID"
          placeholder="eg. CPE111"
          form={form}
        />
        <InputForm
          name="courseName"
          lable="Course Name"
          placeholder="Course Name"
          form={form}
        />
        <InputForm
          name="courseCreadit"
          lable="Course Credit"
          placeholder="Course Credit"
          form={form}
        />
        <InputForm
          name="studentAmount"
          lable="Student Amount"
          placeholder="Student Amount"
          form={form}
        />
        <InputForm
          name="studentDegree"
          lable="Student Degree"
          placeholder="Undergraduate, Master, or Doctorate"
          form={form}
        />
        {/* <InputForm
          name="lecturer"
          lable="Lecturer"
          placeholder="Lecturer"
          form={form}
        /> */}
        <InputForm
          name="department"
          lable="Department"
          placeholder="Department"
          form={form}
        />
        <InputForm
          name="programme"
          lable="Programme"
          placeholder="Programme"
          form={form}
        />
        <InputForm
          name="faculty"
          lable="Faculty"
          placeholder="Faculty"
          form={form}
        />
        <Button
          type="button"
          className={cn("w-full")}
          onClick={() => {
            append(initialLinkedSection);
          }}
        >
          เพิ่ม PLO PO
        </Button>
        <div className="">
          <div className="space-y-5 flex flex-col items-center">
            {fields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col border-2 p-5 w-full"
                >
                  <div className="w-full flex justify-between items-center mb-7">
                    <div className="self-start border-2 rounded-full p-1 px-3 dark:border-white">
                      {index + 1}
                    </div>
                    <Button
                      className="self-end"
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      -
                    </Button>
                  </div>
                  <LinkedSection index={index} form={form} />
                </div>
              );
            })}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
