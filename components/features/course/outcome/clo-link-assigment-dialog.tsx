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
} from '@/components/ui/form';
import MultipleSelector from '@/components/ui/muti-select';
import { useGetCloByCourseId } from '@/hooks/clo-hook';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateCloLinkAssignment,
  CreateCloLinkAssignmentDefaultValues,
  CreateCloLinkAssignmentSchema,
} from '@/types/schema/clo-shema';

type CloDialogProps = {
  onSubmit: (values: CreateCloLinkAssignment) => void;
  defaultValues?: CreateCloLinkAssignment;
  cloId?: string[];
};

const CloLinkAssignmentDialog: React.FC<CloDialogProps> = ({
  onSubmit,
  defaultValues,
  cloId,
}) => {
  const { id: courseId } = useParams<{ id: string }>();
  const form = useStrictForm(
    CreateCloLinkAssignmentSchema,
    defaultValues ?? CreateCloLinkAssignmentDefaultValues,
  );
  const { data: closData } = useGetCloByCourseId(courseId);

  return (
    <div>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add Coures learning outcome</DialogTitle>
          <DialogDescription>
            Please select the course learning outcome you want to link with
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="clos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course learning outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      options={closData
                        ?.filter((clo) => !cloId?.includes(clo.id))
                        .map((clo) => ({
                          label: clo.description,
                          value: clo.id,
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
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => form.reset()} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default CloLinkAssignmentDialog;
