'use client';

import { useFormContext } from 'react-hook-form';

import CourseFormGrade from '@/components/features/course/course-form/form-grade';
import Loading from '@/components/features/loading-screen';
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
import { useGetLecturerList } from '@/hooks/lecturer-hook';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import { useGetSemesterList } from '@/hooks/semester-hook';
import { CreateCourseSchemaValues } from '@/types/schema/course-schema';

const CourseForm = () => {
  const form = useFormContext<CreateCourseSchemaValues>();
  const { data: lecturers, isLoading: isLectuerLoading } = useGetLecturerList();
  const { data: semesters, isLoading: isSemesterLoading } =
    useGetSemesterList();
  const { data: programmes, isLoading: isProgrammeLoading } =
    useGetProgrammeList();

  if (isLectuerLoading || isSemesterLoading || isProgrammeLoading) {
    return <Loading />;
  }

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
          name="lecturerId"
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
                  {lecturers?.map((lecturer) => (
                    <SelectItem key={lecturer.id} value={lecturer.id}>
                      {lecturer.firstName} {lecturer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semesterId"
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
                  {semesters?.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.semesterSequence}/{semester.year}
                    </SelectItem>
                  ))}
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
            <FormItem className="w-full">
              <FormLabel>Curriculum</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a curriculum" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programmes?.map((programme, index) => (
                    <SelectItem key={index} value={programme.name}>
                      {programme.name}
                    </SelectItem>
                  ))}
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
    </div>
  );
};

export default CourseForm;
