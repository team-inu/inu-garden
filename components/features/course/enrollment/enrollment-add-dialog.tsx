import { DialogClose } from '@radix-ui/react-dialog';

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
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateEnrollmentDefaultValues,
  CreateEnrollmentSchema,
  CreateEnrollmentType,
} from '@/types/schema/enrollment-schema';

type EnrollmentDialogProps = {
  onSubmit: (values: CreateEnrollmentType) => void;
  defaultValues?: CreateEnrollmentType;
  isEdit?: boolean;
};

const EnrollmentAddDialog: React.FC<EnrollmentDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateEnrollmentSchema,
    defaultValues ?? CreateEnrollmentDefaultValues,
  );

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Enrollment' : 'Add Enrollment'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the enrollment information'
              : 'Fill in the enrollment information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>StudentId</FormLabel>
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
            <Button onClick={() => form.reset()} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default EnrollmentAddDialog;
