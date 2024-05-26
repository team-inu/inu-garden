import { DialogClose } from '@radix-ui/react-dialog';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateAssignmentGroupForm,
  CreateAssignmentGroupFormDefaultValues,
  CreateAssignmentGroupFormSchema,
} from '@/types/schema/assignment-group-schema';

type AssignmentGroupAddDialogProps = {
  onSubmit: (values: CreateAssignmentGroupForm) => void;
  defaultValues?: CreateAssignmentGroupForm;
};

const AssignmentGroupAddDialog: React.FC<AssignmentGroupAddDialogProps> = ({ onSubmit, defaultValues }) => {
  const { id: courseId } = useParams<{ id: string }>();
  const form = useStrictForm(CreateAssignmentGroupFormSchema, defaultValues ?? CreateAssignmentGroupFormDefaultValues);

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Assessment Group</DialogTitle>
          <DialogDescription>Fill in the Assessment group information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Id</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} disabled />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
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
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} />
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
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default AssignmentGroupAddDialog;
