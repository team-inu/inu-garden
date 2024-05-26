import { XIcon } from 'lucide-react';
import { UseFieldArrayRemove } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
              <Input {...field} />
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
