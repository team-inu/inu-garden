'use client';

import { XIcon } from 'lucide-react';
import { UseFieldArrayRemove } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';

type CourseFormLinkProps = {
  index: number;
  remove: UseFieldArrayRemove;
  courseFormLinkLength: number;
};

const CourseFormLink: React.FC<CourseFormLinkProps> = ({ index, remove, courseFormLinkLength }) => {
  const disableRemove = courseFormLinkLength === 1;
  return (
    <div className="relative  space-y-2 border p-5 pb-7">
      <XIcon
        className={cn('absolute right-1 top-2 h-5 w-5 cursor-pointer ', {
          hidden: disableRemove,
        })}
        onClick={() => remove(index)}
      />
      <div className="flex justify-between ">
        <FormField
          name={`clo[${index}].code`}
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
          name={`clo[${index}].weight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" max="100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={`clo[${index}].description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`clo[${index}].expectedPassingAssignmentPercentage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected passing assigment percentage</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`clo[${index}].expectedScorePercentage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected score percentage</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`clo[${index}].expectedPassingStudentPercentage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected passing student percentage</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`clo[${index}].subProgramLearningOutcomeId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link sub PLO</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`clo[${index}].programLearningOutcomeId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link PLO</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseFormLink;
