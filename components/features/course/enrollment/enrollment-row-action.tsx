'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';

import EnrollmentEditDialog from '@/components/features/course/enrollment/enrollment-edit-dialog';
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
import { useDeleteEnrollment, useUpdateEnrollment } from '@/hooks/enrollment-hook';
import { EditEnrollmentForm, EnrollmentSchema } from '@/types/schema/enrollment-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function EnrollmentRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const enrollment = EnrollmentSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: updateEnrollment, isError: isUpdateError } = useUpdateEnrollment();

  const { mutate: deleteEnrollment, isError: isDeleteError } = useDeleteEnrollment();

  const onSubmitEdit = (values: EditEnrollmentForm) => {
    updateEnrollment({ ...values, status: values.status });
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
    }
  };

  const onSubmitDelete = () => {
    deleteEnrollment(enrollment.id);
    if (!isDeleteError) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen}
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
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditDialogOpen && (
        <EnrollmentEditDialog
          onSubmit={onSubmitEdit}
          defaultValues={{
            studentId: enrollment.studentId,
            status: enrollment.status,
            firstName: enrollment.firstName,
            id: enrollment.id,
            lastName: enrollment.lastName,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              {`You can't undo this action. This will permanently delete the. (If you want this student to withdraw this course, please use "edit" menu instead)`}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onSubmitDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
