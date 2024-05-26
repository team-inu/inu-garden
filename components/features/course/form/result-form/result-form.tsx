'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import InputForm from '@/components/features/course/form/input-form';
import MultiSelectionForm from '@/components/features/course/form/multi-selection-form';
import LinkedSection from '@/components/features/course/form/result-form/link-section';
import SelectForm from '@/components/features/course/form/selection-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/libs/utils';

const resultFormSchema = z.object({
  courseId: z.string().nonempty(),
  name: z.string(),
  faculty: z.string(),
  department: z.string(),
  programme: z.string(),
  courseCreadit: z.string(),
  studentDegree: z.array(z.string()).nonempty({
    message: 'Student Degree is required',
  }),
  studentAmount: z.string(),
  user: z.string(),
  resultForm: z.array(
    z.object({
      po: z.string().nonempty({
        message: 'PO is required',
      }),
      plo: z.string().nonempty({
        message: 'PLO is required',
      }),
      clo: z.array(
        z.object({
          description: z.string().nonempty(),
          assessment: z.array(
            z.object({
              description: z.string().nonempty({
                message: 'required',
              }),
              percentagePredict: z.string().nonempty({
                message: 'required',
              }),
              percentageActual: z.string().nonempty({
                message: 'required',
              }),
            }),
          ),
        }),
      ),
    }),
  ),
});

const initialLinkedSection = {
  po: '',
  plo: '',
  clo: [
    {
      description: '',
      assessment: [
        {
          description: '',
          percentagePredict: '',
          percentageActual: '',
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
      courseId: '',
      name: '',
      faculty: '',
      department: '',
      programme: '',
      courseCreadit: '',
      studentDegree: [],
      studentAmount: '',
      user: '',
      resultForm: [initialLinkedSection],
    },
    mode: 'onChange',
  });

  function onSubmit(values: FormValuesType) {
    console.log(values);
  }

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resultForm',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm name="courseId" lable="Course ID" placeholder="eg. CPE111" form={form} />
        <InputForm name="name" lable="Course Name" placeholder="Course Name" form={form} />
        <SelectForm
          name="faculty"
          lable="Faculty"
          placeholder="Please select faculty"
          form={form}
          options={[
            {
              value: 'engineering',
              text: 'Engineering',
            },
            {
              value: 'science',
              text: 'Science',
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
              value: 'computer',
              text: 'Computer',
            },
            {
              value: 'electrical',
              text: 'Electrical',
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
              text: 'Regular',
              value: 'regular',
            },
            {
              text: 'International',
              value: 'international',
            },
            {
              text: 'RC',
              value: 'rc',
            },
            {
              text: 'TC',
              value: 'tc',
            },
          ]}
        />
        <InputForm name="courseCreadit" lable="Course Credit" placeholder="Course Credit" form={form} />
        <MultiSelectionForm
          name="studentDegree"
          lable={'Student Degree'}
          placeholder={'Please select student degree'}
          // form={form} // no more error
          options={[
            {
              value: 'bachelor1',
              text: 'Bachelor year 1',
            },
            {
              value: 'bachelor2',
              text: 'Bachelor year 2',
            },
            {
              value: 'bachelor3',
              text: 'Bachelor year 3',
            },
            {
              value: 'bachelor4',
              text: 'Bachelor year 4',
            },
            {
              value: 'master1',
              text: 'Master year 1',
            },
            {
              value: 'master2',
              text: 'Master year 2',
            },
            {
              value: 'doctor1',
              text: 'Doctor year 1',
            },
            {
              value: 'doctor2',
              text: 'Doctor year 2',
            },
          ]}
        />
        <InputForm name="studentAmount" lable="Student Amount" placeholder="Student Amount" form={form} />

        <InputForm name="user" lable="User" placeholder="User" form={form} />
        <Button
          type="button"
          className={cn('w-full')}
          onClick={() => {
            append(initialLinkedSection);
          }}
        >
          เพิ่ม PLO PO
        </Button>
        <div className="">
          <div className="flex flex-col items-center space-y-5">
            {fields.map((item, index) => {
              return (
                <div key={item.id} className="flex w-full flex-col border-2 p-5">
                  <div className="mb-7 flex w-full items-center justify-between">
                    <div className="self-start rounded-full border-2 p-1 px-3 dark:border-white">{index + 1}</div>
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
