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
  CreateStudentDefaultValues,
  CreateStudentPayload,
  CreateStudentSchema,
} from '@/types/schema/student-schema';

type StudentDialogProps = {
  onSubmit: (values: CreateStudentPayload) => void;
  defaultValues?: CreateStudentPayload;
  isEdit?: boolean;
};

const StudentDialog: React.FC<StudentDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateStudentSchema,
    defaultValues ?? CreateStudentDefaultValues,
  );
  return (
    <div>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the student information'
              : 'Fill in the student information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(form.getValues()).map((key) => {
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    // TODO: eliminate as
                    name={key as keyof CreateStudentPayload}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{key}</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-3">
                            {['gpax', 'gpaMath', 'gpaEng', 'gpaSci'].includes(
                              key,
                            ) ? (
                              <Input type="number" step="0.01" {...field} />
                            ) : (
                              <Input {...field} />
                            )}
                            <FormMessage />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                );
              })}
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

export default StudentDialog;
