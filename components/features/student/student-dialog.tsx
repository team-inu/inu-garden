import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetDepartments } from '@/hooks/department-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { useGetProgrammeList } from '@/hooks/programme-hook';
import {
  CreateStudentForm,
  CreateStudentFormDefaultValues,
  CreateStudentFormSchema,
} from '@/types/schema/student-schema';

type StudentDialogProps = {
  onSubmit: (values: CreateStudentForm) => void;
  defaultValues?: CreateStudentForm;
  isEdit?: boolean;
};

const StudentDialog: React.FC<StudentDialogProps> = ({ onSubmit, defaultValues, isEdit = false }) => {
  const form = useStrictForm(CreateStudentFormSchema, defaultValues ?? CreateStudentFormDefaultValues);

  const { data: departments } = useGetDepartments();
  const { data: programmes } = useGetProgrammeList();
  return (
    <div>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Edit the student information' : 'Fill in the student information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="kmuttId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Id</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input {...field} disabled={isEdit} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
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
                name="admission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admission</FormLabel>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                name="gpax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPAX</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input type="number" step="0.01" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mathGPA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Math GPA</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input type="number" step="0.01" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="engGPA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English GPA</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input type="number" step="0.01" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sciGPA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Science GPA</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        <Input type="number" step="0.01" {...field} />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
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
                name="programmeName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Programme Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Program  outcome" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programmes &&
                          programmes.map((department, i) => (
                            <SelectItem key={i} value={department.name}>
                              {department.name}
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
                name="departmentName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Department Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Program  outcome" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments &&
                          departments.map((department, i) => (
                            <SelectItem key={i} value={department.name}>
                              {department.name}
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
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
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
