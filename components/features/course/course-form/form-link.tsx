import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";

type CourseFormLinkProps = {
  index: number;
  remove: UseFieldArrayRemove;
};

const CourseFormLink: React.FC<CourseFormLinkProps> = ({ index, remove }) => {
  return (
    <div className="w-80 p-5 border relative">
      <XIcon
        className="w-5 h-5 top-2 right-1 cursor-pointer absolute "
        onClick={() => remove(index)}
      />
      <div className="flex space-x-2 ">
        <FormField
          name={`courseLearningOutcome[${index}].code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input className="h-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`courseLearningOutcome[${index}].weight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input className="h-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={`courseLearningOutcome[${index}].description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea className="h-9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`courseLearningOutcome[${index}].subProgramLearningOutcome`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link sub PLO</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"1"}>PLO1</SelectItem>
                  <SelectItem value={"2"}>PLO2</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`courseLearningOutcome[${index}].programOutcome`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link sub PLO</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"1"}>PO1</SelectItem>
                  <SelectItem value={"2"}>PO2</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseFormLink;
