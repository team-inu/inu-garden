import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateCourseStream,
  CreateCourseStreamDefaultValue,
} from '@/types/schema/course-stream-schema';

const CommentForm = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const form = useStrictForm(
    CreateCourseStream,
    CreateCourseStreamDefaultValue,
  );

  const onSubmit = (values: CreateCourseStream) => {
    console.log(values);
  };
  return (
    <div className="space-y-5 p-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border px-8 py-12 shadow-md"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name={'streamType'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Stream options</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'UPSTREAM'}>Upstream</SelectItem>
                        <SelectItem value={'DOWNSTREAM'}>Downstream</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'targetCourseId'}
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
                        <SelectItem
                          value={'CPE200 Data Structure and Algorithm'}
                        >
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
              control={form.control}
              name={'comment'}
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

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
