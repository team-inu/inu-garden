"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdmissionSchema } from "@/data/schema"; // TODO: make it dynamic
import { useState } from 'react';
import { CreateAdmissionType } from '@/types/schema/admission-schema';
import { DialogClose } from '@radix-ui/react-dialog';
import AdmissionDialog from './admission-dialog';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AdmissionRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const admission = AdmissionSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onSubmit = (values: CreateAdmissionType) => {
    console.log(values);
  };

  const onDelete = () => {
    console.log("delete");
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
        <AdmissionDialog
          isEdit
          onSubmit={onSubmit}
          defaultValues={{
            admissionId: admission.id,
            firstName: admission.firstName,
            lastName: admission.lastName,
            email: admission.email,
            admission: admission.admission,
            city: admission.city,
            gpaEng: String(admission.englishGPA),
            gpaMath: String(admission.mathGPA),
            gpaSci: String(admission.scienceGPA),
            gpax: String(admission.GPAX),
            school: admission.school,
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
