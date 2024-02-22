'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import SubPloDialog from '@/components/features/tabee/sub-plo/sub-plo-dialog';
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
import { SubPLOSchema } from '@/data/schema';
import { CreateSubPloType } from '@/types/schema/sub-plo-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SubPloRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const subPlo = SubPLOSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onSubmit = (values: CreateSubPloType) => {
    console.log(values);
  };

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
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
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditDialogOpen && (
        <SubPloDialog
          isEdit
          onSubmit={onSubmit}
          defaultValues={{
            code: subPlo.code,
            descriptionThai: subPlo.descriptionThai,
            descriptionEng: subPlo.descriptionEng,
            programLearningOutcomeId: subPlo.programLearningOutcomeId,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              {` You can't undo this action. This will permanently delete the.`}
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
