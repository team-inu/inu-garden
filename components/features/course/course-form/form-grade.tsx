import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CourseFormGrade = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <FormField
        name="criteriaGradeA"
        render={({ field }) => (
          <FormItem>
            <FormLabel>A</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeBP"
        render={({ field }) => (
          <FormItem>
            <FormLabel>B+</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeB"
        render={({ field }) => (
          <FormItem>
            <FormLabel>B</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeCP"
        render={({ field }) => (
          <FormItem>
            <FormLabel>C+</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeC"
        render={({ field }) => (
          <FormItem>
            <FormLabel>C</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeDP"
        render={({ field }) => (
          <FormItem>
            <FormLabel>D+</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeD"
        render={({ field }) => (
          <FormItem>
            <FormLabel>D</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="criteriaGradeF"
        render={({ field }) => (
          <FormItem>
            <FormLabel>F</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" max="100" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseFormGrade;
