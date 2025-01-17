'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import CourseFormGrade from '@/components/features/course/course-form/form-grade';
import Loading from '@/components/features/loading-screen';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import { useGetSemesterList } from '@/hooks/semester-hook';
import { useGetUserList } from '@/hooks/user-hook';
import { cn } from '@/libs/utils';
import { CreateCourseSchemaValues } from '@/types/schema/course-schema';

const CourseForm = () => {
  const form = useFormContext<CreateCourseSchemaValues>();
  const { data: users, isLoading: isUsersLoading } = useGetUserList();
  const { data: semesters, isLoading: isSemesterLoading } = useGetSemesterList();
  const { data: programmes, isLoading: isProgrammeLoading } = useGetProgrammeList();

  if (isUsersLoading || isSemesterLoading || isProgrammeLoading) {
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
          name="userId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>User</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users
                    ?.sort((a, b) => a.firstName.localeCompare(b.firstName))
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
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
            <FormItem className="flex w-full flex-col space-y-4">
              <FormLabel>Semester</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value && semesters
                        ? semesters.find((semester) => semester.id === field.value)?.semesterSequence +
                          '/' +
                          semesters.find((semester) => semester.id === field.value)?.year
                        : 'Select Semester'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search semester..." />
                    <CommandEmpty>No Semester found.</CommandEmpty>
                    <CommandGroup className="max-h-96 overflow-y-auto">
                      {semesters &&
                        semesters
                          .sort((a, b) => {
                            return a.year == b.year
                              ? a.semesterSequence.charCodeAt(0) - b.semesterSequence.charCodeAt(0)
                              : b.year - a.year;
                          })
                          .map((semester) => (
                            <CommandItem
                              key={semester.id}
                              value={semester.semesterSequence + '/' + semester.year.toString()}
                              onSelect={() => {
                                form.setValue('semesterId', semester.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  semester.id === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {semester.semesterSequence}/{semester.year}
                            </CommandItem>
                          ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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
          name="programYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Year</FormLabel>
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

      <FormField
        control={form.control}
        name="expectedPassingCloPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Passing CLO Percentage</FormLabel>
            <FormDescription>% of how many CLOs a student need to pass to pass each PLO and PO</FormDescription>
            <FormControl>
              <Input {...field} type="number" />
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
