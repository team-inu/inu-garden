import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import { PoReportFilter, PoReportFilterSchema } from '@/types/schema/po-schema';

type PoDialogProps = {
  onSubmit: (values: PoReportFilter) => void;
};

const PoFilterDialog: React.FC<PoDialogProps> = ({ onSubmit }) => {
  const form = useStrictForm(PoReportFilterSchema);
  const { data: programmes } = useGetProgrammeList();
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{'Filter PO'}</DialogTitle>
          <DialogDescription>
            {'Filter out some courses before generating report and set the passing criteria'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="passingCriteria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passing Criteria %</FormLabel>
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
              name="fromYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Year</FormLabel>
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
              name="toYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Year</FormLabel>
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
              name="programme"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Curriculum</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a curriculum" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programmes?.map((programme, index) => (
                        <SelectItem key={index} value={programme.name}>
                          {programme.name}
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
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default PoFilterDialog;
