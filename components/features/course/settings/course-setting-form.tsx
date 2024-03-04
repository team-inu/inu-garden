'use client';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateCourse } from '@/hooks/course-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import {
  UpdateCourseFormValues,
  UpdateCourseSchema,
} from '@/types/schema/course-schema';

type CourseSettingFormProps = {
  defaultValues: UpdateCourseFormValues;
};

const CourseSettingForm: React.FC<CourseSettingFormProps> = ({
  defaultValues,
}) => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: programmeData } = useGetProgrammeList();
  const { mutate } = useUpdateCourse();
  const form = useStrictForm(UpdateCourseSchema, defaultValues);

  function onSubmit(data: UpdateCourseFormValues) {
    mutate({ course: data, courseId });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {[
          {
            name: 'code',
            label: 'Code',
            placeholder: '',
            description: '',
          },
          {
            name: 'name',
            label: 'Name',
            placeholder: '',
            description: '',
          },
        ].map((e, i) => {
          return (
            <FormField
              key={i}
              control={form.control}
              name={e.name as 'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{e.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={e.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{e.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <FormField
          name="curriculum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programme</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a programme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programmeData?.map((programme, index) => (
                      <SelectItem key={index} value={programme.name}>
                        {programme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-4 gap-5">
          {[
            {
              name: 'criteriaGradeA',
              label: 'A',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeBP',
              label: 'B+',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeB',
              label: 'B',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeCP',
              label: 'C+',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeC',
              label: 'C',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeDP',
              label: 'D+',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeD',
              label: 'D',
              placeholder: '',
              description: '',
            },
            {
              name: 'criteriaGradeF',
              label: 'F',
              placeholder: '',
              description: '',
            },
          ].map((e, i) => {
            return (
              <FormField
                key={i}
                control={form.control}
                name={e.name as 'name'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{e.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={e.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{e.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="w-full" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

export default CourseSettingForm;
