import { UseFormReturn } from 'react-hook-form';

import { buttonVariants } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/libs/utils';

type SelectionFormProps = {
  name: string;
  lable: string;
  options: {
    value: string;
    text: string;
  }[];
  placeholder: string;
  form: UseFormReturn<any>;
};

const SelectForm: React.FC<SelectionFormProps> = ({ name, lable, form, options, placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="min-w-[160px]">
          <FormLabel>{lable}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value === '' ? undefined : field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, key) => (
                <SelectItem key={key} value={option.value} className={cn(buttonVariants, 'w-full')}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectForm;
