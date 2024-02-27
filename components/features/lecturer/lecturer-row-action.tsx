'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';

// TODO: make it dynamic
import ChangePasswordDialog from '@/components/features/lecturer/change-password-dialog';
import LecturerEditDialog from '@/components/features/lecturer/lecturer-edit-dialog';
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
import {
  EditLecturerType,
  LecturerColumnSchema,
} from '@/types/schema/lecturer-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function LecturerRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const lecturer = LecturerColumnSchema.omit({
    collapsibleContent: true,
  }).parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const onSubmit = (values: EditLecturerType) => {
    console.log(values);
  };

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <Dialog
      open={
        isEditDialogOpen || isDeleteDialogOpen || isChangePasswordDialogOpen
      }
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
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsChangePasswordDialogOpen(true)}>
            Change password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isChangePasswordDialogOpen && (
        <ChangePasswordDialog onSubmit={() => {}} />
      )}
      {isEditDialogOpen && (
        <LecturerEditDialog
          onSubmit={onSubmit}
          defaultValues={{
            firstName: lecturer.firstName,
            lastName: lecturer.lastName,
            email: lecturer.email,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              {`You can't undo this action. This will permanently delete the.`}
            </DialogDescription>
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
