import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CourseFormGrade = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <FormField
        name="grade.a"
        render={({ field }) => (
          <FormItem>
            <FormLabel>A</FormLabel>
            <FormControl>
              <Input className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="grade.b"
        render={({ field }) => (
          <FormItem>
            <FormLabel>B</FormLabel>
            <FormControl>
              <Input className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="grade.c"
        render={({ field }) => (
          <FormItem>
            <FormLabel>C</FormLabel>
            <FormControl>
              <Input className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="grade.d"
        render={({ field }) => (
          <FormItem>
            <FormLabel>D</FormLabel>
            <FormControl>
              <Input className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="grade.f"
        render={({ field }) => (
          <FormItem>
            <FormLabel>F</FormLabel>
            <FormControl>
              <Input className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseFormGrade;
