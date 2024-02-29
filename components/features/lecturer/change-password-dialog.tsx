import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PassowrdInput } from '@/components/ui/password-input';
import { useStrictForm } from '@/hooks/form-hook';
import {
  ChangePasswordForm,
  ChangePasswordFormDefaultValues,
  ChangePasswordFormSchema,
} from '@/types/schema/lecturer-schema';

type ChangePasswordDialogProps = {
  onSubmit: (values: ChangePasswordForm) => void;
};

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  onSubmit,
}) => {
  const form = useStrictForm(
    ChangePasswordFormSchema,
    ChangePasswordFormDefaultValues,
  );
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Change your password here</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <PassowrdInput {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <PassowrdInput {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmed new password</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <PassowrdInput {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default ChangePasswordDialog;
