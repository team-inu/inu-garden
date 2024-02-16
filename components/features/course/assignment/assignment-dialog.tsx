import { DialogClose } from '@radix-ui/react-dialog';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStrictForm } from '@/hooks/form-hook';
import { cn } from '@/libs/utils';
import {
  CreateAssignmentDefaultValues,
  CreateAssignmentSchema,
  CreateAssignmentType,
} from '@/types/schema/assignment-schema';

type StudentDialogProps = {
  onSubmit: (values: CreateAssignmentType) => void;
  defaultValues?: CreateAssignmentType;
  isEdit?: boolean;
};

const AssignmentDialog: React.FC<StudentDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateAssignmentSchema,
    defaultValues ?? CreateAssignmentDefaultValues,
  );

  const cloOptions = [
    { label: 'CLO1', value: 'CLO1' },
    { label: 'CLO2', value: 'CLO2' },
    { label: 'CLO3', value: 'CLO3' },
  ];

  const ploOptions = [
    { label: 'PLO1', value: 'PLO1' },
    { label: 'PLO2', value: 'PLO2' },
  ];

  const poOptions = [
    { label: 'PO1', value: 'PO1' },
    { label: 'PO2', value: 'PO2' },
    { label: 'PO3', value: 'PO3' },
    { label: 'PO4', value: 'PO4' },
    { label: 'PO5', value: 'PO5' },
    { label: 'PO6', value: 'PO6' },
    { label: 'PO7', value: 'PO7' },
    { label: 'PO8', value: 'PO8' },
    { label: 'PO9', value: 'PO9' },
    { label: 'PO10', value: 'PO10' },
    { label: 'PO11', value: 'PO11' },
    { label: 'PO12', value: 'PO12' },
  ];
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Assignment' : 'Add Assignment'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the assignment information'
              : 'Fill in the assignment information'}
          </DialogDescription>
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
                name="weigth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weigth</FormLabel>
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
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Percentage</FormLabel>
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
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
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
                      defaultOptions={cloOptions}
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
              name="plo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program learning outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={ploOptions}
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
              name="po"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program outcome</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={poOptions}
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default AssignmentDialog;
