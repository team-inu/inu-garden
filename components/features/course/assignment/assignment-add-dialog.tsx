import { DialogClose } from '@radix-ui/react-dialog';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import MultipleSelector from '@/components/ui/muti-select';
import { Textarea } from '@/components/ui/textarea';
import { useGetCloByCourseId } from '@/hooks/clo-hook';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateAssignmentForm,
  CreateAssignmentFormDefaultValues,
  CreateAssignmentFormSchema,
} from '@/types/schema/assignment-schema';

type StudentAddDialogProps = {
  onSubmit: (values: CreateAssignmentForm) => void;
  defaultValues?: CreateAssignmentForm;
};

const AssignmentAddDialog: React.FC<StudentAddDialogProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { id: courseId } = useParams();
  const form = useStrictForm(
    CreateAssignmentFormSchema,
    defaultValues ?? CreateAssignmentFormDefaultValues,
  );
  const { data: cloList } = useGetCloByCourseId(courseId as string);

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>
            Fill in the assignment information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
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
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} type="number" min={0} max={100} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max score</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} type="number" min={0} max={100} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="clo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course learning outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={cloList?.map((item) => ({
                        label: item.description,
                        value: item.id,
                      }))}
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedPassingStudentPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected passing student percentage</FormLabel>
                  <FormDescription>
                    % of how many students need to pass this assignment for it
                    to succeed
                  </FormDescription>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} type="number" min={0} max={100} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedScorePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected score percentage</FormLabel>
                  <FormDescription>
                    % of score of max score a student needed to pass this
                    assignment
                  </FormDescription>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} type="number" min={0} max={100} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isIncludedInClo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Included In CLO?</FormLabel>
                    <FormDescription>
                      is this assignment included when checking if the CLOs pass
                      or not
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default AssignmentAddDialog;
