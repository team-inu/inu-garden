import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStrictForm } from "@/hooks/form-hook";
import { CreatePloDefaultValues, CreatePloSchema, CreatePloType } from '@/types/schema/plo-schema';
import { DialogClose } from "@radix-ui/react-dialog";

type PloDialogProps = {
  onSubmit: (values: CreatePloType) => void;
  defaultValues?: CreatePloType;
  isEdit?: boolean;
};

const PloDialog: React.FC<PloDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreatePloSchema,
    defaultValues ?? CreatePloDefaultValues
  );
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Plo" : "Add Plo"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the plo information"
              : "Fill in the plo information"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {Object.keys(form.getValues()).map((key) => {
              return (
                <FormField
                  key={key}
                  control={form.control}
                  // TODO: eliminate as
                  name={key as keyof CreatePloType}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key}</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-3">
                          <Input {...field} />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            })}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type='submit' onClick={form.handleSubmit(onSubmit)} >Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default PloDialog;
