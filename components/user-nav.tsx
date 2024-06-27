import { toast } from 'sonner';

import ChangePasswordDialog from '@/components/features/user/change-password-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/auth-hook';
import { useUpdatePassword } from '@/hooks/user-hook';

export function UserNav() {
  const { signOut, user } = useAuth();
  const { mutate } = useUpdatePassword();
  const handleChangePassword = (values: { oldPassword: string; newPassword: string; confirmNewPassword: string }) => {
    const userId = user.data?.id;
    if (!userId) {
      return toast.error('user id not found');
    }

    mutate({
      userId: userId,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
              <AvatarFallback>
                {user.data &&
                  user.data?.firstName.charAt(0).toUpperCase() + user.data?.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.data?.firstName} {user.data?.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{user.data?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <DialogTrigger>เปลี่ยนรหัสผ่าน</DialogTrigger>
          </DropdownMenuItem>

          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={signOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChangePasswordDialog onSubmit={handleChangePassword} />
    </Dialog>
  );
}
