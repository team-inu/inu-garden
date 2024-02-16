'use client';

import { Select } from '@radix-ui/react-select';
import { XIcon } from 'lucide-react';
import { UseFieldArrayRemove } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';

type CourseFormLinkProps = {
  index: number;
  remove: UseFieldArrayRemove;
  courseFormLinkLength: number;
};

const CourseFormLink: React.FC<CourseFormLinkProps> = ({
  index,
  remove,
  courseFormLinkLength,
}) => {
  const disableRemove = courseFormLinkLength === 1;
  return (
    <div className="relative min-h-fit w-96 space-y-2 border p-5 pb-7">
      <XIcon
        className={cn('absolute right-1 top-2 h-5 w-5 cursor-pointer ', {
          hidden: disableRemove,
        })}
        onClick={() => remove(index)}
      />
      <div className="flex justify-between ">
        <FormField
          name={`courseLearningOutcome[${index}].code`}
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
          name={`courseLearningOutcome[${index}].weight`}
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
        name={`courseLearningOutcome[${index}].description`}
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
        name={`courseLearningOutcome[${index}].subProgramLearningOutcome`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link sub PLO</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'1'}>PLO1</SelectItem>
                  <SelectItem value={'2'}>PLO2</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`courseLearningOutcome[${index}].programOutcome`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link PLO</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'1A'}>1A</SelectItem>
                  <SelectItem value={'1B'}>1B</SelectItem>
                  <SelectItem value={'1C'}>1C</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseFormLink;
