import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStrictForm } from '@/hooks/form-hook';
import { useCreateGrade } from '@/hooks/grade-hook';
import { useGetSemesterList } from '@/hooks/semester-hook';
import { CreateGradeSchema, CreateGradeType } from '@/types/schema/grade-schema';

type StudentGradeFormProps = {
  studentId: string;
};

const StudentGradeForm: React.FC<StudentGradeFormProps> = ({ studentId }) => {
  const form = useStrictForm(CreateGradeSchema, {
    studentId,
  });

  const { mutate, isSuccess } = useCreateGrade();
  const { data: semesters } = useGetSemesterList();

  const onSubmit = (data: CreateGradeType) => {
    const semesterSequence = data.semesterSequence.split('.')[0];
    const year = parseInt(data.semesterSequence.split('.')[1]);
    mutate({
      semesterSequence: semesterSequence,
      year: year,
      studentGrade: [
        {
          studentId: studentId,
          grade: data.grade,
        },
      ],
    });

    if (isSuccess) form.reset();
  };
  return (
    <DialogContent className="min-w-max">
      <DialogHeader>
        <DialogTitle>Add Grade</DialogTitle>
        <DialogDescription>Fill in the student information</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Id</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-3">
                    <Input {...field} disabled />
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
              <FormItem className="w-full">
                <FormLabel>Semester</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {semesters?.map((semester) => (
                      <SelectItem key={semester.id} value={semester.semesterSequence + '.' + semester.year}>
                        {semester.semesterSequence}/{semester.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
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
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default StudentGradeForm;
