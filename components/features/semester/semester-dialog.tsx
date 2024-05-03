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
  CreateSemesterForm,
  CreateSemesterFormDefaultValues,
  CreateSemesterFormSchema,
} from '@/types/schema/semsester-schema';

type SemesterDialogProps = {
  onSubmit: (values: CreateSemesterForm) => void;
  defaultValues?: CreateSemesterForm;
  isEdit?: boolean;
};

const SemesterDialog: React.FC<SemesterDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateSemesterFormSchema,
    defaultValues ?? CreateSemesterFormDefaultValues,
  );
  return (
    <div>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Semester' : 'Add Semester'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the semester information'
              : 'Fill in the form to add a new semester'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
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
                name="semesterSequence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} type="number" min={1} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default SemesterDialog;
