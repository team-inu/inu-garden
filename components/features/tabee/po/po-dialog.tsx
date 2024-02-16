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
import { CreatePoDefaultValues, CreatePoSchema, CreatePoType } from '@/types/schema/po-schema';
import { DialogClose } from "@radix-ui/react-dialog";

type PoDialogProps = {
  onSubmit: (values: CreatePoType) => void;
  defaultValues?: CreatePoType;
  isEdit?: boolean;
};

const PoDialog: React.FC<PoDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreatePoSchema,
    defaultValues ?? CreatePoDefaultValues
  );
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Po" : "Add Po"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the po information"
              : "Fill in the po information"}
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
                  name={key as keyof CreatePoType}
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

export default PoDialog;
