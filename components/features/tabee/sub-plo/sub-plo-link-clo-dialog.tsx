import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import MultipleSelector from '@/components/ui/muti-select';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetSubPloList } from '@/hooks/sub-plo-hook';
import {
  CreateSubPloLinkCloDefaultValues,
  CreateSubPloLinkCloSchema,
  CreateSubPloLinkCloType,
} from '@/types/schema/sub-plo-schema';

type SubPloDialogProps = {
  onSubmit: (values: CreateSubPloLinkCloType) => void;
  defaultValues?: CreateSubPloLinkCloType;
  subPloId?: string[];
};

const SubPloLinkCloDialog: React.FC<SubPloDialogProps> = ({ onSubmit, defaultValues, subPloId }) => {
  const form = useStrictForm(CreateSubPloLinkCloSchema, defaultValues ?? CreateSubPloLinkCloDefaultValues);
  const { data: subPlos } = useGetSubPloList();

  return (
    <div>
      <DialogContent className="min-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add Sub Program Learning Outcome</DialogTitle>
          <DialogDescription>Select the sub program learning outcome</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="subPlos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Program Learning Outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      options={subPlos
                        ?.filter((subPlo) => !subPloId?.includes(subPlo.id))
                        .map((plo) => ({
                          value: plo.id,
                          label: plo.code + ' - ' + plo.descriptionThai,
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

export default SubPloLinkCloDialog;
