"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import InputForm from "../input-form";
import * as z from "zod";
import LinkedSection from "./link-section";
import { cn } from "@/lib/utils";
import SelectForm from "../selection-form";
import MultiSelectionForm from "../multi-selection-form";

const resultFormSchema = z.object({
  courseId: z.string().nonempty(),
  name: z.string(),
  faculty: z.string(),
  department: z.string(),
  programme: z.string(),
  courseCreadit: z.string(),
  studentDegree: z.array(z.string()).nonempty({
    message: "Student Degree is required",
  }),
  studentAmount: z.string(),
  lecturer: z.string(),
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
          description: z.string().nonempty(),
          assessment: z.array(
            z.object({
              description: z.string().nonempty({
                message: "required",
              }),
              percentagePredict: z.string().nonempty({
                message: "required",
              }),
              percentageActual: z.string().nonempty({
                message: "required",
              }),
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
  clo: [
    {
      description: "",
      assessment: [
        {
          description: "",
          percentagePredict: "",
          percentageActual: "",
        },
      ],
    },
  ],
};

type FormValuesType = z.infer<typeof resultFormSchema>;

export function ResultForm() {
  const form = useForm<FormValuesType>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      courseId: "",
      name: "",
      faculty: "",
      department: "",
      programme: "",
      courseCreadit: "",
      studentDegree: [],
      studentAmount: "",
      lecturer: "",
      resultForm: [initialLinkedSection],
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
          name="name"
          lable="Course Name"
          placeholder="Course Name"
          form={form}
        />
        <SelectForm
          name="faculty"
          lable="Faculty"
          placeholder="Please select faculty"
          form={form}
          options={[
            {
              value: "engineering",
              text: "Engineering",
            },
            {
              value: "science",
              text: "Science",
            },
          ]}
        />
        <SelectForm
          name="department"
          lable="Department"
          placeholder="Please select department"
          form={form}
          options={[
            {
              value: "computer",
              text: "Computer",
            },
            {
              value: "electrical",
              text: "Electrical",
            },
          ]}
        />
        <SelectForm
          name="programme"
          lable="Programme"
          placeholder="Please select programme"
          form={form}
          options={[
            {
              text: "Regular",
              value: "regular",
            },
            {
              text: "International",
              value: "international",
            },
            {
              text: "RC",
              value: "rc",
            },
            {
              text: "TC",
              value: "tc",
            },
          ]}
        />
        <InputForm
          name="courseCreadit"
          lable="Course Credit"
          placeholder="Course Credit"
          form={form}
        />
        <MultiSelectionForm
          name="studentDegree"
          lable={"Student Degree"}
          placeholder={"Please select student degree"}
          form={form}
          options={[
            {
              value: "bachelor1",
              text: "Bachelor year 1",
            },
            {
              value: "bachelor2",
              text: "Bachelor year 2",
            },
            {
              value: "bachelor3",
              text: "Bachelor year 3",
            },
            {
              value: "bachelor4",
              text: "Bachelor year 4",
            },
            {
              value: "master1",
              text: "Master year 1",
            },
            {
              value: "master2",
              text: "Master year 2",
            },
            {
              value: "doctor1",
              text: "Doctor year 1",
            },
            {
              value: "doctor2",
              text: "Doctor year 2",
            },
          ]}
        />
        <InputForm
          name="studentAmount"
          lable="Student Amount"
          placeholder="Student Amount"
          form={form}
        />

        <InputForm
          name="lecturer"
          lable="Lecturer"
          placeholder="Lecturer"
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
                    {fields.length > 1 && (
                      <Button
                        className="self-end"
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        -
                      </Button>
                    )}
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
