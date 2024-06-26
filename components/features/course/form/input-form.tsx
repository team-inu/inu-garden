import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type InputFormProps = {
  name: string;
  lable: string;
  placeholder: string;
  form: UseFormReturn<any>;
  description?: string;
};

const InputForm: React.FC<InputFormProps> = ({ name, lable, placeholder, form, description }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{lable}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {/* Absolute for this task */}
          <FormMessage className="absolute" />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
