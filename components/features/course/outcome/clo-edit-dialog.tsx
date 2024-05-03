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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetPoList } from '@/hooks/po-hook';
import {
  EditCloForm,
  EditCloFormDefaultValues,
  EditCloFormSchema,
} from '@/types/schema/clo-shema';

type PloDialogProps = {
  onSubmit: (values: EditCloForm) => void;
  defaultValues?: EditCloForm;
};

const CloEditDialog: React.FC<PloDialogProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { data: polist } = useGetPoList();

  const form = useStrictForm(
    EditCloFormSchema,
    defaultValues ?? EditCloFormDefaultValues,
  );

  return (
    <div>
      <DialogContent className="min-w-[75%]">
        <DialogHeader>
          <DialogTitle>Edit Course learning outcome</DialogTitle>
          <DialogDescription>
            Edit the course learning outcome by filling the form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="from curriculum">
                          From curriculum
                        </SelectItem>
                        <SelectItem value="modified">Modified</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
                name="expectedPassingStudentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Student %</FormLabel>
                    <FormDescription>
                      % of how many students need to pass this CLO for it to
                      succeed
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
                name="expectedPassingAssignmentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Assignment %</FormLabel>
                    <FormDescription>
                      % of how many assignments a student need to pass to pass
                      this CLO
                    </FormDescription>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="programOutcomeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Program Outcome</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Program  outcome" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {polist &&
                        polist.map((po) => (
                          <SelectItem key={po.id} value={po.id}>
                            {po.code}-{po.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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

export default CloEditDialog;
