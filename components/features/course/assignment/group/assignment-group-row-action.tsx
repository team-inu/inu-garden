'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import AssignmentGroupEditDialog from '@/components/features/course/assignment/group/assigment-group-edit-dialog';
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
import { useDeleteAssignmentGroup, useUpdateAssignmentGroup } from '@/hooks/assignment-group-hook';
import { AssignmentGroupSchema, UpdateAssignmentGroupForm } from '@/types/schema/assignment-group-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AssignmentGroupRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const assignment = AssignmentGroupSchema.parse(row.original);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: updateAssignment, isError: isUpdateError } = useUpdateAssignmentGroup();

  const { mutate: deleteAssignment, isError: isDeleteError } = useDeleteAssignmentGroup();

  const onSubmitDelete = () => {
    deleteAssignment(assignment.id);
    if (!isDeleteError) {
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmitEdit = (values: UpdateAssignmentGroupForm) => {
    updateAssignment(values);
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
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
          <DropdownMenuItem
            onClick={(e) => {
              setIsEditDialogOpen(true);
              e.stopPropagation();
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              setIsDeleteDialogOpen(true);
              e.stopPropagation();
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <AssignmentGroupEditDialog
            onSubmit={onSubmitEdit}
            defaultValues={{
              id: assignment.id,
              name: assignment.name,
              weight: assignment.weight,
            }}
          />
        </div>
      )}

      {isDeleteDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are your sure to delete?</DialogTitle>
              <DialogDescription>{`You can't undo this action. This will permanently delete the.`}</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={onSubmitDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
