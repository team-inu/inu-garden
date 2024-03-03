'use client';

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
import { useStrictForm } from '@/hooks/form-hook';
import {
  UpdateCourseDefaultValues,
  UpdateCourseFormValues,
  UpdateCourseSchema,
} from '@/types/schema/course-schema';

export function CourseSettingForm() {
  //TODO: get default values from server
  const form = useStrictForm(UpdateCourseSchema, UpdateCourseDefaultValues);

  function onSubmit(data: UpdateCourseFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'1'}>Computer Engineer</SelectItem>
                    <SelectItem value={'2'}>Chemistry Engineer </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="programme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programme</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'1'}>Computer Engineer</SelectItem>
                    <SelectItem value={'2'}>PLO2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={'education'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ระดับการศึกษา</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'bachelor'}>ปริญญาตรี</SelectItem>
                    <SelectItem value={'master'}>ปริญญาโท</SelectItem>
                    <SelectItem value={'doctorate'}>ปริญญาเอก</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {[
          {
            name: 'code',
            label: 'รหัสวิชา',
            placeholder: '',
            description: '',
          },
          {
            name: 'name',
            label: 'ชื่อวิชา',
            placeholder: '',
            description: '',
          },
          {
            name: 'credit',
            label: 'จำนวนหน่วยกิต',
            placeholder: '',
            description: '',
          },
          {
            name: 'user',
            label: 'ชื่ออาจารยฺ์ผู้สอน',
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

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
