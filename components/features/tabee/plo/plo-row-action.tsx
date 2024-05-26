'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import PloDialog from '@/components/features/tabee/plo/plo-dialog';
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
import { useDeletePlo, useUpdatePlo } from '@/hooks/plo-hook';
import { PloSchema, UpdatePloForm } from '@/types/schema/plo-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PloRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const plo = PloSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: updatePlo, isError: isUpdateError } = useUpdatePlo();
  const { mutate: deletePlo, isError: isDeleteError } = useDeletePlo();

  const onSubmit = (values: UpdatePloForm) => {
    updatePlo({ plo: values, id: plo.id });
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
    }
  };

  const onDelete = () => {
    deletePlo(plo.id);
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
          <PloDialog
            isEdit
            onSubmit={onSubmit}
            defaultValues={{
              code: plo.code,
              descriptionThai: plo.descriptionThai,
              descriptionEng: plo.descriptionEng,
              programYear: plo.programYear,
              programmeName: plo.programmeName,
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
