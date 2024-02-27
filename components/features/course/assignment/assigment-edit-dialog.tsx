import { DialogClose } from '@radix-ui/react-dialog';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/muti-select';
import { useGetCloByCourseId } from '@/hooks/clo-hook';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateAssignmentForm,
  CreateAssignmentFormDefaultValues,
  CreateAssignmentFormSchema,
} from '@/types/schema/assignment-schema';

type StudentDialogProps = {
  onSubmit: (values: CreateAssignmentForm) => void;
  defaultValues?: CreateAssignmentForm;
};

const AssignmentEditDialog: React.FC<StudentDialogProps> = ({
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
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>Edit the assignment information</DialogDescription>
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
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weigth</FormLabel>
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
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} type="number" min={0} max={100} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default AssignmentEditDialog;
