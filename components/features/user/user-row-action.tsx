'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';

// TODO: make it dynamic
import ChangePasswordDialog from '@/components/features/user/change-password-dialog';
import UserEditDialog from '@/components/features/user/user-edit-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteUser, useUpdateUser } from '@/hooks/user-hook';
import { EditUserForm, UserColumnSchema } from '@/types/schema/user-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function UserRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = UserColumnSchema.omit({
    collapsibleContent: true,
  }).parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

  const { mutate: updateUser, isError: isUpdateError } = useUpdateUser();
  const { mutate: deleteUser, isError: isDeleteError } = useDeleteUser();

  const onSubmit = (values: EditUserForm) => {
    updateUser(values);
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
    }
  };

  const onDelete = () => {
    deleteUser(user.id);
    if (!isDeleteError) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen || isChangePasswordDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsEditDialogOpen(false);
          setIsDeleteDialogOpen(false);
          setIsChangePasswordDialogOpen(false);
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsChangePasswordDialogOpen(true)}>Change password</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isChangePasswordDialogOpen && <ChangePasswordDialog onSubmit={() => {}} />}
      {isEditDialogOpen && (
        <UserEditDialog
          onSubmit={onSubmit}
          defaultValues={{
            id: user.id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>{`You can't undo this action. This will permanently delete the.`}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
