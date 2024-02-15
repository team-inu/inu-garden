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
import { CreateSubPloDefaultValues, CreateSubPloSchema, CreateSubPloType } from '@/types/schema/sub-plo-schema';
import { DialogClose } from "@radix-ui/react-dialog";

type SubPloDialogProps = {
  onSubmit: (values: CreateSubPloType) => void;
  defaultValues?: CreateSubPloType;
  isEdit?: boolean;
};

const SubPloDialog: React.FC<SubPloDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateSubPloSchema,
    defaultValues ?? CreateSubPloDefaultValues
  );
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit SubPlo" : "Add SubPlo"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the sub-plo information"
              : "Fill in the sub-plo information"}
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
                  name={key as keyof CreateSubPloType}
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

export default SubPloDialog;
