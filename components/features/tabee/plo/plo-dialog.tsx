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
  CreatePloDefaultValues,
  CreatePloSchema,
  CreatePloType,
} from '@/types/schema/plo-schema';

type PloDialogProps = {
  onSubmit: (values: CreatePloType) => void;
  defaultValues?: CreatePloType;
  isEdit?: boolean;
};

const PloDialog: React.FC<PloDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreatePloSchema,
    defaultValues ?? CreatePloDefaultValues,
  );
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Plo' : 'Add Plo'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the plo information'
              : 'Fill in the plo information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
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
              name="descriptionThai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Thai</FormLabel>
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
              name="descriptionEng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description English</FormLabel>
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
              name="programYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Year</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input type="number" {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="programmeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programme</FormLabel>
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default PloDialog;
