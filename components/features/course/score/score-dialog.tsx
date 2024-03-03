import { DialogClose } from '@radix-ui/react-dialog';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetEnrollmentsByCourseId } from '@/hooks/enrollment-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { cn } from '@/libs/utils';
import {
  CreateScoreForm,
  CreateScoreFormDefaultValues,
  CreateScoreFormSchema,
} from '@/types/schema/score-schema';

type ScoreDialogProps = {
  onSubmit: (values: CreateScoreForm) => void;
  defaultValues?: CreateScoreForm;
  isEdit?: boolean;
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: enrollments, isLoading } =
    useGetEnrollmentsByCourseId(courseId);
  const form = useStrictForm(
    CreateScoreFormSchema,
    defaultValues ?? CreateScoreFormDefaultValues,
  );

  if (isLoading) return null;

  const enrollmentsOptions = enrollments?.map((enrollment) => ({
    label: enrollment.studentId,
    value: enrollment.studentId,
  }));

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Score' : 'Add Score'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the score information'
              : 'Fill in the score information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Student Id</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value && enrollmentsOptions
                            ? enrollmentsOptions.find(
                                (student) => student.value === field.value,
                              )?.label
                            : 'Select StudentId'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {enrollmentsOptions &&
                            enrollmentsOptions.map((student) => (
                              <CommandItem
                                value={student.label}
                                key={student.value}
                                onSelect={() => {
                                  form.setValue('studentId', student.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    student.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {student.label}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scores</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} type="number" min={0} max={100} />
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

export default ScoreDialog;
