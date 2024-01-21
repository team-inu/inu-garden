import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

type ArrayInputProps = {
  index: number;
  remove: UseFieldArrayRemove;
  fieldLength: number;
  fieldName: string;
};

const ArrayInput: React.FC<ArrayInputProps> = ({
  index,
  remove,
  fieldLength,
  fieldName,
}) => {
  const form = useFormContext();
  return (
    <div className="">
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input {...field} />
                {fieldLength > 1 && (
                  <TrashIcon
                    className="w-5 h-5 absolute right-3 top-3 cursor-pointer hover:text-destructive"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ArrayInput;
