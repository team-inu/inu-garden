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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';

type CourseStreamProps = {
  index: number;
  remove: UseFieldArrayRemove;
  fieldLength: number;
  fieldCourseName: string;
  fieldCourseComment: string;
};

const CourseStream: React.FC<CourseStreamProps> = ({
  index,
  remove,
  fieldLength,
  fieldCourseName,
  fieldCourseComment,
}) => {
  const disableRemove = fieldLength === 1;
  return (
    <div className="relative h-auto w-96 space-y-2 border p-5 pb-7">
      <XIcon
        className={cn('absolute right-1 top-2 h-5 w-5 cursor-pointer ', {
          hidden: disableRemove,
        })}
        onClick={() => remove(index)}
      />
      <FormField
        name={fieldCourseName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'CPE100 Basic programming computer'}>
                    CPE100 Basic programming computer
                  </SelectItem>
                  <SelectItem value={'CPE200 Data Structure and Algorithm'}>
                    CPE200 Data Structure and Algorithm
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={fieldCourseComment}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comments</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseStream;
