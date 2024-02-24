import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CourseFormGrade = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <FormField
        name="criteriaGrade.criteriaGradeA"
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
        name="criteriaGrade.criteriaGradeBP"
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
        name="criteriaGrade.criteriaGradeB"
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
        name="criteriaGrade.criteriaGradeCP"
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
        name="criteriaGrade.criteriaGradeC"
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
        name="criteriaGrade.criteriaGradeDP"
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
        name="criteriaGrade.criteriaGradeD"
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
        name="criteriaGrade.criteriaGradeF"
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
