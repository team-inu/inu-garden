'use client';

import { useFormContext } from 'react-hook-form';

import CourseFormGrade from '@/components/features/course/course-form/form-grade';
import {
  FormControl,
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
import { CreateCourseSchemaValues } from '@/types/schema/course-schema';

const CourseForm = () => {
  const form = useFormContext<CreateCourseSchemaValues>();

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
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
                <Input {...field} type="text" />
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
                  <SelectItem value={'a'}>นายเอ ไม่รู้ลืม</SelectItem>
                  <SelectItem value={'b'}>นายบี สีข้าวสาร</SelectItem>
                  <SelectItem value={'c'}>นายซี สี่ไม่ยั้ง</SelectItem>
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
                  <SelectItem value={'1'}>1</SelectItem>
                  <SelectItem value={'2'}>2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academicYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduateYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduate Year</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="curriculum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curriculum</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
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
    </div>
  );
};

export default CourseForm;
