'use client';

import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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

import { ProgramLearningOutcomeDataTable } from '../../tabee/plo/plo-table';
import { SubProgramLearningOutcomeDataTable } from '../../tabee/sub-plo/sub-plo-table';
import { mockPLO, mockSubPLO } from '../../tabee/tabee';
import CourseFormGrade from './form-grade';
import CourseFormLink from './form-link';
import { ploColumns } from './plo-showcase';
import { subPloColumns } from './subplo-showcase';

const CourseForm = () => {
  const [selectedRows, setSelectedRows] = useState<string>('');
  const getVales = (id: string) => {
    setSelectedRows(id);
  };

  const form = useFormContext<CreateCourseSchemaValues>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'courseLearningOutcome',
  });

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

      <div className="pt-5">Course Learning Outcome</div>
      <div className="grid grid-cols-3 items-center  gap-y-8">
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
          variant={'ghost'}
          type="button"
          className="h-96 w-80 border-2 border-dashed"
          onClick={() => {
            append({
              code: '',
              weight: '',
              description: '',
              subProgramLearningOutcome: '',
              programOutcome: '',
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
    </div>
  );
};

export default CourseForm;
