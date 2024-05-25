'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import CloEditDialog from '@/components/features/course/outcome/clo-edit-dialog';
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
import { useDeleteClo, useUpdateClo } from '@/hooks/clo-hook';
import { CloSchema, EditCloForm } from '@/types/schema/clo-shema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CloRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const clo = CloSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: updateClo, isError: isUpdateError } = useUpdateClo();
  const { mutate: deleteClo, isError: isDeleteError } = useDeleteClo();

  const onSubmit = (values: EditCloForm) => {
    updateClo(values);
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
    }
  };

  const onDelete = () => {
    deleteClo(clo.id);
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
          <CloEditDialog
            onSubmit={onSubmit}
            defaultValues={{
              id: clo.id,
              code: clo.code,
              description: clo.description,
              expectedPassingAssignmentPercentage: clo.expectedPassingAssignmentPercentage,
              expectedPassingStudentPercentage: clo.expectedPassingStudentPercentage,
              status: clo.status,
              programOutcomeId: clo.programOutcomeId,
            }}
          />
        </div>
      )}

      {isDeleteDialogOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are your sure to delete?</DialogTitle>
              <DialogDescription>{` You can't undo this action. This will permanently delete the.`}</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={onDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
